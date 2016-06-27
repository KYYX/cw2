process.env.NODE_ENV = 'development';

var webpack = require('webpack');

module.exports = {
	devtool: '#source-map',
	resolve: {
        extensions: ['', '.js', 'json']
	},
	entry: './src/cw2',
	output: {
		path: __dirname + "/build",
		// publicPath: 'http://localhost:3000/scripts/',
		// filename: '[name].js'
		filename: 'cw2.js'
	},
	module: {
		loaders: [{
			test: /\.less$/,
			loaders: ['style', 'css', 'less'],
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=40000' //40KB
		}, {
			test: /\.json$/,
  			loader: 'json'
		}, {
	        test: /\.jsx?$/,
	        loader: 'babel',
	        query: {
	          presets: ['es2015']
	        }
	    }]
	},
	plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
  		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
        // new webpack.HotModuleReplacementPlugin()
    ]
};