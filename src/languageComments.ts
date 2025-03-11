// pathprefixer\src\languageComments.ts

export interface CommentStyle {
    start: string;
    end?: string;
    multiLine: boolean;
}

export const languageComments: Record<string, CommentStyle> = {
    // C-style languages
    'javascript': { start: '//', multiLine: false },
    'typescript': { start: '//', multiLine: false },
    'java': { start: '//', multiLine: false },
    'c': { start: '//', multiLine: false },
    'cpp': { start: '//', multiLine: false },
    'csharp': { start: '//', multiLine: false },
    'go': { start: '//', multiLine: false },
    'rust': { start: '//', multiLine: false },
    'swift': { start: '//', multiLine: false },
    'php': { start: '//', multiLine: false },
    'dart': { start: '//', multiLine: false },
    'kotlin': { start: '//', multiLine: false },
    'scala': { start: '//', multiLine: false },
    'objective-c': { start: '//', multiLine: false },
    'groovy': { start: '//', multiLine: false },
    
    // Hash-style languages
    'python': { start: '#', multiLine: false },
    'ruby': { start: '#', multiLine: false },
    'perl': { start: '#', multiLine: false },
    'yaml': { start: '#', multiLine: false },
    'powershell': { start: '#', multiLine: false },
    'bash': { start: '#', multiLine: false },
    'shellscript': { start: '#', multiLine: false },
    'makefile': { start: '#', multiLine: false },
    'r': { start: '#', multiLine: false },
    'coffeescript': { start: '#', multiLine: false },
    
    // HTML/XML style
    'html': { start: '<!--', end: '-->', multiLine: true },
    'xml': { start: '<!--', end: '-->', multiLine: true },
    'svg': { start: '<!--', end: '-->', multiLine: true },
    'markdown': { start: '<!--', end: '-->', multiLine: true },
    'css': { start: '/*', end: '*/', multiLine: true },
    'scss': { start: '/*', end: '*/', multiLine: true },
    'less': { start: '/*', end: '*/', multiLine: true },
    
    // SQL style
    'sql': { start: '--', multiLine: false },
    'plsql': { start: '--', multiLine: false },
    
    // Lisp style
    'lisp': { start: ';;', multiLine: false },
    'clojure': { start: ';;', multiLine: false },
    
    // Haskell style
    'haskell': { start: '--', multiLine: false },
    
    // Lua style
    'lua': { start: '--', multiLine: false },
    
    // MATLAB style
    'matlab': { start: '%', multiLine: false },
    
    // Assembly style
    'asm': { start: ';', multiLine: false },
    
    // F# style
    'fsharp': { start: '//', multiLine: false },
    
    // VB style
    'vb': { start: "'", multiLine: false },
    
    // Batch style
    'bat': { start: 'REM', multiLine: false },
    'cmd': { start: 'REM', multiLine: false },
    
    // Ada style
    'ada': { start: '--', multiLine: false },
    
    // Fortran style
    'fortran': { start: '!', multiLine: false },
    
    // LaTeX style
    'latex': { start: '%', multiLine: false },
    
    // Erlang style
    'erlang': { start: '%', multiLine: false },
    
    // Elixir style
    'elixir': { start: '#', multiLine: false },
    
    // Dockerfile
    'dockerfile': { start: '#', multiLine: false },
};

export function getCommentStyle(languageId: string): CommentStyle {
    // Default to C-style comments if language not found
    return languageComments[languageId] || { start: '//', multiLine: false };
}