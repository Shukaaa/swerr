import {SwerrCommand} from "./interfaces/swerr-command.js";
import path from "path";
import * as fs from "node:fs";
import {LogUtils} from "@swerr/core";
import {SWERR_CONFIG_FILE} from "../config.js";

const initConfigTemplate = `import {markdownConverter, htmlConverter} from "@swerr/converter"

export default {
    sourceFile: {
        inputDir: "./src/errors", // Directory to scan for error definitions
        meta: {
            projectName: "Your Application Name",
            description: "The Application description",
            version: "1.0.0",
        },
        export: {
            saveToFile: false // Set to true to save the source scheme to a file, perfect for debugging
        },
        options: {
            ignoreDirs: [], // Directories to ignore during scanning (optional)
            whitelistExtensions: [".js"] // File extensions to include during scanning (optional)
        }
    },
    converter: [ // Example converters
        {
            factory: markdownConverter,
            config: {
                outputPath: "./docs",
            }
        },
        {
            factory: htmlConverter,
            config: {
                outputPath: "./docs",
            }
        }
    ]
}`;

export const initCommand: SwerrCommand<[string, string]> = {
	command: "init",
	description: "Create a basic swerr config file.",
	action: async () => {
		const configFilePath = path.resolve(process.cwd(), SWERR_CONFIG_FILE);

		if (fs.existsSync(configFilePath)) {
			LogUtils.error(`A ${SWERR_CONFIG_FILE} file already exists in the current directory.`);
			process.exit(1);
		}

		try {
			await fs.promises.writeFile(configFilePath, initConfigTemplate);
			LogUtils.success(SWERR_CONFIG_FILE + " file has been created successfully.");
		} catch (err) {
			LogUtils.error(`Failed to create ${SWERR_CONFIG_FILE} file: ${err}`);
			process.exit(1);
		}
	}
}