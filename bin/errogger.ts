#!/usr/bin/env node
import {Command} from "commander";
import {existsSync, readFileSync} from "node:fs";
import path from "path";
import {fileURLToPath, pathToFileURL} from "node:url";
import {createCommand} from "./core/commands/create.command.js";
import {LogUtils} from "./core/utils/log.utils.js";
import {ERROGGER_CONFIG_FILE} from "./config.js";
import {ErroggerConfig} from "./core/interfaces/errogger-config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJsonRaw = readFileSync(packageJsonPath, 'utf-8');
const packageJson = JSON.parse(packageJsonRaw);

const cli = new Command();
export let ERROGGER_CONFIG: null | ErroggerConfig = null

cli
    .name("errogger")
    .description("Create documentation from your errors.")
    .version(packageJson.version);

(async () => {
    const configPath = path.resolve(process.cwd(), ERROGGER_CONFIG_FILE);
    let config: any = null;

    if (existsSync(configPath)) {
        LogUtils.debug(`Loading configuration from ${configPath}`);
        try {
            const imported = await import(pathToFileURL(configPath).href);
            config = imported.default ?? imported;
        } catch (err) {
            LogUtils.error(`Failed to load configuration from ${configPath}: ${err}`);
            process.exit(1);
        }
    }
    ERROGGER_CONFIG = config as ErroggerConfig;

    const commandModules = [
        createCommand
    ];

    for (const commandModule of commandModules) {
        cli
            .command(commandModule.command)
            .description(commandModule.description)
            .action(commandModule.action);
    }

    await cli.parseAsync(process.argv);
})();