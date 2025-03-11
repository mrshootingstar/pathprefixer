## PathPrefixer

PathPrefixer is a simple-to-use Visual Studio Code extension that automatically adds the relative path of the current file as a comment at the beginning of the file. This approach improves code organization, creates clearer documentation, and helps you identify file locations quickly while reviewing or collaborating on projects. Whether you are a seasoned developer or new to coding, PathPrefixer can streamline your workflow and keep your codebase cleaner.


### GitHub Repository

You can find the official PathPrefixer repository and documentation at:
[https://github.com/mrshootingstar/pathprefixer](https://github.com/mrshootingstar/pathprefixer).


### Features

PathPrefixer supports any language recognized by VS Code and uses the editor’s native commenting features to respect language-specific commenting styles. It also provides a convenient keyboard shortcut, as well as a context menu entry, to trigger the command. This ensures an intuitive and consistent way of adding file paths without disrupting your coding sessions.


### Keyboard Shortcuts

Users can easily change or create a custom keyboard shortcut for PathPrefixer. Simply open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P on macOS), then type:

- **Preferences: Open Keyboard Shortcuts** or  
- **Preferences: Open Keyboard Shortcuts (JSON)**

Look for the command **“PathPrefixer: Add Relative Path”** and assign any key combination you prefer. This way, you can tailor the shortcut to your personal workflow.


### Download the latest `.vsix` file
Go to [Releases](https://github.com/mrshootingstar/pathprefixer/releases), find the newest version (tagged `vX.X.X`), and download the `pathprefixer-X.X.X.vsix` asset.  

They can then install it manually in VS Code via the instructions you’ve already placed in your README (using *Install from VSIX...* or `code --install-extension pathprefixer-X.X.X.vsix`).


### Installation

If you already have a `.vsix` file for this extension, you can install it by opening the command palette in VS Code (Ctrl+Shift+P on Windows/Linux, Cmd+Shift+P on macOS) and searching for “Extensions: Install from VSIX...,” then selecting your `pathprefixer-X.X.X.vsix` file.  
Alternatively, from the command line, you can run:
```
code --install-extension pathprefixer-X.X.X.vsix
```

### Usage

Open any file within your workspace and activate PathPrefixer by pressing Ctrl+Alt+P on Windows/Linux or Cmd+Alt+P on macOS. You can also right-click in the editor and choose “PathPrefixer: Add Relative Path.” PathPrefixer will calculate the path from your workspace root to the current file and add it as a comment, saving you time while improving file identification and readability.

### Examples

In JavaScript or TypeScript:
```js
// src/components/Button.tsx
import React from 'react';
```

In Python:
```python
# utils/helpers.py
def calculate_total(items):
    ...
```

In HTML:
```html
<!-- templates/index.html -->
<!DOCTYPE html>
<html>
  ...
</html>
```

### Compiling, Building, and Testing

To modify PathPrefixer or run the tests yourself, first clone the repository:
```
git clone https://github.com/mrshootingstar/pathprefixer.git
cd pathprefixer
```
Then install the dependencies using:
```
pnpm install
```
Run `pnpm run compile` for a one-time TypeScript build, or `pnpm run watch` for continuous rebuilding as you edit code. If you’d like to test the extension, compile your changes (or ensure rebuilding is running) and then execute:
```
pnpm run test
```
This will run the extension tests in your environment.

### Packaging the Extension

When you need to create a `.vsix` package for distribution or installation, simply run:
```
pnpm run make-vsix
```
This produces a file named `pathprefixer-X.X.X.vsix` (the version may vary). You can install this file using the instructions in the “Installation” section above.

### Contributing and Reporting Issues

We warmly welcome pull requests and feature suggestions. If you encounter any bugs or have ideas for improvements, feel free to open an issue on [GitHub](https://github.com/mrshootingstar/pathprefixer). Your contributions and feedback help make PathPrefixer more powerful and user-friendly for everyone.

### License

PathPrefixer is made available under the [MIT License](LICENSE). Thank you for trying out PathPrefixer, and we hope it boosts your productivity and code clarity!





