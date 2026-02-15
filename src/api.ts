const npmRegistry = process.env.NPM_REGISTRY || "https://registry.npmjs.org";

export async function getLatestVersion(packageName: string) {
    const response = await fetch(`${npmRegistry}/${packageName}/latest`);
    if (!response.ok) throw new Error(`Package ${packageName} not found`);
    const pkg = await response.json();
    return pkg.version;
}
