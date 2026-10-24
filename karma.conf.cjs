// aqui se configura jasmine y karma para las pruebas del proyecto
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['tests/index.test.jsx'],
    preprocessors: { 'tests/index.test.jsx': ['webpack'] },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [{
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: { chrome: '110' } }],
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
              plugins: [['babel-plugin-istanbul', { exclude: ['**/tests/**'] }]],
            },
          },
        }],
      },
      stats: 'errors-warnings',
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        { type: 'text-summary' },
      ],
    },
    browsers: ['ChromeHeadlessSinSandbox'],
    customLaunchers: {
      ChromeHeadlessSinSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
    },
    singleRun: true,
    client: { clearContext: false },
    browserNoActivityTimeout: 60000,
  });
};
