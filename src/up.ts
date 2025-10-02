
import { readFile, writeFile } from "fs/promises";
import { getLatestVersion } from "./api";
import { options } from ".";
import { execSync } from "child_process";

const skipArray = [
    "latest",
    "*",
    "file",
    "git",
    "http",
    "https",
    "workspace",
    "link",
    "npm",
    "x",
    "X",
];

const skip = (s: string) => skipArray.some(v => s.includes(v));

export async function upgradeDeps(opts: typeof options) {
    const json = JSON.parse(await readFile("package.json", "utf-8"));
    if (!json) throw new Error("package.json not found");
    let updatedCount = 0;

    const depsToUpdate = [];
    if (opts.dependencies && json.dependencies) depsToUpdate.push(["dependencies", json.dependencies]);
    if (opts.devDependencies && json.devDependencies) depsToUpdate.push(["devDependencies", json.devDependencies]);
    if (opts.peerDependencies && json.peerDependencies) depsToUpdate.push(["peerDependencies", json.peerDependencies]);

    for (const [depType, _deps] of depsToUpdate) {
        console.log(`📦 Checking ${depType}...`);
        const deps = _deps as Record<string, string>;

        for (const [pkg, currentVersion] of Object.entries(deps)) {
            try {
                if (skip(currentVersion)) continue;

                const latest = await getLatestVersion(pkg);
                const currentClean = currentVersion.replace(/^[\^~>=]+/, "").split(/\s/)[0];

                if (currentClean !== latest) {
                    const prefixMatch = currentVersion.match(/^[\^~>=]+/);
                    const prefix = prefixMatch?.[0]?.startsWith('>') ? prefixMatch[0] : (prefixMatch?.[0] || "^");
                    deps[pkg] = `${prefix}${latest}`;
                    console.log(`   ${pkg}: ${currentClean} -> ${latest}`);
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

    if (!updatedCount) return console.log("✅ All packages are up to date!");

    if (options.dryRun) {
        console.log("📦 Dry run enabled. Ignore Changes.");
        console.log("New package.json:");
        console.log(JSON.stringify(json, null, 4));
        return;
    }

    await writeFile("package.json", JSON.stringify(json, null, 4));
    console.log(`🎉 Updated ${updatedCount} packages`);

    if (!opts.install) return;
    console.log("📥 Installing...");
    execSync(`${options.command}`, {
        stdio: "inherit",
        shell: "bash",
    });
}