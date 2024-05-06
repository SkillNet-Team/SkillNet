zip -r "skillnet-deploy-${{github.sha}}.zip" ./SkillNet-A6 

aws s3 cp "skillnet_deploy-${{github.sha}}.zip" s3://najia096-skillnet

aws elasticbeanstalk create-application-version --application-name skillnet --source-bundle S3Bucket="najia096-skillnet",S3Key="skillnet_deploy-${{github.sha}}.zip" --version-label "ver-${{github.sha}}" --description "file permissions" --region "us-east-1"

aws elasticbeanstalk update-environment --environment-name skillnet-environment --version-label "ver-${{github.sha}}" --region "us-east-1"