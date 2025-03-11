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
    let relativePath = path.relative(basePath, filePath);
    // Normalize slashes to forward slashes
    relativePath = relativePath.replace(/\\/g, '/');

    // Check if the first line already contains the relative path
    let firstLine = document.lineAt(0).text;
    firstLine = firstLine.replace(/\\/g, '/');

    if (firstLine.includes(relativePath)) {
        vscode.window.showInformationMessage('PathPrefixer: The relative path is already present.');
        return;
    }

    // Insert the relative path at the beginning of the file
    await editor.edit(editBuilder => {
        editBuilder.insert(new vscode.Position(0, 0), relativePath + '\n');
    });
    
    // Position cursor at the first line
    editor.selection = new vscode.Selection(0, 0, 0, relativePath.length);
    
    // Use VS Code's native comment command
    await vscode.commands.executeCommand('editor.action.commentLine');
    // (No success toast shown here)
}

export function activate(context: vscode.ExtensionContext) {
    console.log('PathPrefixer extension is now active');

    const disposable = vscode.commands.registerCommand('pathprefixer.addRelativePath', addRelativePath);
    context.subscriptions.push(disposable);
}

export function deactivate() {}

export const EXTENSION_ID = 'pathprefixer';