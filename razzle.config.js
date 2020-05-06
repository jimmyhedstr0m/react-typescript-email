'use strict';
const path = require("path");

module.exports = {
  modify(config, { target, dev }, webpack) {
    const appConfig = config;

    for (const rule of appConfig.module.rules) {
      if (rule.test && rule.test.toString() === "/\\.module\\.css$/") {
        const scss = { ...rule };

        scss.test = /\.scss$/;
        scss.include = path.join(__dirname, "src");
        scss.use.push({ loader: "sass-loader" });

        appConfig.module.rules.push(scss);

        break;
      }
    }

    if (target === 'web') {
      appConfig.output.filename = dev
        ? 'static/js/[name].js'
        : 'static/js/[name].[hash:8].js';

      appConfig.optimization = {
        ...appConfig.optimization,
        splitChunks: {
          chunks: 'initial',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    config.devtool = process.env.GENERATE_SOURCEMAP ? 'source-map' : false;

    return appConfig;
  },
  plugins: [
    {
      name: 'typescript',
      options: {
        forkTsChecker: {
          memoryLimit: 2048,
          workers: 1
        }
      }
    },
  ],
};
