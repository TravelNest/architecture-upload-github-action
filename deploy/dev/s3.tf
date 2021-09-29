terraform {
    backend "s3" {
        bucket = "travelnest-terraform"
        key    = "state_prod/diagram_deploy_development"
        region = "eu-west-1"
        dynamodb_table = "terraform_dev"
    }
}

provider "aws" {
    region = "eu-west-1"
}

resource "aws_s3_bucket" "bucket" {
    bucket = "travelnest-architecture-development"
    acl    = "private"
}