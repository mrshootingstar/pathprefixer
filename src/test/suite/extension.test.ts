// pathprefixer\src\test\suite\extension.test.ts

import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { languageComments } from '../../languageComments';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Starting tests');

    test('Command should be registered', async () => {
        const commands = await vscode.commands.getCommands();
        assert.ok(commands.includes('pathprefixer.addRelativePath'), 'Command should be registered');
    });

    test('Should add comment with relative path', async function() {
        this.timeout(10000); // Increase timeout for this test
        
        // Create a temporary workspace folder
        const workspaceFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'pathprefixer-test-'));
        
        // Test a few representative languages
        const testLanguages = ['javascript', 'python', 'html', 'css'];
        
        for (const language of testLanguages) {
            // Create a test file
            const extension = language === 'javascript' ? 'js' : 
                             language === 'python' ? 'py' : language;
            const filePath = path.join(workspaceFolder, `test.${extension}`);
            fs.writeFileSync(filePath, 'Test content');
            
            // Open the file
            const document = await vscode.workspace.openTextDocument(filePath);
            const editor = await vscode.window.showTextDocument(document);
            
            // Execute the command
            await vscode.commands.executeCommand('pathprefixer.addRelativePath');
            
            // Wait for the edit to complete
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Get the first line
            const firstLine = document.lineAt(0).text;
            
            // Get expected comment style
            const commentStyle = languageComments[language];
            const expectedStart = commentStyle.start;
            const expectedEnd = commentStyle.multiLine ? commentStyle.end : '';
            
            // Check if the comment was added correctly
            assert.ok(
                firstLine.startsWith(expectedStart), 
                `Comment should start with ${expectedStart} for ${language}`
            );
            
            if (commentStyle.multiLine) {
                assert.ok(
                    firstLine.endsWith(expectedEnd!), 
                    `Comment should end with ${expectedEnd} for ${language}`
                );
            }
            
            assert.ok(
                firstLine.includes(`test.${extension}`), 
                `Comment should include the file name for ${language}`
            );
            
            // Close the editor
            await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
        }
        
        // Clean up
        fs.rmdirSync(workspaceFolder, { recursive: true });
    });
});