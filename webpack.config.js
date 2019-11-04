const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const optimize = merge([
  {
    optimization: {
      namedModules: true,
      noEmitOnErrors: true,
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            mangle: {
              keep_fnames: true,
            },
            warnings: false, // ? Suppress uglification warnings
            compress: {
              pure_getters: true,
              unsafe: true,
              unsafe_comps: true,
            },
            output: {
              comments: false,
            },
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            exclude: [/\.min\.js$/gi], // ? skip pre-minified libs
          },
        }),
      ],
    },
  },
]);

const common = merge([
  {
    output: {
      filename: 'common.es5.js',
    },
    // disable ratelimit size warnings
    performance: {
      hints: false,
    },
    stats: {
      reasons: false,
      modules: false,
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  },
]);

module.exports = (env) => {
  const isProduction = env;

  const prodConfig = merge([
    common,
    {
      plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
      ],
      mode: 'production',
    },
    optimize,
  ]);

  const devConfig = merge([
    common, {
      plugins: [new webpack.HotModuleReplacementPlugin()],
      devtool: 'source-map',
      mode: 'development',
    },
  ]);

  return (isProduction ? prodConfig : devConfig);
};
