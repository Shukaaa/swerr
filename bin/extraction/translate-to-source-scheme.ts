import {ScanResult} from "./types/scan.js";
import {ErroggerScheme} from "./types/errogger-scheme.d.js";
import {JsdocBlock} from "./types/jsdoc.js";
import path from "path";
import {LogUtils} from "../core/utils/log.utils.js";
import {ERROGGER_CONFIG} from "../errogger.js";

export function translateToSourceScheme(scanResult: ScanResult): ErroggerScheme {
    const name = ERROGGER_CONFIG?.meta.projectName || "Generated Errogger Scheme";
    const description = ERROGGER_CONFIG?.meta.description ||`Errogger documentation generated from scanning ${scanResult.scannedFiles} file(s) with ${scanResult.blocks.length} error block(s).`;
    const version = ERROGGER_CONFIG?.meta.version || "1.0.0";
    const errors = scanResult.blocks.map(block => {
        if (!block.tags.find((t:any) => t.name === "error")) {
            LogUtils.debug(`Skipping JSDocs block without @error tag in file: ${block.filePath}`);
            return
        }

        return {
            name: getErrorNameFromBlock(block),
            description: block.description,
            tags: block.tags.map((tag: any) => ({
                name: tag.name,
                description: tag.raw.trim()
            }))
        };
    });
    return {
        name,
        description,
        version,
        errors: errors.filter((e): e is Exclude<typeof e, undefined> => e !== undefined)
    };
}

function getErrorNameFromBlock(block: JsdocBlock): string {
    const errorTag = block.tags.find(tag => tag.name === "error");
    if (errorTag && errorTag.raw.trim().length > 0) {
        const parts = errorTag.raw.trim().split(/\s+/);
        return parts[0];
    }

    const fileName = path.basename(block.filePath);
    return fileName.replace(/\.[^/.]+$/, "");
}