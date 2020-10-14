resource "aws_iam_policy" "policy-newschool-terraform" {
  description = "Utilizado pela New School para fazer uso do Terraform"
  name        = "policy-newschool-terraform"
  path        = "/"
  policy      = data.aws_iam_policy_document.doc-policy-newschool-terraform.json
}

data "aws_iam_policy_document" "doc-policy-newschool-terraform" {
  # autoscaling
  statement {
    sid = "VisualEditor0"

    actions = ["autoscaling:*"]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  # cloudformation
  statement {
    sid = "VisualEditor1"

    actions = ["cloudformation:*"]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  # codepipeline
  statement {
    sid = "VisualEditor2"

    actions = ["codepipeline:*"]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  # EC2
  statement {
    sid = "VisualEditor3"

    actions = ["ec2:*"]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  # Elastic Beanstalk
  statement {
    sid = "VisualEditor4"

    actions = ["elasticbeanstalk:*"]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  # S3
  statement {
    sid = "VisualEditor5"

    actions = ["s3:*"]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  # IAM
  statement {
    sid = "VisualEditor6"

    actions = [
      "iam:GetRole",
      "iam:PassRole",
      "iam:GetInstanceProfile",
    ]

    resources = [
      "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/aws-elasticbeanstalk-service-role",
      "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/aws-elasticbeanstalk-ec2-role",
      "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/service-role/service-role-codepipeline-newschool-us-east-2",
      "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/service-role/service-role-codebuild-newschool-us-east-2",
      "arn:aws:iam::${data.aws_caller_identity.current.account_id}:instance-profile/aws-elasticbeanstalk-ec2-role"
    ]
  }

  # codebuild
  statement {
    sid = "VisualEditor7"

    actions = ["codebuild:*"]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }
}