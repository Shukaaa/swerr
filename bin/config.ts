export const ALLOWED_TAGS = [
    "error",
    "exception",
]

export const DEFAULT_IGNORE_DIRS = new Set([
    "node_modules",
    ".git",
    "dist",
    "build",
    "out",
    ".next",
    ".turbo",
    ".cache",
    "coverage",
]);

export const DEFAULT_MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
export const ERROGGER_CONFIG_FILE = "errogger.config.js";
