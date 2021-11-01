import { getInput } from '@actions/core';
import { processFile } from './processor';


const architecture_file = getInput('architecture_file');
processFile(`/github/workspace/source_repo/${architecture_file}`)
.then(() => {
  console.log('Processing complete');
})
.catch((ex => {
  console.error(ex);
  throw ex;
}));
