import { getInput } from '@actions/core';


const structurizrWorkspaceId = parseInt(getInput('structurizr_workspace_id'), 10);
const structurizrApiKey = getInput('structurizr_api_key');
const structurizrApiSecret = getInput('structurizr_api_secret');

export {
	structurizrWorkspaceId,
    structurizrApiKey,
    structurizrApiSecret
}
