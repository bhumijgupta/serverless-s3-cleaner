# Serverless S3 Cleaner

A basic AWS Lambda function to clean items from S3 bucket that are more than 7 days old.

## Trigger

The function can be triggered by

- CloudWatch Events  
   CloudWatch triggers the function after every 7 days
- API Gateway
  The function can be triggered manually using an API gateway
