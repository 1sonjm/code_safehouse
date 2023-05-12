module.exports = {
	extends: 'next/core-web-vitals',
	plugins: [
		'eslint-plugin-simple-import-sort',
		'unused-imports',
		'react-hooks',
	],
	ignorePatterns: [
		'**/node_modules/*.js',
	],
	rules: {
		// 익명의 기본 내보내기를 금지합니다.
		'import/no-anonymous-default-export': ['error', {
			allowArray: false,
			allowArrowFunction: false,
			allowAnonymousClass: false,
			allowAnonymousFunction: false,
			allowCallExpression: true,
			allowNew: false,
			allowLiteral: false,
			allowObject: false,
		}],
		// 쉼표 뒤에 항상 줄바꿈을 강제합니다.
		'comma-dangle': ['error', {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'never',
			exports: 'never',
			functions: 'never',
		}],
		// 들여쓰기를 강제합니다.
		'indent': ['error', 'tab'],
		// 작은 따옴표를 강제합니다.
		'quotes': ['error', 'single'],
		// 파일의 마지막 줄에 줄바꿈을 강제합니다.
		'eol-last': 'error',
		// 세미콜론을 금지합니다.
		'semi': ['error', 'never'],
		// import 정렬을 강제합니다.
		'simple-import-sort/imports': 'error',
		// export 정렬을 강제합니다.
		'simple-import-sort/exports': 'error',
		// 사용하지 않는 변수를 금지합니다.
		'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false, varsIgnorePattern: '^set[A-Z]' }],
		// 사용하지 않는 import를 금지합니다.
		'unused-imports/no-unused-imports-ts': ['error'],
		// 쉼표 앞에 공백을 금지하고 쉼표 뒤에 공백을 강제합니다.
		'comma-spacing': ['error', { before: false, after: true }],

		// 이스케이프되지 않은 엔티티를 허용합니다.
		'react/no-unescaped-entities': 'off',
		// 컴포넌트와 HTML에서 자체 닫는 태그를 강제합니다.
		'react/self-closing-comp': ['error', {
			component: true,
			html: true,
		}],

		// eslint-plugin-react =========================================
		// JSX에서 첫 번째 속성의 적절한 위치를 강제합니다.
		'react/jsx-first-prop-new-line': 'error',
		// JSX에서 닫는 괄호 위치를 줄에 맞춥니다.
		'react/jsx-closing-bracket-location': [1, 'line-aligned'],
		// 불리언 속성의 일관된 명명을 강제합니다.
		'react/boolean-prop-naming': ['error', { 'rule': '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
		// React 컴포넌트 정의에서 displayName이 누락되지 않도록 합니다.
		'react/display-name': 'warn',
		// 특정 요소를 금지합니다.
		'react/forbid-elements': ['error', { 'forbid': ['form'] }],
		// JSX 들여쓰기를 강제합니다.
		'react/jsx-indent': ['warn', 'tab', {indentLogicalExpressions: true}],
		// JSX 한줄 당 props 최대 수를 제한합니다.
		'react/jsx-max-props-per-line': ['error', { 'maximum': 2 }],
		// useState hook 값과 setter 변수의 구조 분해 및 대칭 명명을 보장합니다.
		'react/hook-use-state': 'error',

		// hooks 에 의존성을 가진 객체를 모두 포함합니다
		'react-hooks/exhaustive-deps': 'warn',

		// 사용자 지정 글꼴 페이지를 허용합니다.
		'@next/next/no-page-custom-font': 'off',
	},
}
