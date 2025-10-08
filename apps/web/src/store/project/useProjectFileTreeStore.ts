import { create } from "zustand";

export interface FileNode {
    id: string;
    name: string;
    type: 'file' | 'folder';
    content?: string;
    children?: FileNode[];
}

interface ProjectFileTreeStoreType {
    fileTree: FileNode[];
    currentCode: string;
    selectedFile: FileNode | null;
    expandedFolders: string[]; // Changed from Set<string> to string[]
    setFileTree: (fileTree: FileNode[]) => void;
    setCurrentCode: (code: string) => void;
    toggleFolder: (id: string) => void;
    selectFile: (file: FileNode) => void;
    updateFileContent: (fileId: string, content: string) => void;
    moveNode: (nodeId: string, targetId: string, position: 'before' | 'after' | 'inside') => void;
    getLanguageFromFileName: (fileName: string) => string;
}

export const useProjectFileTreeStore = create<ProjectFileTreeStoreType>((set, get) => ({
    fileTree: [
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
    ],
    expandedFolders: ['1'],
    selectedFile: null,
    currentCode: '',
    
    setFileTree: (fileTree: FileNode[]) => set({ fileTree }),
    
    toggleFolder: (id: string) => {
        const current = get().expandedFolders;
        if (current.includes(id)) {
            set({ expandedFolders: current.filter(folderId => folderId !== id) });
        } else {
            set({ expandedFolders: [...current, id] });
        }
    },
    
    selectFile: (file: FileNode) => {
        if (file.type === 'file') {
            const state = get();
            if (state.selectedFile) {
                state.updateFileContent(state.selectedFile.id, state.currentCode);
            }
            set({
                selectedFile: file,
                currentCode: file.content || '',
            });
        }
    },
    
    updateFileContent: (fileId: string, content: string) => {
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
        set((state) => ({
            fileTree: updateNode(state.fileTree),
        }));
    },
    
    setCurrentCode: (code: string) => {
        const state = get();
        set({ currentCode: code });
        if (state.selectedFile) {
            state.updateFileContent(state.selectedFile.id, code);
        }
    },
    
    moveNode: (nodeId: string, targetId: string, position: 'before' | 'after' | 'inside') => {
        const state = get();
        let movedNode: FileNode | null = null;
        
        const removeNode = (nodes: FileNode[]): FileNode[] => {
            return nodes.filter(node => {
                if (node.id === nodeId) {
                    movedNode = node;
                    return false;
                }
                if (node.children) {
                    node.children = removeNode(node.children);
                }
                return true;
            });
        };
        
        const insertNode = (nodes: FileNode[]): FileNode[] => {
            if (position === 'inside') {
                return nodes.map(node => {
                    if (node.id === targetId && node.type === 'folder' && movedNode) {
                        return {
                            ...node,
                            children: [...(node.children || []), movedNode]
                        };
                    }
                    if (node.children) {
                        return { ...node, children: insertNode(node.children) };
                    }
                    return node;
                });
            } else {
                const result: FileNode[] = [];
                for (const node of nodes) {
                    if (position === 'before' && node.id === targetId && movedNode) {
                        result.push(movedNode);
                    }
                    if (node.children) {
                        result.push({ ...node, children: insertNode(node.children) });
                    } else {
                        result.push(node);
                    }
                    if (position === 'after' && node.id === targetId && movedNode) {
                        result.push(movedNode);
                    }
                }
                return result;
            }
        };
        
        let newTree = removeNode([...state.fileTree]);
        if (movedNode) {
            newTree = insertNode(newTree);
        }
        
        set({ fileTree: newTree });
    },
    
    getLanguageFromFileName: (fileName: string): string => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        const languageMap: Map<string, string> = new Map([
            ['js', 'javascript'],
            ['jsx', 'javascript'],
            ['ts', 'typescript'],
            ['tsx', 'typescript'],
            ['json', 'json'],
            ['md', 'markdown'],
            ['css', 'css'],
            ['html', 'html'],
            ['py', 'python'],
        ]);
        return languageMap.get(ext || '') || 'javascript';
    }
}));