module.exports = {
  entry: {
    'bundle': './app/app.ts',
    'test': './test/tests.ts'
  },
  output: {
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  devtool: 'source-map', // if we want a source map

  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}
