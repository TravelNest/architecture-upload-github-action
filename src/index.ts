import { processFile } from './processor';


processFile('/github/workspace/architecture.yml')
.then(() => {
  console.log('Processing complete');
})
.catch((ex => {
  console.error(ex);
  throw ex;
}));
