<div align="center">
  <h1>🐚 OwnShell</h1>
  <p><i>A lightweight, custom shell built with TypeScript and Bun.</i></p>

  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
</div>

<br />

> **Status:** 🚧 Still under active development.

OwnShell is a custom command-line interpreter implemented in TypeScript and executing via Bun. It provides an interactive REPL environment with essential standard shell built-in commands and the ability to execute any external programs found in your system's `PATH`.

## ✨ Features

- **Interactive REPL:** Built on node's `readline` for a seamless command-line experience.
- **Shell Built-ins:**
  - `cd` - Navigate the file system (supports absolute/relative paths and `~`).
  - `pwd` - Print the current working directory.
  - `echo` - Print arguments to the standard output.
  - `type` - Identify whether a command is a built-in or an executable in your `PATH`.
  - `exit` - Terminate the shell session.
- **External Program Execution:** Automatically resolves and safely runs external binaries located in your system's `$PATH`.
- **Custom Parser:** Handles command tokenization and argument parsing under the hood.

## 🚀 Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation & Execution

1. Clone the repository and navigate into it:
   ```bash
   git clone https://github.com/ezAakash/OwnShell.git
   cd OwnShell
   ```

2. Install the dependencies:
   ```bash
   bun install
   ```

3. Start the interactive shell:
   ```bash
   bun start
   ```

## 🛠 Architecture & Tech Stack

- **[Bun](https://bun.sh/)** - Used as the fast JS runtime and package manager.
- **TypeScript** - Used for type safety and code clarity.
- **Node.js Core Modules** - Heavily utilizes `node:readline`, `node:child_process`, and `node:path`.

---
<div align="center">
  <i>Made with ❤️ by ezAakash</i>
</div>
