const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
     title: 'Development',
    }),
  ],
  devtool: 'inline-source-map',  
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};