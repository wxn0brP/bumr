# bumr

A simple tool for updating your project dependencies to their latest versions. Bumr automatically scans your `package.json` and updates dependencies to their latest compatible versions, then installs them using your preferred package manager.

## ✨ Features

- Updates dependencies to latest compatible versions
- Supports dependencies, devDependencies, and peerDependencies
- Dry-run mode to preview changes before applying
- Automatic installation after updates
- Compatible with npm, yarn, and bun
- Preserves version ranges (keeps ^, ~, >=, etc)

## 🚀 Installation

```bash
bun add -g github:wxn0brp/bumr
```

or ingr via [dotfiles](https://github.com/wxn0brP/dotfiles):

```bash
ingr bumr
```

## 💡 Usage

### Basic Usage
Simply run `bumr` in your project directory to update all dependencies:

```bash
bumr
```

### Advanced Options

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

# Dry run to see what would be updated without making changes
bumr -n
# or
bumr --dry-run

# Use a specific package manager (default: bun i)
bumr -c npm
# or
bumr --command npm

# Skip installation after updating
bumr -i false
# or
bumr --no-install

# Ignore specific packages
bumr -x react,react-dom
# or
echo "react\nreact-dom" >> bumr.ignore

# Show help
bumr -h
# or
bumr --help
```

### All Available Options

| Short | Long | Description |
|-------|------|-------------|
| `-r` | `--required` | Update production dependencies only |
| `-d` | `--dev` | Update devDependencies only |
| `-p` | `--peer` | Update peerDependencies only |
| `-n` | `--dry-run` | Preview changes without making updates |
| `-i` | `--install` | Install dependencies after update (default: true) |
| `-c` | `--command` | Package manager command to use (default: bun i) |
| `-x` | `--ignore` | Ignore specific packages (comma-separated, use "file" to assign from ignore file) |
| `-h` | `--help` | Show help information |

## bumr.ignore file

Consists of a list of package names to ignore during updates.
If not provided or includes "file", loads entries from `bumr.ignore` (newline-separated).

## 🛠️ Requirements

- [Bun](https://bun.sh/) runtime
- A `package.json` file in your project

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

MIT
