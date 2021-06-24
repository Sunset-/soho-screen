const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	"iot-gw": {
		//构建目标文件件，放置静态资源
		contentBase: path.resolve(__dirname, "../static"),
		//构建入口
		entry: {
			main: [path.resolve(__dirname, `../base/app.js`)]
		},
		//构建出口
		output: {
			filename: "[name].[hash:8].js",
			path: path.resolve(__dirname, "../static")
		},
		//构建出口
		dist: {
			filename: "[name].[hash:8].js",
			path: path.resolve(__dirname, "../dist/iot-gw_front")
		},
		//插件
		plugins: [
			new HtmlWebpackPlugin({
				chunks: ["main"],
				template: path.resolve(__dirname, "../base/index.html"),
				hash: true // 会在打包好的bundle.js后面加上hash串
			})
		]
	},
	urm: {
		//构建目标文件件，放置静态资源
		contentBase: path.resolve(__dirname, "../build"),
		//构建入口
		entry: {
			main: [path.resolve(__dirname, `../src/urm/app.js`)]
		},
		//构建出口
		output: {
			filename: "[name].js",
			path: path.resolve(__dirname, "../build")
		},
		//构建出口
		dist: {
			filename: "[name].js",
			path: path.resolve(__dirname, "../dist/urm_front")
		},
		//插件
		plugins: [
			new HtmlWebpackPlugin({
				chunks: ["main"],
				template: path.resolve(__dirname, "../build/templates/index.html"),
				hash: true // 会在打包好的bundle.js后面加上hash串
			})
		]
	}
};
