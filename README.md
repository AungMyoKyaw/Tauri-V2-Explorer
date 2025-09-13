# Permission Fixes and Error Resolution

## Window Maximize Permission

To enable window maximize functionality in Tauri V2, ensure the following permission is set in `src-tauri/capabilities/default.json`:

```json
{
  "permissions": ["core:window:allow-maximize"]
}
```

Do NOT add permissions to `tauri.conf.json`—this will cause a lint/compile error. All window and core permissions must be set in the capabilities manifest.

## Error Resolution Workflow

1. Added `core:window:allow-maximize` to `src-tauri/capabilities/default.json`.
2. Removed invalid `permissions` property from `tauri.conf.json`.
3. Scanned codebase for permission and window errors—none found.
4. Ran full build and lint checks for frontend (React/TypeScript) and backend (Rust/Tauri)—no errors found.
5. All functionality validated and documented.

For further permission configuration, see [Tauri v2 ACL and Capabilities documentation](https://github.com/tauri-apps/tauri-docs/blob/v2/src/content/docs/reference/acl/core-permissions.mdx).

# Tauri V2 Explorer

This application demonstrates the core features of Tauri V2 through interactive examples.

## Features Implemented

1. **Dialog APIs** - File open/save dialogs and message dialogs
2. **File System APIs** - Reading, writing, and managing files and directories
3. **Window Management APIs** - Controlling window properties and behavior
4. **Networking APIs** - Making HTTP requests
5. **IPC (Inter-Process Communication)** - Communication between frontend and backend
6. **Shell APIs** - Executing shell commands
7. **Clipboard APIs** - Reading from and writing to the system clipboard
8. **Notification APIs** - Sending desktop notifications

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development version:
   ```bash
   npm run tauri dev
   ```

## Building

To build the application for production:

```bash
npm run tauri build
```

This will create platform-specific bundles in the `src-tauri/target/release/bundle/` directory.

## Architecture

The application is structured as follows:

- `src/` - Frontend React components
  - `components/` - Reusable UI components
  - `pages/` - Feature-specific pages for each Tauri API category
  - `App.tsx` - Main application component
- `src-tauri/` - Tauri backend code
  - `src/main.rs` - Application entry point
  - `src/lib.rs` - Tauri plugin initialization and command handlers
  - `Cargo.toml` - Rust dependencies
  - `tauri.conf.json` - Tauri configuration

## Tauri Plugins Used

- `@tauri-apps/plugin-dialog` - For file dialogs
- `@tauri-apps/plugin-fs` - For file system operations
- `@tauri-apps/plugin-http` - For HTTP requests
- `@tauri-apps/plugin-shell` - For executing shell commands
- `@tauri-apps/plugin-clipboard-manager` - For clipboard operations
- `@tauri-apps/plugin-notification` - For desktop notifications
- `@tauri-apps/plugin-opener` - For opening files/URLs with default applications

## Usage

1. Launch the application
2. Use the sidebar to navigate between different API categories
3. Interact with the demo buttons to see the APIs in action
4. View the source code for each example to understand the implementation
5. See real-time output and feedback from API calls

## Development

The application follows Tauri V2 best practices and uses:

- React with TypeScript for the frontend
- Vite as the build tool
- Rust for the backend

All code is organized to be clear and educational, making it easy to understand how each Tauri API works.
