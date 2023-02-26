const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	mode: "production",
	target: "node",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false,
					},
				},
				extractComments: false,
			}),
		],
	},
	externals: {
		bcrypt: "commonjs bcrypt",
		compression: "commonjs compression",
		cors: "commonjs cors",
		dotenv: "commonjs dotenv",
		express: "commonjs express",
		"http-errors": "commonjs http-errors",
		jsonwebtoken: "commonjs jsonwebtoken",
		mongoose: "commonjs mongoose",
		"mongoose-autopopulate": "commonjs mongoose-autopopulate",
		"firebase-admin": "commonjs firebase-admin",
		"mongoose-slug-generator": "commonjs mongoose-slug-generator",
		morgan: "commonjs morgan",
		googleapis: "commonjs googleapis",
		nodemailer: "commonjs nodemailer",
	},
};
