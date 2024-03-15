/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig = {
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts", "!src/__mocks__/**"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|ttf)$": "<rootDir>/src/__mocks__/fileMock.js",
    "^.+\\.css$": "<rootDir>/src/__mocks__/styleMock.js",
    "^.+\\.svg$": "<rootDir>/src/__mocks__/svgMock.js",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^features/(.*)$": "<rootDir>/src/features/$1",
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.json", isolatedModules: true }],
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  snapshotSerializers: ["@emotion/jest/serializer"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default jestConfig;
