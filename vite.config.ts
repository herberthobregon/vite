import { RollupBabelInputPluginOptions, babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import summary from "rollup-plugin-summary";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import { defineConfig } from "vite";

const babelConfig: RollupBabelInputPluginOptions = {
	plugins: [],
	exclude: "node_modules/**",
	babelrc: false,
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					browsers: "chrome >= 62"
				},
				useBuiltIns: "usage",
				corejs: "3"
			}
		]
	]
};

// https://vitejs.dev/config/
export default (opts: { mode: "production" | "development"; command: "build" | "serve" }) => {
	return defineConfig({
		server: {
			port: 9000,
			host: "0.0.0.0"
		},
		plugins: [],
		build: {
			target: "es2020",
			rollupOptions: {
				input: {
					index: "./src/index.js"
				},
				output: {
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
					summary({}) as any
				]
			}
		}
	});
};
