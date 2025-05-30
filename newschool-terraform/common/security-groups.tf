resource "aws_security_group" "secgroup-newschool-http" {
  name = "secgroup-newschool-http"
  description = "SecurityGroup for New School ElasticBeanstalk environments."
  tags = {
    "Name" = "secgroup-newschool-http"
  }

  ingress {
    description      = "HTTP"
    from_port        = 80
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    protocol         = "tcp"
    security_groups  = []
    self             = false
    to_port          = 80
    cidr_blocks = [ "0.0.0.0/0" ]
  }
  egress {
    description      = "Output all open"
    from_port        = 0
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    protocol         = "-1"
    security_groups  = []
    self             = false
    to_port          = 0
    cidr_blocks      = [ "0.0.0.0/0" ]
  }
}