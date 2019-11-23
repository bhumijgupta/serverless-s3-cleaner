# Serverless S3 Cleaner

A basic AWS Lambda function to clean items from S3 bucket that are more than 7 days old.

## Trigger

The function can be triggered by

- CloudWatch Events  
   CloudWatch triggers the function after every 7 days
- API Gateway  
  The function can be triggered manually using an API gateway

## Running function locally

1. Install serverless and serverless-offline  
   `npm i serverless serverless-offline -g`
2. Configure serverless  
   [Configuring serverless with AWS](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
3. Run serverless offline  
   `sls offline start`

## Deploying function to AWS Lambda

`sls deploy -v`

<hr>
Made with :love:
