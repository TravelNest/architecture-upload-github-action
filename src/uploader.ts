import { S3, Credentials, config, AWSError } from 'aws-sdk';
import { getInput } from '@actions/core';
import { PromiseResult } from 'aws-sdk/lib/request';


export const upload = (body: Buffer, key: string): Promise<PromiseResult<S3.PutObjectOutput, AWSError>> => {
    config.update({
        region: 'eu-west-1',
        credentials: new Credentials({
          accessKeyId: getInput('aws_access_key_id'),
          secretAccessKey: getInput('aws_secret_access_key')
        })
      });
      const s3 = new S3();

      const params = {
        Bucket: 'travelnest-architecture-production',
        Key: key,
        Body: body
      };
      return s3.putObject(params).promise();
};