import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    roots: ["./src"],
    collectCoverage: true,
    coverageDirectory: "coverage",
    testEnvironment: "node"
};

export default config;
