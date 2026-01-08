export type ScanResult = {
    rootDir: string;
    blocks: JsdocBlock[];
    scannedFiles: number;
    skippedFiles: number;
};

export type ScanOptions = {
    ignoreDirs?: string[];
    whitelistExtensions?: string[];
}