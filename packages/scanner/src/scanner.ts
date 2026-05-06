import { basename, join } from "node:path";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

import type {
  CodeMap,
  CodeMapMeta,
  CodeMapStats,
  ProjectInfo,
  Analyzer,
  AnalyzerOutput,
} from "./types.js";
import { SCHEMA_VERSION } from "./types.js";
import { FileTreeAnalyzer } from "./analyzers/file-tree.js";

/** All registered analyzers. FileTree runs first, rest in order. */
const ANALYZERS: Analyzer[] = [
  new FileTreeAnalyzer(),
  // More analyzers added in later issues:
  // ImportGraphAnalyzer, NextJsRoutesAnalyzer, etc.
];

/**
 * Scan a project and produce a CodeMap blueprint.
 *
 * 1. Build ProjectInfo (root path, package.json, etc.)
 * 2. Run all analyzers whose detect() returns true
 * 3. Merge outputs into a single CodeMap
 */
export async function scan(rootPath: string): Promise<CodeMap> {
  const project = await buildProjectInfo(rootPath);

  // Run all applicable analyzers
  const outputs: AnalyzerOutput[] = [];
  for (const analyzer of ANALYZERS) {
    if (analyzer.detect(project)) {
      const output = await analyzer.analyze(project);
      outputs.push(output);
    }
  }

  // Merge into CodeMap
  return mergeOutputs(project, outputs);
}

/** Extract project metadata from the filesystem */
async function buildProjectInfo(rootPath: string): Promise<ProjectInfo> {
  const project: ProjectInfo = { rootPath };

  // Try reading package.json
  const pkgPath = join(rootPath, "package.json");
  if (existsSync(pkgPath)) {
    try {
      const raw = await readFile(pkgPath, "utf-8");
      project.packageJson = JSON.parse(raw);
    } catch {
      // Not a JS project or malformed — that's fine
    }
  }

  return project;
}

/** Merge all analyzer outputs into a single CodeMap */
function mergeOutputs(project: ProjectInfo, outputs: AnalyzerOutput[]): CodeMap {
  // Start with empty defaults
  let fileTree: CodeMap["fileTree"] = {
    name: basename(project.rootPath),
    path: ".",
    type: "directory",
    children: [],
  };
  let stats: CodeMapStats = { files: 0, directories: 0, totalLines: 0 };

  // Merge each output
  for (const output of outputs) {
    if (output.fileTree) fileTree = output.fileTree;
    if (output.stats) stats = output.stats;
  }

  // Build meta
  const meta: CodeMapMeta = {
    name: (project.packageJson?.name as string) || basename(project.rootPath),
    version: SCHEMA_VERSION,
    scannedAt: new Date().toISOString(),
    frameworks: detectFrameworks(project),
    language: detectLanguage(project),
    stats,
  };

  return { meta, fileTree };
}

/** Detect frameworks from package.json dependencies */
function detectFrameworks(project: ProjectInfo): CodeMapMeta["frameworks"] {
  const deps = {
    ...(project.packageJson?.dependencies as Record<string, string>),
    ...(project.packageJson?.devDependencies as Record<string, string>),
  };

  const frameworks: CodeMapMeta["frameworks"] = [];

  const checks: Array<{ pkg: string; name: string }> = [
    { pkg: "next", name: "next.js" },
    { pkg: "express", name: "express" },
    { pkg: "@angular/core", name: "angular" },
    { pkg: "vue", name: "vue" },
    { pkg: "@sveltejs/kit", name: "sveltekit" },
    { pkg: "react", name: "react" },
    { pkg: "@remix-run/react", name: "remix" },
    { pkg: "fastify", name: "fastify" },
    { pkg: "hono", name: "hono" },
    { pkg: "django", name: "django" },
    { pkg: "flask", name: "flask" },
    { pkg: "fastapi", name: "fastapi" },
    { pkg: "rails", name: "rails" },
  ];

  for (const { pkg, name } of checks) {
    if (deps[pkg]) {
      frameworks.push({ name, confidence: 1, version: deps[pkg] });
    }
  }

  return frameworks;
}

/** Detect primary language from file extensions or config files */
function detectLanguage(project: ProjectInfo): string {
  const tsconfig = existsSync(join(project.rootPath, "tsconfig.json"));
  const tsconfigBase = existsSync(join(project.rootPath, "tsconfig.base.json"));
  const pyproject = existsSync(join(project.rootPath, "pyproject.toml"));
  const goMod = existsSync(join(project.rootPath, "go.mod"));
  const cargo = existsSync(join(project.rootPath, "Cargo.toml"));

  if (tsconfig || tsconfigBase) return "typescript";
  if (pyproject) return "python";
  if (goMod) return "go";
  if (cargo) return "rust";

  return "unknown";
}
