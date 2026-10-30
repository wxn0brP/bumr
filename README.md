# bumr

bumr updates the dependencies in your `package.json` to their latest versions, keeps the range prefix you already use, and runs the install command afterward.

## Features

- Handles dependencies, devDependencies, and peerDependencies
- Keeps version ranges such as `^`, `~`, and `>=`
- `--dry-run` prints the new `package.json` without writing it
- Installs with bun by default, or with any command passed to `--command`
- Skips packages listed in `bumr.ignore` or passed to `--ignore`

## Installation

```bash
bun add -g github:wxn0brp/bumr
```

Or through ingr, from [dotfiles](https://github.com/wxn0brP/dotfiles):

```bash
ingr bumr
```

## Usage

Run `bumr` in a project directory to update every dependency:

```bash
bumr
```

### Options

```bash
# Update only production dependencies
bumr -r
# or
bumr --required

# Update only dev dependencies
bumr -d
# or
bumr --dev

# Update only peer dependencies
bumr -p
# or
bumr --peer

# Preview the changes without writing them
bumr -n
# or
bumr --dry-run

# Use a different install command (default: bun i)
bumr -c npm
# or
bumr --command npm

# Skip the install step
bumr -i false

# Ignore specific packages
bumr -x react,react-dom
# or write them to the ignore file
printf 'react\nreact-dom\n' >> bumr.ignore

# Update only specific packages
bumr -o react,react-dom
# or
bumr --only react,react-dom

# Show help
bumr -h
# or
bumr --help
```

### Option reference

| Short | Long | Description |
|-------|------|-------------|
| `-r` | `--required` | Update production dependencies only |
| `-d` | `--dev` | Update devDependencies only |
| `-p` | `--peer` | Update peerDependencies only |
| `-n` | `--dry-run` | Print the updated `package.json` instead of writing it |
| `-i` | `--install` | Install after updating (default: true) |
| `-c` | `--command` | Install command (default: `bun i`) |
| `-x` | `--ignore` | Packages to skip, comma-separated; pass `file` to read `bumr.ignore` |
| `-o` | `--only` | Update only these packages, comma-separated |
| `-h` | `--help` | Show help |

## bumr.ignore

One package name per line. bumr reads this file when `--ignore` is missing or contains `file`.

## Contributing

Open an issue or send a pull request.

## License

MIT
