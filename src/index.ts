#!/usr/bin/env bun

import { parseArgs } from "node:util";
import { upgradeDeps } from "./up";
import { help } from "./help";

const { values } = parseArgs({
    options: {
        dev: { type: "boolean", short: "d" },
        peer: { type: "boolean", short: "p" },
        required: { type: "boolean", short: "r" },
        dryRun: { type: "boolean", short: "n" },
        help: { type: "boolean", short: "h" },
        install: { type: "boolean", short: "i" },
        command: { type: "string", short: "c" },
    }
});

if (values.help) help();

export const options = {
    dependencies: !values.dev && !values.peer,
    devDependencies: !values.required && !values.peer,
    peerDependencies: !values.required && !values.dev,
    dryRun: values.dryRun || false,
    install: values.install || true,
    command: values.command || "yarn",
};

if (values.required || values.dev || values.peer) {
    options.dependencies = values.required;
    options.devDependencies = values.dev;
    options.peerDependencies = values.peer;
}

upgradeDeps(options).catch(console.error);