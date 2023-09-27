module.exports = {
  env: { browser: true, node: true, es2020: true },

  /* 继承某些已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // 添加 prettier 插件
  ],

  /* 指定如何解析语法 */
  parser: '@typescript-eslint/parser',

  /* 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'react-refresh', 'simple-import-sort'],

  /**
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
    '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            // 以字母(或数字或下划线)或“@”后面跟着字母开头的东西,通常为内置模块引入
            '^@?\\w',
            // 内部导入 "@/"
            '^@(/.*|$)',
            `^@/assets$`,
            `^@/components$`,
            `^@/config$`,
            `^@/hooks$`,
            `^@/plugins$`,
            `^@/routers$`,
            `^@/store$`,
            `^@/styles$`,
            `^@/types$`,
            `^@/utils$`,
            // 父级导入. 把 `..` 放在最后.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            // 同级导入. 把同一个文件夹.放在最后
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
            // 样式导入.
            '^.+\\.?(css|less|scss)$',
            // 带有副作用导入，比如import 'a.css'这种.
            '^\\u0000',
          ],
        ],
      },
    ],
    'simple-import-sort/exports': 'error', // 导出
    'import/order': 'off',
  },
};
