module.exports = {
  context: __dirname,
  entry: './hello.js',
  output: {
    path: __dirname + '/build',
    filename: 'hello.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.(vert|frag)$/,
        loader: 'raw'
      }
    ]
  }
};