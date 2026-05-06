import { readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { readdir, stat } from "node:fs/promises";

import type { FileTreeNode, ProjectInfo, Analyzer, CodeMapStats } from "../types.js";

/** Directories to always skip */
const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
  ".cache",
  ".turbo",
  ".vercel",
  "__pycache__",
  ".DS_Store",
]);

/** Files to always skip */
const IGNORE_FILES = new Set([
  ".DS_Store",
  "Thumbs.db",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
]);

/**
 * FileTreeAnalyzer — always runs. Walks the project directory
 * and produces a FileTreeNode tree.
 */
export class FileTreeAnalyzer implements Analyzer {
  name = "file-tree";

  detect(_project: ProjectInfo): boolean {
    return true; // always runs
  }

  async analyze(project: ProjectInfo): Promise<{ fileTree: FileTreeNode; stats: CodeMapStats }> {
    const tree = await walkDir(project.rootPath, project.rootPath);
    const stats = countStats(tree);
    return {
      fileTree: tree,
      stats,
    };
  }
}

/** Recursively walk a directory and build the tree */
async function walkDir(rootPath: string, currentPath: string): Promise<FileTreeNode> {
  const name = currentPath === rootPath
    ? rootPath.split(/[/\\]/).pop() || rootPath
    : currentPath.split(/[/\\]/).pop()!;

  const relPath = relative(rootPath, currentPath) || ".";
  const s = await stat(currentPath);

  if (!s.isDirectory()) {
    return {
      name,
      path: relPath,
      type: "file",
      size: s.size,
      extension: extname(name) || undefined,
    };
  }

  const entries = await readdir(currentPath, { withFileTypes: true });
  const children: FileTreeNode[] = [];

  for (const entry of entries) {
    if (entry.isDirectory() && IGNORE_DIRS.has(entry.name)) continue;
    if (entry.isFile() && IGNORE_FILES.has(entry.name)) continue;

    const childPath = join(currentPath, entry.name);
    try {
      children.push(await walkDir(rootPath, childPath));
    } catch {
      // Skip files we can't read (permissions, broken symlinks)
    }
  }

  // Sort: directories first, then files, alphabetical
  children.sort((a, b) => {
    if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return {
    name,
    path: relPath,
    type: "directory",
    children,
  };
}

/** Count files, directories, and total lines from the tree */
function countStats(tree: FileTreeNode): CodeMapStats {
  let files = 0;
  let directories = 0;
  let totalLines = 0;

  // We'll count lines lazily — just count files and dirs for now.
  // Line counting can be added later when we need it for real.
  function walk(node: FileTreeNode) {
    if (node.type === "file") {
      files++;
    } else {
      directories++;
      node.children?.forEach(walk);
    }
  }

  walk(tree);

  return { files, directories, totalLines };
}
