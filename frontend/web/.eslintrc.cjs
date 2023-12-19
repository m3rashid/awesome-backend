utils.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"plugin:@tanstack/eslint-plugin-query/recommended",
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', '@tanstack/query', 'simple-import-sort'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'@typescript-eslint/no-unused-vars': 'warn',
		"@tanstack/query/exhaustive-deps": "error",
		"@tanstack/query/stable-query-client": "error",
		'react-refresh/only-export-components': 'warn',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
	},
}
