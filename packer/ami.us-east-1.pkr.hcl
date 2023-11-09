variable "aws_profile" {
  type    = string
  default = "dev"
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami_owner" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9"
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

locals {
  timestamp = regex_replace(timestamp(), "[- TZ:]", "")
}

packer {

  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = "~> 1"
    }
  }
}

source "amazon-ebs" "debian-ami" {
  profile       = var.aws_profile
  ami_name      = "webapp-ami-${local.timestamp}"
  instance_type = var.instance_type
  region        = var.region
  source_ami    = var.source_ami_owner
  ssh_username  = var.ssh_username
  ami_users     = ["185549876317", "657518575690"]

}
build {
  sources = ["source.amazon-ebs.debian-ami"]
  provisioner "file" {
    source      = "../webapp.zip"
    destination = "~/webapp"
    direction   = "upload"
  }
  provisioner "file" {
    source      = "../cloudwatch-config.json"
    destination = "/tmp/cloudwatch-config.json"
    direction   = "upload"
  }

  provisioner "shell" {
    inline = [

      "sudo apt update -y",
      "curl -O https://amazoncloudwatch-agent.s3.amazonaws.com/debian/amd64/latest/amazon-cloudwatch-agent.deb",
      "sudo dpkg -i -E amazon-cloudwatch-agent.deb",
      "sudo apt upgrade -y",
      "sudo apt-get install -y nodejs npm",
      "sudo apt-get install -y unzip",
      "sudo apt-get clean",
      "sudo apt remove git -y",
      "sudo groupadd csye6225",
      "sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225",
      "sudo mkdir /opt/csye6225/webapp",
      "sudo unzip webapp -d /opt/csye6225/webapp/",
      "cd /opt/csye6225/webapp",
      "sudo npm install",
      "echo 'Dependencies installed'",
      "sudo chown -R csye6225:csye6225 .",
      "sudo chmod -R 755 .",
      "sudo mv /opt/csye6225/webapp/unit.service /etc/systemd/system/",


      "sudo apt-get clean",

      # Install the Unified CloudWatch Agent

      "sudo mkdir -p /opt/aws/amazon-cloudwatch-agent/etc/",
      "sudo mv /opt/csye6225/webapp/cloudwatch-config.json /opt/aws/amazon-cloudwatch-agent/etc/cloudwatch-config.json",







    ]
  }

}

