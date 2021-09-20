# Diagram Deployment Github Action
This GitHub action will automatically read an architecture file and deploy it as a diagram to Strucurizr for viewing.

## Inputs
### `architecture_file`
**Required** File path for architecture

### `structurizr_workspace_id`
**Required** Structurizr workspace ID

### `structurizr_api_key`
**Required** Structurizr API Key

### `structurizr_api_secret`
**Required** Structurizr API Secret

## Outputs
### `result`
The result of the upload to Structurizr.

## Example usage
```yaml
- name: Checkout
  uses: actions/checkout@v2
- name: Diagram Upload
  id: diagram_upload
  uses: TravelNest/diagram-deploy@master
  with:
    architecture_file: architecture.yml
    structurizr_workspace_id: ${{ secrets.STRUCTURIZR_WORKSPACE_ID }}
    structurizr_api_key: ${{ secrets.STRUCTURIZR_API_KEY }}
    structurizr_api_secret: ${{ secrets.STRUCTURIZR_API_SECRET }}
  - name: Get the output
  run: echo ${{ steps.diagram_upload.outputs.result }}
```