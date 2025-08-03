const fs = require('fs');
const path = require('path');

// Files to embed
const filesToEmbed = [
	'app/server-components/Delay.js',
	'app/server-components/async/Delays.js'
];

const embedSources = () => {
	const sources = {};

	filesToEmbed.forEach((filePath) => {
		try {
			const fullPath = path.join(process.cwd(), filePath);
			if (fs.existsSync(fullPath)) {
				sources[filePath] = fs.readFileSync(fullPath, 'utf-8');
			}
		} catch (error) {
			console.warn(`Could not read ${filePath}:`, error.message);
		}
	});

	// Write the embedded sources to a JSON file
	const outputPath = path.join(process.cwd(), 'app/embedded-sources.json');
	fs.writeFileSync(outputPath, JSON.stringify(sources, null, 2));
	console.log(`Embedded ${Object.keys(sources).length} source files`);
};

embedSources();
