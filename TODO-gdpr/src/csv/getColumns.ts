import { parse as parseSync } from 'csv-parse/sync';
import { getFirstLine } from './getFirstLine.js';

const getColumns = async (inFilePath: string, delimiter: string = ','): Promise<string[]> => {
	return parseSync(
		await getFirstLine(inFilePath),
		{ delimiter, to_line: 1 }
	)[0];
};

export {
	getColumns,
};
