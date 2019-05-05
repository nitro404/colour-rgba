var fabricator = require("gulp-fabricator");

fabricator.setup({
	name: "Colour Rgba",
	build: {
		enabled: false,
		transformation: "None"
	},
	test: {
		target: ["src/*.js"]
	},
	base: {
		directory: __dirname
	}
});
