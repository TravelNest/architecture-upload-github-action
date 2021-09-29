import { processFile } from '../processor';
import * as uploader from '../uploader';


const mockPutObjectResponse = 'yup';
jest.mock('aws-sdk', () => {
	const mockS3 = {
		putObject: jest.fn().mockImplementation(() => {
			return {
				promise: jest.fn().mockImplementation(() => {
					return Promise.resolve(mockPutObjectResponse);
				})
			};
		})
	};

	return {
		S3: jest.fn(() => mockS3),
		Credentials: jest.fn(() => { return; }),
		config: {
			update: jest.fn()
		}
	};
});

const mockSetFailed = jest.fn();
const mockSetOutput = jest.fn();
jest.mock('@actions/core', () => {
	return {
		getInput: jest.fn(),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		setFailed: jest.fn().mockImplementation((msg) => mockSetFailed(msg)),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		setOutput: jest.fn().mockImplementation((field, msg) => mockSetOutput(field, msg)),
	}
});

jest.mock('@actions/github', () => {
	return {
		context: {
			repo: {
				owner: 'fred',
				repo: 'doughnuts'
			}
		}
	}
});

describe('processFile', () => {
	// Wipe out the input arguments to prevent yaml parser from picking them up
	process.argv = [];
	it('sets failure response if validation fails', async () => {
        await processFile('./src/__tests__/badYaml.yml');
		expect(mockSetFailed).toHaveBeenCalledWith('Validation failed: components.0.relationships.0.to is required.');
	});
	it('sets success after uploading to S3', async () => {
		await processFile('./src/__tests__/goodYaml.yml');
		expect(mockSetOutput).toHaveBeenCalledWith('result', mockPutObjectResponse);
	});
	it('sets failure on failure to read file', async () => {
		jest.spyOn(uploader, 'upload').mockReturnValue(Promise.reject('bad stuff man'));
		await processFile('./src/__tests__/goodYaml.yml');
		expect(mockSetFailed).toHaveBeenCalledWith('Upload failed: bad stuff man');
	});
});