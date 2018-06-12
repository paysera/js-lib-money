module.exports = {
    roots: [
        'src/',
    ],
    testRegex: '(/__tests__/.*\\.test)\\.jsx?$',
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!lodash-es)'
    ]
};
