module.exports = {
	entry: './src/main.js',
	output: {
		path: 'public/dist',
    publicPath: 'public/dist',
		filename: 'bundle.js',
	},

	devServer: {
		inline: true,
		port: 9000
	},

  devtool: 'source-map',

	module: {
	  loaders: [
	    {
  			test: /\.js$/,
  			exclude: /node_modules/,
  			loader: "babel-loader",
  			query: {
  				presets: ['es2015', 'react']
  		  }
  		}
	  ]
	}
};
