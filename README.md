# PathPrefixer

PathPrefixer is a VS Code extension that automatically adds the relative path of the current file as a comment at the beginning of the file. This helps with code organization, documentation, and makes it easier to identify file locations when reviewing code.

## Features

- Adds the relative path of the current file as a comment at the beginning of the file
- Supports 40+ programming languages with appropriate comment syntax for each
- Customizable base directory for relative paths (workspace root or parent directory)
- Quick access via keyboard shortcut (Ctrl+Alt+P / Cmd+Alt+P) or context menu
- Optional attribution comment

![PathPrefixer in action](images/demo.gif)

## Usage

1. Open any file in your workspace
2. Press `Ctrl+Alt+P` (`Cmd+Alt+P` on macOS) or right-click and select "Add Relative Path Comment"
3. Select the base directory for the relative path (workspace root by default)
4. The path will be added as a comment at the beginning of the file using the appropriate syntax for the language

## Examples

**JavaScript/TypeScript:**
```javascript
// src/components/Button.tsx -- added by PathPrefixer
import React from 'react';
```

**Python:**
# utils/helpers.py -- added by PathPrefixer
def calculate_total(items):

**HTML:**
```html
<!-- templates/index.html -- added by PathPrefixer -->
<!DOCTYPE html>
```

## Extension Settings

This extension contributes the following settings:

* `pathprefixer.includeAttribution`: Enable/disable including "-- added by PathPrefixer" in the comment (default: true)
* `pathprefixer.defaultBaseDirectory`: Set the default base directory for computing relative paths ("workspace" or "parent")

## Requirements

No additional requirements or dependencies.

## Known Issues

None at this time. Please report any issues on the GitHub repository.

## Release Notes

### 0.0.1

- Initial release of PathPrefixer
- Support for 40+ programming languages
- Configurable base directory selection
- Keyboard shortcut and context menu integration

---

**Enjoy using PathPrefixer!**
