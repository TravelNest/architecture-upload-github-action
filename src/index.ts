import { getInput, setOutput } from '@actions/core';
import { read } from './inputReader';
import { build } from './workspaceBuilder';
import { pushWorkspace } from './structurizrClient';


const doc = read('/github/workspace/example.yml');
//const doc = read(getInput('architecture_file'));
const workspace = build(doc);
pushWorkspace(workspace)
.then(response => {
  setOutput('result', response);
});
