// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

module.exports = {
  automock: false,
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
