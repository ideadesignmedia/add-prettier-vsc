# add-prettier-vsc

A lightweight CLI to add a `.prettierrc` config file (matching VS Code’s defaults) to your project directory.

---

## Installation

Install globally with npm:

```bash
npm install -g add-prettier-vsc
```

This will expose the `add-prettier-vsc` command in your PATH.

---

## Usage

```bash
add-prettier-vsc [options] [directory]
```

- **`directory`** _(optional)_: Path to the target folder where you want to add the config. Defaults to the current working directory.
- **Options**:

  - `-h, --help`      Show help and exit.
  - `-d, --display`   Print the target file path and config content without writing.

### Examples

- Add a `.prettierrc` to the current folder:

  ```bash
  add-prettier-vsc
  ```

- Preview (no write) in a subfolder:

  ```bash
  add-prettier-vsc --display ./frontend
  ```

- Target a specific directory:

  ```bash
  add-prettier-vsc ../my-project
  ```

---

## bin.js behavior

- If `.prettierrc` does not exist, it creates it with the following defaults:

  ```json
  {
    "printWidth": 80,
    "tabWidth": 4,
    "useTabs": false,
    "semi": true,
    "singleQuote": false,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "arrowParens": "always",
    "endOfLine": "lf"
  }
  ```

- If `.prettierrc` already exists, you'll be prompted to confirm overwrite.

---

## package.json

Your provided `package.json` is correctly configured for a global CLI:

```json
{
  "name": "add-prettier-vsc",
  "version": "1.0.0",
  "bin": "bin.js",
  "author": "ideadesignmedia <60307610+ideadesignmedia@users.noreply.github.com>",
  "license": "MIT"
}
```

> **Note:**
>
> - NPM will symlink `add-prettier-vsc` to `bin.js` automatically.
> - You may optionally add fields such as `description`, `repository`, or `preferGlobal: true` if you’d like to indicate this is primarily for global use.
