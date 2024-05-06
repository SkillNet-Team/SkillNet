# Compress your Node.js application files into a zip file
zip -r "flaskbb_deploy-$1.zip" ./client ./server ./.ebextensions server.js package.json package-lock.json

# Upload the zip file to an S3 bucket
aws s3 cp "flaskbb_deploy-$1.zip" s3://najia096-skillnet

# Create a new application version in Elastic Beanstalk
aws elasticbeanstalk create-application-version --application-name flaskbb --source-bundle S3Bucket="najia096-skillnet",S3Key="flaskbb_deploy-$1.zip" --version-label "ver-$1" --description "commit-sha-$1" --region "us-east-1"

# Update the Elastic Beanstalk environment with the new application version
aws elasticbeanstalk update-environment --environment-name flaskbb-environment --version-label "ver-$1" --region "us-east-1"
