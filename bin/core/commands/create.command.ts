import {ErroggerCommand} from "../interfaces/errogger-command.js";
import path from "path";
import * as fs from "node:fs";
import {scanJsdocs} from "../../extraction/errogger-scan.js";
import {LogUtils} from "../utils/log.utils.js";
import {translateToSourceScheme} from "../../extraction/translate-to-source-scheme.js";
import {ERROGGER_CONFIG} from "../../errogger.js";

export const createCommand: ErroggerCommand<[string, string]> = {
    command: "create [sourceDir>] [outputDir]",
    description: "Create errogger documentation from the specified source directory and output to the specified file.",
    action: async (sourceDir: string | null, outputDir: string | null) => {
        if (ERROGGER_CONFIG) {
            LogUtils.info("Using Errogger configuration from errogger.config.js");
        } else {
            LogUtils.info("No Errogger configuration file found, proceeding with default settings.");

            if (!sourceDir || !outputDir) {
                LogUtils.error("Source and output directories must be specified if no configuration file is present.");
                process.exit(1);
            }
        }

        const source = sourceDir || ERROGGER_CONFIG?.paths.scanDir || null
        const output = outputDir || ERROGGER_CONFIG?.paths.sourceOutputDir || null

        if (!source || !output) {
            LogUtils.error("Source and output directories must be specified either via command line or configuration file.");
            process.exit(1);
        }

        const absoluteSourceDir = path.resolve(process.cwd(), source);
        const absoluteOutputDir = path.resolve(process.cwd(), output);

        const sourceExists = fs.existsSync(absoluteSourceDir);
        if (!sourceExists) {
            LogUtils.error(`Source directory "${absoluteSourceDir}" does not exist.`);
            process.exit(1);
        }

        try {
            await fs.promises.mkdir(absoluteOutputDir, {recursive: true});
        } catch (err) {
            LogUtils.error(`Failed to create output directory "${absoluteOutputDir}": ${err}`);
            process.exit(1);
        }

        scanJsdocs(absoluteSourceDir).then(async result => {
            LogUtils.success(`Scanned ${result.blocks.length} JSDocs block(s):`);
            const scheme = translateToSourceScheme(result)
            LogUtils.info(`Translated scan result to Errogger Scheme with ${scheme.errors.length} error(s).`);
            const outputFilePath = path.join(absoluteOutputDir, "errogger-docs.json");
            const docContent = JSON.stringify(scheme, null, 2);
            try {
                await fs.promises.writeFile(outputFilePath, docContent, "utf8");
                LogUtils.success(`Errogger Source File written to "${outputFilePath}"`);
            } catch (err) {
                console.error(`Failed to write documentation to "${outputFilePath}":`, err);
                process.exit(1);
            }
        }).catch(err => {
            LogUtils.error(`Error during scanning: ${err}`);
        })
    }
}