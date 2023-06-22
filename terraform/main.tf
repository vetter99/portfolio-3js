terraform {
 
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "vetter"
    workspaces {
      name = "portfolio-3js"
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.36"
    }
  }
}

provider "aws" {
#   profile = "your-named-profile"
  region  = "us-west-2"
}


resource "aws_s3_bucket" "hey" {
  bucket = "zzz"
}
