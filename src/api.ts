const npmRegistry = process.env.NPM_REGISTRY || "https://registry.npmjs.org";

const cache: Record<string, string> = {};

export async function getLatestVersion(packageName: string, tag = "latest") {
	const key = `${packageName}-${tag}`;
	if (cache[key]) return cache[key];

	const response = await fetch(`${npmRegistry}/${packageName}/${tag}`);
	if (!response.ok) throw new Error(`Package ${packageName} not found`);
	const pkg = await response.json();

	cache[key] = pkg.version;
	return pkg.version;
}
