require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: ['./node_modules/@big-whale-labs/bwl-eslint-backend'],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    "no-relative-import-paths/no-relative-import-paths": "off"
  }
}
