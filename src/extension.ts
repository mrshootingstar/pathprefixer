// src\extension.ts

import * as vscode from 'vscode';
import * as path from 'path';

async function addRelativePath() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const document = editor.document;
    const filePath = document.uri.fsPath;

    // Get base path (workspace folder or parent directory)
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    const basePath = workspaceFolder ? workspaceFolder.uri.fsPath : path.dirname(filePath);

    // Calculate relative path
    const relativePath = path.relative(basePath, filePath);
    console.log(`Adding relative path: ${relativePath}`);

    // Insert the relative path at the beginning of the file
    await editor.edit(editBuilder => {
        editBuilder.insert(new vscode.Position(0, 0), relativePath + '\n');
    });
    
    // Position cursor at the first line
    editor.selection = new vscode.Selection(0, 0, 0, relativePath.length);
    
    // Use VS Code's native comment command
    await vscode.commands.executeCommand('editor.action.commentLine');
    
    // Save the document
    await document.save();
    
    return true;
}


export function activate(context: vscode.ExtensionContext) {
    console.log('PathPrefixer extension is now active');

    // Log all registered commands to verify
    vscode.commands.getCommands().then(commands => {
        console.log('Available commands:', commands);
    });

    // Register the command and make sure it's properly added to subscriptions
    const disposable = vscode.commands.registerCommand('pathprefixer.addRelativePath', addRelativePath);
    context.subscriptions.push(disposable);

    // Verify registration
    vscode.commands.getCommands().then(commands => {
        console.log('Commands after registration:', commands);
        console.log('Our command registered:', commands.includes('pathprefixer.addRelativePath'));
    });
}

export function deactivate() { }
export const EXTENSION_ID = 'pathprefixer';