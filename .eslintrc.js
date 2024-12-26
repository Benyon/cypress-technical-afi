module.exports = {
  root: true,
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  ignorePatterns: [
    'node_modules/', 
    '.eslintrc.js'
  ],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@stylistic/js',
    '@typescript-eslint',
    'no-only-tests',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  overrides: [
    // Test specific rules.
    {
      'files': ['cypress/e2e/**/*.ts'],
      'rules': {
        'no-only-tests/no-only-tests': 'error',
        /**
         * Reason:
         * - Lodash is exposed through Cypress, it doesnt matter which way we use it, as long as we're consistent.
         * - Fixture files should only be imported through the cy.fixtures command, any other static test data should have its own directory.
         */
        'no-restricted-imports': ['error', {
          'paths': [{
            'name': 'lodash',
            'message': 'Import [module] from lodash/[module] instead',
          }],
          'patterns': [{
            'group': ['fixtures/(?!cms/)'],
            'message': 'Do not directly import from fixtures, use cy.fixture()'
          }],
        }],
        'no-restricted-syntax': [
          'error',
          {
            // Reason: Dynamic test names can cause confusion in reporting and cause issues with reporting systems that trace previous runs.
            'selector': 'CallExpression[callee.name=/^(describe|it|context)$/] > TemplateLiteral[quasis.length > 1]',
            'message': 'Don\'t use template literals in a test name, test names should be entirely static!'
          },
          {
            // Reason: Dynamic test names can cause confusion in reporting and cause issues with reporting systems that trace previous runs.
            'selector': 'CallExpression[callee.name=/^(describe|it|context)$/] > Identifier:first-child',
            'message': 'Don\'t use identifers in a test name, test names should be entirely static!'
          }
        ]
      }
    },
    // Page object specific rules.
    {
      'files': ['cypress/pages/**/*.ts'], 
      'rules': {
        'no-restricted-syntax': [
          'error',
          {
            // Reason: To reduce redudant page methods, becomes an issue in larger frameworks with multiple pages.
            'selector': 'ClassDeclaration[superClass.name="BasePage"] MethodDefinition[key.name=/^(goto|go|navigate|navigateTo|open|load|open|openPage|visitPage|enter|enterPage)$/]',
            'message': 'Only use the method name "visit" for page navigation, do not have duplicate or non standardised visit methods.'
          },
          {
            // Reason: So more appropriate linting can be added below, and to align everybody to the the naming standard.
            'selector': 'ClassDeclaration > Identifier[name!=/(Page|Component)$/]',
            'message': 'All page or component files must be appropriately named with either `Component` or `Page` at the end of the class name.\n\ni.e. HomePage, or FooterComponent'
          },
          {
            // Reason: To avoid page files inheriting the appropriate methods and properties.
            'selector': 'ClassDeclaration[id.name!="BasePage"][superClass.name!="BasePage"] > Identifier[name=/(Page)$/]',
            'message': 'All page components must extend from the BasePage class.'
          },
          {
            // Reason: To reduce duplicate page methods as there should always be a visit() method inherited from BasePage.
            'selector': 'ClassDeclaration[id.name=/(Component)$/] MethodDefinition[key.name=/^(visit|goto|go|navigate|navigateTo|open|load|open|openPage|visitPage|enter|enterPage)$/]',
            'message': 'Components should not have a any visit or navigation methods.'
          },
          {
            // Reason: This page object model only exposes methods acting as parameterised test steps, logic should be contained within the pages, not the test files.
            'selector': 'ClassDeclaration[id.name=/(Page|Component)$/] MethodDefinition[kind="get"][accessibility!="private"]',
            'message': 'No public get accessors in page or component files, please only create parameterised methods to keep the test steps simple and re-usable, private accessors are allowed.'
          },
          {
            // Reason: This page object model only exposes methods acting as parameterised test steps, logic should be contained within the pages, not the test files.
            'selector': 'ClassDeclaration[id.name=/(Page|Component)$/] PropertyDefinition[accessibility!="private"]',
            'message': 'No public properties in page or comlponent files, please only create parameterised methods to keep the test steps simple and re-usable, private properties are allowed.'
          },
          {
            // Reason: This page object model only exposes methods acting as parameterised test steps, logic should be contained within the pages, not the test files.
            'selector': 'ClassDeclaration[id.name=/(Page|Component)$/] PropertyDefinition[value.async]',
            'message': 'No functions as property values in page or component files, please use parameterised methods.'
          }
        ]
      }
    }
  ],
  rules: {
    // General rules
    'no-param-reassign': ['error', { props: false }],
    '@stylistic/js/no-extra-parens': ['error', 'all'],
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-void': 'off',
    'camelcase': 'off',

    // Import rules
    'import/no-cycle': 'off',
    'import/no-named-as-default': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],

    // TypeScript rules
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-empty-interface': ['warn', { allowSingleExtends: false }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'ignoreRestSiblings': true,
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 20,
      },
    ],

    // Style rules
    '@stylistic/js/quotes': ['error', 'single', { 'allowTemplateLiterals': false }],
    '@stylistic/js/linebreak-style': 'off',
    '@stylistic/js/lines-between-class-members': 'off',
    '@stylistic/js/no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
    '@stylistic/js/comma-dangle': 'error',
    '@stylistic/js/implicit-arrow-linebreak': 'off',
    'lines-between-class-members': 'off',
    'prettier/prettier': 'off',
    'max-len': [
      'error',
      {
        code: 90,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
        ignoreComments: true,
      },
    ],
  }
};
