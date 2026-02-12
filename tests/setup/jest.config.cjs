module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>'],
    testMatch: ['<rootDir>/unit/**/*.test.js', '<rootDir>/integration/**/*.test.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/mocks/fileMock.js',
    },
    transform: {
        '^.+\\.(js|jsx)$': ['babel-jest', { 
            configFile: './babel.config.cjs'
        }],
    },
    setupFilesAfterEnv: ['<rootDir>/setup/testSetup.js'],
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
