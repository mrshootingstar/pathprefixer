// pathprefixer\src\extension.ts

import * as vscode from 'vscode';
import * as path from 'path';
import { getCommentStyle } from './languageComments';

export function activate(context: vscode.ExtensionContext) {
    console.log('PathPrefixer extension is now active');

    const disposable = vscode.commands.registerCommand('pathprefixer.addRelativePath', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }

        const document = editor.document;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('File is not part of a workspace');
            return;
        }

        try {
            // Create options for base directory selection
            const options = [
                { 
                    label: `Workspace: ${workspaceFolder.name}`, 
                    description: workspaceFolder.uri.fsPath,
                    detail: 'Path will be relative to the workspace root',
                    basePath: workspaceFolder.uri.fsPath
                }
            ];
            
            // Add parent directory option
            const parentDir = path.dirname(document.uri.fsPath);
            options.push({
                label: `Parent Directory: ${path.basename(parentDir)}`,
                description: parentDir,
                detail: 'Path will be relative to the containing folder',
                basePath: parentDir
            });
            
            // If multiple workspaces are open, add them as options
            if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 1) {
                for (const folder of vscode.workspace.workspaceFolders) {
                    if (folder.uri.fsPath !== workspaceFolder.uri.fsPath) {
                        options.push({
                            label: `Workspace: ${folder.name}`,
                            description: folder.uri.fsPath,
                            detail: 'Path will be relative to this workspace',
                            basePath: folder.uri.fsPath
                        });
                    }
                }
            }
            
            // Show quick pick to let user confirm or select a different base
            const selection = await vscode.window.showQuickPick(options, {
                placeHolder: 'Confirm or select base directory for relative path',
                ignoreFocusOut: true
            });
            
            if (!selection) {
                // User cancelled
                return;
            }
            
            // Get relative path using the selected base path
            const relativePath = path.relative(selection.basePath, document.uri.fsPath);
            
            // Get comment style based on language
            const commentStyle = getCommentStyle(document.languageId);
            
            // Get configuration
            const config = vscode.workspace.getConfiguration('pathprefixer');
            const includeAttribution = config.get('includeAttribution', true);
            
            // Add the extension name attribution if enabled
            const attribution = includeAttribution ? " -- added by PathPrefixer" : "";
            
            let commentedPath;
            if (commentStyle.multiLine) {
                commentedPath = `${commentStyle.start} ${relativePath}${attribution} ${commentStyle.end}\n`;
            } else {
                commentedPath = `${commentStyle.start} ${relativePath}${attribution}\n`;
            }
            
            // Insert at the beginning of the file
            await editor.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(0, 0), commentedPath);
            });
            
            vscode.window.setStatusBarMessage(`Added relative path from ${path.basename(selection.basePath)}`, 3000);
        } catch (error) {
            vscode.window.showErrorMessage(`Error adding path comment: ${error instanceof Error ? error.message : String(error)}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}