#!/usr/bin/env node
import {Command} from "commander";
import {readFileSync} from "node:fs";
import path from "path";
import {fileURLToPath} from "node:url";
import {runCommand} from "./commands/run.command.js";
import {initCommand} from "./commands/init.command.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJsonRaw = readFileSync(packageJsonPath, 'utf-8');
const packageJson = JSON.parse(packageJsonRaw);

const cli = new Command();

cli
		.name("swerr")
		.description("Create documentation from your errors.")
		.version(packageJson.version);

const commandModules = [
	runCommand, initCommand
];

for (const commandModule of commandModules) {
	cli
			.command(commandModule.command)
			.description(commandModule.description)
			.action(commandModule.action);
}

cli.parse();
