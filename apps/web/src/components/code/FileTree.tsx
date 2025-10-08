import { FileNode, useProjectFileTreeStore } from "@/src/store/project/useProjectFileTreeStore";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { UncontrolledTreeEnvironment, Tree, TreeItem, TreeItemIndex } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import { File, Folder, FolderOpen, LucideGitPullRequestCreate } from "lucide-react";


function convertToTreeItems(nodes: FileNode[]): Record<TreeItemIndex, TreeItem> {
    const items: Record<TreeItemIndex, TreeItem> = {
        root: {
            index: 'root',
            isFolder: true,
            children: nodes.map(n => n.id),
            data: { name: 'Root' }
        }
    }

    function traverse(node: FileNode) {
        items[node.id] = {
            index: node.id,
            isFolder: node.type === 'folder' ? true : false,
            children: node.children?.map(c => c.id),
            data: {
                name: node.name,
                content: node.content,
                type: node.type
            }
        }
        if (node.children) {
            node.children.forEach(child => traverse(child));
        }
    }

    nodes.forEach(node => traverse(node));
    return items;
}

export default function FileTree() {
    const {
        fileTree,
        selectedFile,
        expandedFolders,
        selectFile,
        toggleFolder
    } = useProjectFileTreeStore();

    const treeItems = convertToTreeItems(fileTree);

    return (
        <div className="w-64 border-r border-neutral-800 flex flex-col h-full bg-neutral-900">
            <div className="px-3 py-2 border-b border-neutral-800 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-neutral-200">explorer</h2>
                <div className="flex gap-1">
                    <Button variant={'link'} className="p-1.5 h-6 w-6.5 hover:bg-neutral-800 rounded">
                        <LucideGitPullRequestCreate size={14} className={cn("text-neutral-400")} />
                    </Button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <UncontrolledTreeEnvironment
                    dataProvider={{
                        async getTreeItem(itemId: TreeItemIndex) {
                            return treeItems[itemId];
                        },
                    }}
                    getItemTitle={(item) => item.data.name}
                    viewState={{
                        'file-tree': {
                            expandedItems: Array.from(expandedFolders),
                            selectedItems: selectedFile ? [selectedFile.id] : [],
                        }
                    }}
                    onExpandItem={(item) => toggleFolder(item.index as string)}
                    onCollapseItem={(item) => toggleFolder(item.index as string)}
                    onSelectItems={(items) => {
                        const itemId = items[0];
                        if (itemId && itemId !== 'root') {
                            const findNode = (nodes: FileNode[], id: string): FileNode | null => {
                                for (const node of nodes) {
                                    if (node.id === id) return node;
                                    if (node.children) {
                                        const found = findNode(node.children, id);
                                        if (found) return found;
                                    }
                                }
                                return null;
                            };
                            const node = findNode(fileTree, itemId as string);
                            if (node && node.type === 'file') {
                                selectFile(node);
                            }
                        }
                    }}
                    renderItemTitle={({ item, context }) => (
                        <div className="flex items-center gap-2">
                            {item.isFolder ? (
                                context.isExpanded ? (
                                    <FolderOpen size={16} className="text-blue-400" />
                                ) : (
                                    <Folder size={16} className="text-blue-400" />
                                )
                            ) : (
                                <File size={16} className="text-neutral-400" />
                            )}
                            <span className="text-sm text-neutral-200">{item.data.name}</span>
                        </div>
                    )}
                    canDragAndDrop
                    canDropOnFolder
                    canReorderItems
                >
                    <Tree treeId="file-tree" rootItem="root" treeLabel="File Tree" />
                </UncontrolledTreeEnvironment>
            </div>
        </div>
    );
}