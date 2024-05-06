zip -r "skillnet-deploy-${{github.sha}}.zip"

aws s3 cp "skillnet_deploy-$1.zip" s3://najia096-skillnet

aws elasticbeanstalk create-application-version --application-name skillnet --source-bundle S3Bucket="najia096-skillnet",S3Key="skillnet_deploy-$1.zip" --version-label "ver-$1" --description "file permissions" --region "us-east-1"

aws elasticbeanstalk update-environment --environment-name skillnet-environment --version-label "ver-$1" --region "us-east-1"