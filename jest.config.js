module.exports = {
    globals: {
        'ts-jest': {
        tsConfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: [
        'js',
        'ts',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: [
        '**/*.spec.(ts|js)',
    ],
    testEnvironment: 'node',
    preset: 'ts-jest',
};