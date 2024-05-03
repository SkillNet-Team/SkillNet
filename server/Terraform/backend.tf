terraform {
  backend "s3" {
    bucket = "terraform-state-skillnet-najia096" 
    key    = "core/terraform.tfstate"
    region = "us-east-1"
  }
}