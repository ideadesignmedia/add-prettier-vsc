#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Default Prettier configuration to mimic VS Code's default format
const config = {
  printWidth: 80,
  tabWidth: 4,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
};

function printHelp() {
  console.log(`
Usage: bin.js [options] [directory]

Options:
  -h, --help        Show help
  -d, --display     Display the config and target file without writing

Arguments:
  directory         Path to the project directory (defaults to current directory)
`);
}

function main() {
  const args = process.argv.slice(2);
  let showHelp = false;
  let displayOnly = false;
  let targetDir = process.cwd();

  // Parse arguments
  args.forEach((arg) => {
    if (arg === "-h" || arg === "--help") {
      showHelp = true;
    } else if (arg === "-d" || arg === "--display") {
      displayOnly = true;
    } else if (!arg.startsWith("-")) {
      targetDir = arg;
    } else {
      console.warn(`Unknown option: ${arg}`);
    }
  });

  if (showHelp) {
    printHelp();
    process.exit(0);
  }

  // Resolve and validate target directory
  targetDir = path.resolve(targetDir);
  const fileName = ".prettierrc";
  const filePath = path.join(targetDir, fileName);
  const content = JSON.stringify(config, null, 2) + "\n";

  if (displayOnly) {
    console.log(
      `Will write the following content to ${filePath}:\n\n${content}`
    );
    process.exit(0);
  }

  if (!fs.existsSync(targetDir) || !fs.lstatSync(targetDir).isDirectory()) {
    console.error(`Directory does not exist: ${targetDir}`);
    process.exit(1);
  }

  // Function to perform the write
  const writeConfig = () => {
    fs.writeFileSync(filePath, content);
    console.log(`Config written to ${filePath}`);
  };

  // Check for existing file and prompt if necessary
  if (fs.existsSync(filePath)) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(
      `Config file already exists at ${filePath}. Overwrite? (y/N) `,
      (answer) => {
        rl.close();
        if (/^y(es)?$/i.test(answer.trim())) {
          writeConfig();
        } else {
          console.log("Aborted.");
        }
      }
    );
  } else {
    writeConfig();
  }
}

main();
