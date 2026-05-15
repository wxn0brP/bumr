
import { spawnSync } from "child_process";
import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { options } from ".";
import { getLatestVersion } from "./api";
import { ignoreFile, skipArray } from "./vars";

const skip = (s: string) => skipArray.some(v => s.includes(v));

async function loadIgnore() {
    if (!existsSync(ignoreFile)) return [];
    const content = await readFile(ignoreFile, "utf-8");
    return content.split("\n").map(v => v.trim()).filter(Boolean);
}

function convertVersionToSameLength(len: string, ver: string) {
    const cleanLen = len.replace(/^[\^~>=]+/, "").split("-")[0];
    const aLen = cleanLen.split(".").length;
    const splitB = ver.split(".");
    const target = [];
    for (let i = 0; i < aLen; i++)
        target.push(splitB[i]);
    return target.join(".");
}

export async function upgradeDeps(opts: typeof options) {
    const json = JSON.parse(await readFile("package.json", "utf-8"));
    if (!json) throw new Error("package.json not found");
    let updatedCount = 0;

    if (!opts.ignore.length || opts.ignore.includes("file")) {
        const ignore = await loadIgnore();
        opts.ignore = opts.ignore.concat(ignore);
    }

    const depsToUpdate = [];
    if (opts.dependencies && json.dependencies) depsToUpdate.push(["dependencies", json.dependencies]);
    if (opts.devDependencies && json.devDependencies) depsToUpdate.push(["devDependencies", json.devDependencies]);
    if (opts.peerDependencies && json.peerDependencies) depsToUpdate.push(["peerDependencies", json.peerDependencies]);

    for (const [depType, _deps] of depsToUpdate) {
        console.log(`📦 Checking ${depType}...`);
        const deps = _deps as Record<string, string>;

        for (const [pkg, currentVersion] of Object.entries(deps)) {
            try {
                if (opts.ignore.includes(pkg)) continue;
                if (skip(currentVersion)) continue;

                const latest = await getLatestVersion(pkg);
                const latestStandard = convertVersionToSameLength(currentVersion, latest);
                const currentClean = currentVersion.replace(/^[\^~>=]+/, "").split(/\s/)[0];

                if (Bun.semver.order(latestStandard, currentClean) > 0) {
                    const prefixMatch = currentVersion.match(/^[\^~>=]+/);

                    const prefix = prefixMatch?.[0]?.startsWith(">") ? prefixMatch[0] : (prefixMatch?.[0] || "~");
                    deps[pkg] = `${prefix}${latestStandard}`;

                    console.log(`   ${pkg}: ${currentClean} -> ${latestStandard}`);
                    updatedCount++;
                } else {
                    console.log(`   ${pkg} ${currentClean} (up to date)`);
                }
            } catch {
                console.log(`   ⚠️  ${pkg} (skipped)`);
            }
        }
        console.log();
    }

    if (!updatedCount)
        return console.log("✅ All packages are up to date!");

    if (options.dryRun) {
        console.log("📦 Dry run enabled. Ignore Changes.");
        console.log("New package.json:");
        console.log(JSON.stringify(json, null, 4));
        return;
    }

    await writeFile("package.json", JSON.stringify(json, null, 4) + "\n");
    console.log(`🎉 Updated ${updatedCount} packages`);

    if (!opts.install) return;
    console.log("📥 Installing...");
    spawnSync(options.command, {
        stdio: "inherit",
        shell: true,
    });
}
