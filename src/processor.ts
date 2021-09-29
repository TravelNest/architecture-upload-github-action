import { setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { readFileSync } from 'fs';
import { upload } from './uploader';
import { validate } from './validator';


export const processFile = async (path: string): Promise<void> => {
    // Validate the yaml schema
    const validationErrors = validate(path);
    if (validationErrors.length > 0) {
      console.error(`Validation failed: ${validationErrors[0].message}`);
      setFailed(`Validation failed: ${validationErrors[0].message}`);
    } else {
      // Read the file and upload it to S3
      try {
        const body = readFileSync(path);
        const result = await upload(body, `${context.repo.owner}-${context.repo.repo}.yml`);
        setOutput('result', result);
      } catch (ex) {
        console.error(ex);
        setFailed(`Upload failed: ${ex as string}`);
      }
    }
  };