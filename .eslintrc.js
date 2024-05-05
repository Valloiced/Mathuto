module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    plugins: ['react', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        '@react-native-community/recommended'
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        semi: 0,
        'comma-dangle': [2, 'never'],
        'react/jsx-filename-extension': [1, { extensions: ['js', 'jsx'] }],
        'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
        'no-use-before-define': ['error', { functions: true, classes: true, variables: false }],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto'
            }
        ]
    },
    ignorePatterns: ['node_modules/', 'prettierrc.js', 'eslintrc.js', 'android']
};
