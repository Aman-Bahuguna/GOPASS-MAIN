module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.test.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__tests__/__mocks__/fileMock.js',
    },
    transform: {
        '^.+\\.(js|jsx)$': ['babel-jest', { 
            configFile: './babel.config.cjs'
        }],
    },
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/testSetup.js'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/*.test.{js,jsx}',
        '!src/index.js',
        '!src/main.jsx',
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/build/',
        '/dist/',
    ],
    moduleDirectories: ['node_modules', 'src'],
    testTimeout: 10000,
    verbose: true,
};
