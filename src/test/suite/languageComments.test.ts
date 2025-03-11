// pathprefixer\src\test\suite\languageComments.test.ts

import * as assert from 'assert';
import { getCommentStyle, languageComments } from '../../languageComments';

suite('Language Comments Tests', () => {
    test('All languages should have valid comment styles', () => {
        for (const [language, style] of Object.entries(languageComments)) {
            assert.ok(style.start, `${language} should have a start comment marker`);
            if (style.multiLine) {
                assert.ok(style.end, `${language} should have an end comment marker when multiLine is true`);
            }
        }
    });

    test('C-style languages should use // comments', () => {
        const cStyleLanguages = ['javascript', 'typescript', 'java', 'c', 'cpp', 'csharp', 'go'];
        for (const lang of cStyleLanguages) {
            const style = getCommentStyle(lang);
            assert.strictEqual(style.start, '//', `${lang} should use // comments`);
            assert.strictEqual(style.multiLine, false, `${lang} should use single-line comments`);
        }
    });

    test('Hash-style languages should use # comments', () => {
        const hashStyleLanguages = ['python', 'ruby', 'perl', 'yaml', 'bash'];
        for (const lang of hashStyleLanguages) {
            const style = getCommentStyle(lang);
            assert.strictEqual(style.start, '#', `${lang} should use # comments`);
            assert.strictEqual(style.multiLine, false, `${lang} should use single-line comments`);
        }
    });

    test('HTML-style languages should use <!-- --> comments', () => {
        const htmlStyleLanguages = ['html', 'xml', 'svg', 'markdown'];
        for (const lang of htmlStyleLanguages) {
            const style = getCommentStyle(lang);
            assert.strictEqual(style.start, '<!--', `${lang} should use <!-- as start comment`);
            assert.strictEqual(style.end, '-->', `${lang} should use --> as end comment`);
            assert.strictEqual(style.multiLine, true, `${lang} should use multi-line comments`);
        }
    });

    test('CSS-style languages should use /* */ comments', () => {
        const cssStyleLanguages = ['css', 'scss', 'less'];
        for (const lang of cssStyleLanguages) {
            const style = getCommentStyle(lang);
            assert.strictEqual(style.start, '/*', `${lang} should use /* as start comment`);
            assert.strictEqual(style.end, '*/', `${lang} should use */ as end comment`);
            assert.strictEqual(style.multiLine, true, `${lang} should use multi-line comments`);
        }
    });

    test('SQL-style languages should use -- comments', () => {
        const sqlStyleLanguages = ['sql', 'plsql', 'haskell', 'lua', 'ada'];
        for (const lang of sqlStyleLanguages) {
            const style = getCommentStyle(lang);
            assert.strictEqual(style.start, '--', `${lang} should use -- comments`);
            assert.strictEqual(style.multiLine, false, `${lang} should use single-line comments`);
        }
    });

    test('Unknown languages should default to C-style comments', () => {
        const style = getCommentStyle('nonexistent-language');
        assert.strictEqual(style.start, '//', 'Unknown language should default to // comments');
        assert.strictEqual(style.multiLine, false, 'Unknown language should default to single-line comments');
    });
});