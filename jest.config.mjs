import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ['whatwg-fetch'],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/", "/e2etest/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/libs/(.*)$": "<rootDir>/src/libs/$1",
    "^@/prismaActions/(.*)$": "<rootDir>/src/prismaActions/$1",
  },
};

export default createJestConfig(config);
