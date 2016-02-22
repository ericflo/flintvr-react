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
        loader: 'babel',
        query: {
            presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(vert|frag)$/,
        loader: 'raw'
      }
    ]
  }
};