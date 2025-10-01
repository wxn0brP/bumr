# bumr

A simple tool for updating your project dependencies to their latest versions. Bumr automatically scans your `package.json` and updates dependencies to their latest compatible versions, then installs them using your preferred package manager.

## ✨ Features

- Updates dependencies to latest compatible versions
- Supports dependencies, devDependencies, and peerDependencies
- Dry-run mode to preview changes before applying
- Automatic installation after updates
- Compatible with npm, yarn, and bun
- Preserves version ranges (keeps ^ and ~ prefixes)

## 🚀 Installation

```bash
yarn global add github:wxn0brp/bumr
```
OR
```bash
bun add -g github:wxn0brp/bumr
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

# Use a specific package manager (default: yarn)
bumr -c npm
# or
bumr --command npm

# Skip installation after updating
bumr -i false
# or
bumr --no-install

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
| `-c` | `--command` | Package manager command to use (default: yarn) |
| `-h` | `--help` | Show help information |

## 🛠️ Requirements

- [Bun](https://bun.sh/) runtime (recommended)
- A `package.json` file in your project

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

MIT