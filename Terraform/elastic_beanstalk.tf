resource "aws_elastic_beanstalk_application" "application" {
    name = "skillnet"  
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "skillnet-environment"
  cname_prefix        = "najia096skillnet"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2023 v6.1.4 running Node.js 20"
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }
}