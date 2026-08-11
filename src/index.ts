#!/usr/bin/env bun

import { parseArgs } from "node:util";
import { upgradeDeps } from "./up";
import { help } from "./help";

const { values } = parseArgs({
	options: {
		dev: {
			type: "boolean",
			short: "d",
		},
		peer: {
			type: "boolean",
			short: "p",
		},
		required: {
			type: "boolean",
			short: "r",
		},
		dryRun: {
			type: "boolean",
			short: "n",
		},
		help: {
			type: "boolean",
			short: "h",
		},
		install: {
			type: "boolean",
			short: "i",
		},
		command: {
			type: "string",
			short: "c",
		},
		ignore: {
			type: "string",
			short: "x",
		},
		alpha: {
			type: "string",
			short: "a",
		},
		beta: {
			type: "string",
			short: "b",
		},
		version: {
			type: "boolean",
			short: "v",
		},
	},
});

if (values.help) help();

if (values.version) {
	console.log(require("../package.json").version);
	process.exit(0);
}

export const options = {
	dependencies: !values.dev && !values.peer,
	devDependencies: !values.required && !values.peer,
	peerDependencies: !values.required && !values.dev,
	dryRun: values.dryRun || false,
	install: values.install || true,
	command: values.command || "bun i",
	ignore: values.ignore && values.ignore.split(","),
	alpha: values.alpha && values.alpha.split(","),
	beta: values.beta && values.beta.split(","),
};
options.ignore ||= [];
options.alpha ||= [];
options.beta ||= [];

if (values.required || values.dev || values.peer) {
	options.dependencies = values.required;
	options.devDependencies = values.dev;
	options.peerDependencies = values.peer;
}

upgradeDeps(options).catch(console.error);
