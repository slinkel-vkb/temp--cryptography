import { parse } from 'csv-parse';
import { parse as parseSync } from 'csv-parse/sync';
import { stringify } from 'csv-stringify';
import fs from 'fs';
import { transform } from 'stream-transform';
import { getColumns } from './getColumns.js';
import { getFirstLine } from './getFirstLine.js';

const transformCsv = async (args: {
	inFilePath: string,
	outFilePath: string,
	delimiter?: string,
	transformRecord?: (record: Record<string, any>) => Record<string, any> | null,
	transformHeader?: (record: Record<string, string>) => Record<string, string>,
}): Promise<void> => {
	const {
		inFilePath,
		outFilePath,
	} = args;
	const delimiter = args.delimiter ?? ',';
	const transformRecord = args.transformRecord ?? (row => row);
	const transformHeader = args.transformHeader ?? (row => row);

	const columns = await getColumns(inFilePath, delimiter);

	const getTransformRecord = () => {
		let isFirstRow = true;

		return (row: Record<string, any>) => {
			if (isFirstRow) {
				isFirstRow = false;

				return transformHeader(row);
			}

			return transformRecord(row);
		};
	};

	const stream = fs.createReadStream(inFilePath).
		pipe(parse({ delimiter, columns })).
		pipe(transform(getTransformRecord())).
		pipe(stringify({ delimiter, columns })).
		pipe(fs.createWriteStream(outFilePath));

	return new Promise(
		(resolve, reject) => {
			stream.on('close', () => resolve());
			stream.on('error', (err) => reject(err));
		}
	);
};

export {
	transformCsv
};
