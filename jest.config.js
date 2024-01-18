/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    setupFilesAfterEnv: ['<rootDir>/tests/jest.after-setup.ts'],
    setupFiles: ['<rootDir>/tests/jest.setup.ts']
};
