export function help() {
    console.log(`
BUMR - Update dependencies to latest versions

Usage:
${process.argv[0]} [options]

Options:
-r, --required   Update dependencies only
-d, --dev        Update devDependencies only  
-p, --peer       Update peerDependencies only
-n, --dry-run    Dry run
-i, --install    Install dependencies (default: true)
-c, --command    Install command (default: yarn)
-x, --ignore     Ignore
-h, --help       Show this help

Default: Update all dependency types
    `);
    process.exit(0);
}