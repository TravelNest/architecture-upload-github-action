terraform {
    backend "s3" {
        bucket = "travelnest-terraform"
        key    = "state_prod/diagram_deploy_production"
        region = "eu-west-1"
        dynamodb_table = "terraform_prod"
    }
}

provider "aws" {
    region = "eu-west-1"
}

resource "aws_s3_bucket" "bucket" {
    bucket = "travelnest-architecture-production"
    acl    = "private"
}