import resolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import summary from "rollup-plugin-summary";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const babelConfig = {
	plugins: [],
	exclude: "node_modules/**",
	babelrc: false,
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					browsers: "chrome >= 40"
				},
				useBuiltIns: "usage",
				corejs: "3"
			}
		]
	]
};

module.exports = {
	input: {
		index: "./src/index.js"
	},
	// Specifies two JS output configurations, modern and legacy, which the HTML plugin will
	// automatically choose between; the legacy build is compiled to ES5
	// and SystemJS modules
	output: {
		// Legacy JS bundles (ES5 compilation and SystemJS module output)
		format: "umd",
		strict: false,
		chunkFileNames: `[name].[hash].js`,
		entryFileNames: "[name].bundle.js",
		dir: "dist"
	},
	plugins: [
		// Resolve bare module specifiers to relative paths
		resolve({
			browser: true
		}),
		commonjs({
			sourceMap: false
		}),
		// babel config
		babel(babelConfig),

		// Minify JS
		terser({
			format: {
				comments: false
			},
			compress: false,
			module: true
		}),
		// Print bundle summary
		summary({})
	]
};
