import { Workspace, StructurizrClient } from "structurizr-typescript";
import { structurizrWorkspaceId, structurizrApiKey, structurizrApiSecret } from './secrets';


const pushWorkspace = (workspace: Workspace) => {
    if (!structurizrWorkspaceId) {
        throw 'Workspace ID is missing';
      }
      if (!structurizrApiKey) {
        throw 'Api Key is missing';
      }
      if (!structurizrApiSecret) {
        throw 'Api Secret is missing';
      }
      
      const client = new StructurizrClient(structurizrApiKey, structurizrApiSecret);
      
      return client.putWorkspace(structurizrWorkspaceId, workspace);
};

export {
    pushWorkspace
}
