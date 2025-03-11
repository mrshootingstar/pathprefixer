import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

suite('Extension Test Suite', () => {
    // Force activation before any tests run
    suiteSetup(async function () {
        this.timeout(10000);
        const extensionId = 'pathprefixer';
        const extension = vscode.extensions.getExtension(extensionId) || 
                         vscode.extensions.all.find(ext => ext.id.endsWith('pathprefixer'));
        
        if (!extension) {
            throw new Error('Extension not found');
        }
        
        if (!extension.isActive) {
            await extension.activate();
        }
    });

    test('Command should be registered', async () => {
        const commands = await vscode.commands.getCommands();
        assert.ok(commands.includes('pathprefixer.addRelativePath'));
    });

    test('Should add commented relative path to a file', async function () {
        this.timeout(10000);
        
        // Create a temporary workspace folder
        const workspaceFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'pathprefixer-test-'));
        
        try {
            // Create a test file
            const filePath = path.join(workspaceFolder, 'test.js');
            fs.writeFileSync(filePath, 'console.log("Test");');
            
            // Open the file
            const document = await vscode.workspace.openTextDocument(filePath);
            const editor = await vscode.window.showTextDocument(document);
            
            // Execute the command
            await vscode.commands.executeCommand('pathprefixer.addRelativePath');
            
            // Wait for the edit to complete
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Get the first line
            const firstLine = document.lineAt(0).text;
            
            // Check if the path was added and commented
            assert.ok(
                firstLine.includes('test.js'),
                `First line should include the file name`
            );
            
            // Check if the line was commented (should start with // for js)
            assert.ok(
                firstLine.startsWith('//'),
                `Line should be commented`
            );
            
        } finally {
            // Clean up
            await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
            fs.rmdirSync(workspaceFolder, { recursive: true });
        }
    });
});