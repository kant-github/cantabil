import { Editor } from "@monaco-editor/react";
import { JSX, useState } from "react";
import {
    File,
    Folder,
    FolderOpen,
    ChevronRight,
    ChevronDown,
    Plus,
    Trash2
} from "lucide-react";

interface FileNode {
    id: string;
    name: string;
    type: 'file' | 'folder';
    content?: string;
    children?: FileNode[];
}

export default function DashView(): JSX.Element {
    const [fileTree, setFileTree] = useState<FileNode[]>([
        {
            id: '1',
            name: 'src',
            type: 'folder',
            children: [
                { id: '2', name: 'index.js', type: 'file', content: '// Welcome to your IDE\nconsole.log("Hello, World!");' },
                { id: '3', name: 'App.js', type: 'file', content: 'import React from "react";\n\nfunction App() {\n  return <div>Hello App</div>;\n}\n\nexport default App;' },
                {
                    id: '4',
                    name: 'components',
                    type: 'folder',
                    children: [
                        { id: '5', name: 'Button.js', type: 'file', content: 'export const Button = () => {\n  return <button>Click me</button>;\n};' }
                    ]
                }
            ]
        },
        { id: '6', name: 'package.json', type: 'file', content: '{\n  "name": "my-project",\n  "version": "1.0.0"\n}' },
        { id: '7', name: 'README.md', type: 'file', content: '# My Project\n\nWelcome to my project!' }
    ]);

    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1']));
    const [selectedFile, setSelectedFile] = useState<FileNode | null>(fileTree[0].children![0]);
    const [currentCode, setCurrentCode] = useState(fileTree[0].children![0].content || '');

    const toggleFolder = (id: string) => {
        setExpandedFolders(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const selectFile = (file: FileNode) => {
        if (file.type === 'file') {
            // Save current file content before switching
            if (selectedFile) {
                updateFileContent(selectedFile.id, currentCode);
            }
            setSelectedFile(file);
            setCurrentCode(file.content || '');
        }
    };

    const updateFileContent = (fileId: string, content: string) => {
        const updateNode = (nodes: FileNode[]): FileNode[] => {
            return nodes.map(node => {
                if (node.id === fileId) {
                    return { ...node, content };
                }
                if (node.children) {
                    return { ...node, children: updateNode(node.children) };
                }
                return node;
            });
        };
        setFileTree(updateNode(fileTree));
    };

    const handleCodeChange = (value: string | undefined) => {
        const newCode = value || '';
        setCurrentCode(newCode);
        if (selectedFile) {
            updateFileContent(selectedFile.id, newCode);
        }
    };

    const renderFileTree = (nodes: FileNode[], depth: number = 0): JSX.Element[] => {
        return nodes.map(node => (
            <div key={node.id}>
                <div
                    className={`flex items-center gap-1 px-2 py-1 hover:bg-neutral-800 cursor-pointer ${selectedFile?.id === node.id ? 'bg-neutral-800' : ''
                        }`}
                    style={{ paddingLeft: `${depth * 12 + 8}px` }}
                    onClick={() => {
                        if (node.type === 'folder') {
                            toggleFolder(node.id);
                        } else {
                            selectFile(node);
                        }
                    }}
                >
                    {node.type === 'folder' && (
                        expandedFolders.has(node.id) ?
                            <ChevronDown size={14} className="text-neutral-400" /> :
                            <ChevronRight size={14} className="text-neutral-400" />
                    )}
                    {node.type === 'folder' ? (
                        expandedFolders.has(node.id) ?
                            <FolderOpen size={16} className="text-blue-400" /> :
                            <Folder size={16} className="text-blue-400" />
                    ) : (
                        <File size={16} className="text-neutral-400" />
                    )}
                    <span className="text-sm text-neutral-200">{node.name}</span>
                </div>
                {node.type === 'folder' && expandedFolders.has(node.id) && node.children && (
                    <div>
                        {renderFileTree(node.children, depth + 1)}
                    </div>
                )}
            </div>
        ));
    };

    const getLanguageFromFileName = (fileName: string): string => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        const languageMap: { [key: string]: string } = {
            'js': 'javascript',
            'jsx': 'javascript',
            'ts': 'typescript',
            'tsx': 'typescript',
            'json': 'json',
            'md': 'markdown',
            'css': 'css',
            'html': 'html',
            'py': 'python',
        };
        return languageMap[ext || ''] || 'javascript';
    };

    return (
        <div className="flex h-screen bg-neutral-900 text-white">
            {/* File Tree Sidebar */}
            <div className="w-64 border-r border-neutral-800 flex flex-col">
                <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-neutral-200">EXPLORER</h2>
                    <div className="flex gap-1">
                        <button className="p-1 hover:bg-neutral-800 rounded">
                            <Plus size={14} className="text-neutral-400" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {renderFileTree(fileTree)}
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col">
                {/* Tab Bar */}
                {selectedFile && (
                    <div className="h-10 border-b border-neutral-800 flex items-center px-4 bg-neutral-900">
                        <div className="flex items-center gap-2 px-3 py-1 bg-neutral-800 rounded-t">
                            <File size={14} className="text-neutral-400" />
                            <span className="text-sm text-neutral-200">{selectedFile.name}</span>
                        </div>
                    </div>
                )}

                {/* Monaco Editor */}
                <div className="flex-1">
                    {selectedFile ? (
                        <Editor
                            height="100%"
                            language={getLanguageFromFileName(selectedFile.name)}
                            theme="vs-dark"
                            value={currentCode}
                            onChange={handleCodeChange}
                            options={{
                                minimap: { enabled: true },
                                fontSize: 14,
                                lineNumbers: 'on',
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                tabSize: 2,
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-neutral-500">
                            <p>Select a file to edit</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}