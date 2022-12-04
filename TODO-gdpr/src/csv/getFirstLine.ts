import fs from 'fs';
import readline from 'readline';

export const getFirstLine = async (filePath: string): Promise<string> => {
	const input = fs.createReadStream(filePath);
	const reader = readline.createInterface({ input });
	const line = await new Promise<string>((resolve) => {
		reader.on('line', (line) => {
			reader.close();
			resolve(line);
		});
	});

	input.close();

	return line;
};
