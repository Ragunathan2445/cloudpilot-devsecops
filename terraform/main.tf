# 1. Configure Terraform and AWS provider

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

# 2. Connect Terraform to AWS Mumbai

provider "aws" {
  region = "ap-south-1"
}

# 3. Create a VPC

resource "aws_vpc" "devops_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name        = "devops-vpc"
    Environment = "learning"
    Project     = "AWS-DevSecOps"
  }
}

# 4. Create a subnet

resource "aws_subnet" "devops_subnet" {
  vpc_id                  = aws_vpc.devops_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = false

  tags = {
    Name = "devops-subnet"
  }
}

# 5. Create an Internet Gateway

resource "aws_internet_gateway" "devops_igw" {
  vpc_id = aws_vpc.devops_vpc.id

  tags = {
    Name = "devops-internet-gateway"
  }
}

# 6. Create a route table

resource "aws_route_table" "devops_route_table" {
  vpc_id = aws_vpc.devops_vpc.id

  tags = {
    Name = "devops-route-table"
  }
}

# 7. Add a route to the Internet Gateway

resource "aws_route" "internet_route" {
  route_table_id         = aws_route_table.devops_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.devops_igw.id
}

# 8. Associate the route table with the subnet

resource "aws_route_table_association" "devops_association" {
  subnet_id      = aws_subnet.devops_subnet.id
  route_table_id = aws_route_table.devops_route_table.id
}

# 9. Create a security group

resource "aws_security_group" "devops_security_group" {
  name        = "devops-security-group"
  description = "Security group for the DevSecOps learning project"
  vpc_id      = aws_vpc.devops_vpc.id

  # Allow outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "devops-security-group"
  }
}

# 10. Display the created VPC ID

output "vpc_id" {
  description = "ID of the DevSecOps VPC"
  value       = aws_vpc.devops_vpc.id
}

# 11. Display the subnet ID

output "subnet_id" {
  description = "ID of the DevSecOps subnet"
  value       = aws_subnet.devops_subnet.id
}