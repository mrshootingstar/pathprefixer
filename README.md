### PathPrefixer

PathPrefixer is a VS Code extension that automatically adds the relative path of the current file as a comment at the beginning of the file. This helps with code organization, documentation, and makes it easier to identify file locations when reviewing code.

### Features

PathPrefixer works with any language supported by VS Code and uses the native commenting functionality to add comments in a language-appropriate style. It also provides a default keyboard shortcut (`Ctrl+Alt+P` on Windows/Linux and `Cmd+Alt+P` on macOS) and a context menu entry to trigger the command.

### Installation

If you already have a `.vsix` file (packaged extension), you can install it in two ways:

From VS Code:
1. Press Ctrl+Shift+P (or Cmd+Shift+P on macOS).  
2. Type “Extensions: Install from VSIX...”  
3. Select your `pathprefixer-X.X.X.vsix` file.

From the command line:
```
code --install-extension pathprefixer-X.X.X.vsix
```

### Usage

Open any file in your workspace and activate PathPrefixer in one of two ways:
1. Press Ctrl+Alt+P (Cmd+Alt+P on macOS).  
2. Right-click in the editor and choose “PathPrefixer: Add Relative Path.”

The extension calculates the path from your workspace root to the current file and adds it as a comment at the top of the file.

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

If you wish to modify PathPrefixer or run the tests yourself, follow these steps:

1. **Clone the repository**  
   ```
   git clone https://github.com/mrshootingstar/pathprefixer.git
   cd pathprefixer
   ```

2. **Install dependencies**  
   ```
   pnpm install
   ```

3. **Compile**  
   Run `pnpm run compile` for a one-time build, or `pnpm run watch` to continuously rebuild when files change.

4. **Build and run tests**  
   Make sure everything is compiled, then run `pnpm run test` to execute the extension tests.  
   If you need to compile tests separately:  
   ```
   pnpm run compile-tests
   pnpm run compile
   pnpm run test
   ```

### Packaging the Extension

To create a `.vsix` file you can distribute or install:

```
pnpm run make-vsix
```

This produces a file named `pathprefixer-X.X.X.vsix` (version may vary). You can then install it via the instructions in the “Installation” section above.

### Contributing

If you discover any issues or would like to propose new features, feel free to open an issue or a pull request on the [GitHub repository](https://github.com/mrshootingstar/pathprefixer).

### License

PathPrefixer is available under the [MIT License](LICENSE). Enjoy!