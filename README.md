# Architecture Upload Github Action
This GitHub action will automatically read an architecture file and upload it to S3 for processing.

## Inputs
### `architecture_file`
**Required** File path for architecture.

### `aws_access_key_id`
**Required** AWS Access key ID with permission to write to architecture s3 bucket.

### `aws_secret_access_key`
**Required** AWS Secret access key associated with above access key.

## Outputs
### `result`
The result of the upload to Structurizr.

## Example usage
```yaml
- name: Checkout
  uses: actions/checkout@v2
  with:
    path: source_repo # Ensure that you checkout the original source with architecture.yml into this path
- name: Architecture Upload
  id: architecture-upload
  uses: TravelNest/architecture-upload-github-action@master
  with:
    architecture_file: architecture.yml
    aws_access_key_id: <Your Access Key>
    aws_secret_access_key: <Your Secret Key>
- name: Get the output
  run: echo ${{ steps.architecture-upload.outputs.result }}
```