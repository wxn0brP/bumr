export function help() {
	console.log(`
BUMR - Update dependencies to latest versions

Usage:
bumr [options]

Options:
-r, --required   Update dependencies only
-d, --dev        Update devDependencies only  
-p, --peer       Update peerDependencies only
-n, --dry-run    Dry run
-i, --install    Install dependencies (default: true)
-c, --command    Install command (default: bun i)
-x, --ignore     Ignore packages. If not provided or includes "file", loads entries from bumr.ignore.
-h, --help       Show this help
-v, --version    Show version

Default: Update all dependency types
`);
	process.exit(0);
}
