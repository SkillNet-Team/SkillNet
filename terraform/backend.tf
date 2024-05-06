terraform {
  backend "s3" {
    bucket = "terraform-state-skillnet-tahbee03"
    key    = "core/terraform.tfstate"
    region = "us-east-2"
  }
}