resource "aws_iam_role" "service-role-codepipeline-newschool-us-east-2" {
  name                  = "service-role-codepipeline-newschool-us-east-2"

  force_detach_policies = false
  max_session_duration  = 3600
  path                  = "/service-role/"
  assume_role_policy = data.aws_iam_policy_document.policy-doc-service-role-codepipeline-newschool-us-east-2.json
}
data "aws_iam_policy_document" "policy-doc-service-role-codepipeline-newschool-us-east-2" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["codepipeline.amazonaws.com"]
    }
  }
}
resource "aws_iam_role_policy_attachment" "attachment-service-role-codepipeline-newschool-us-east-2" {
  role       = aws_iam_role.service-role-codepipeline-newschool-us-east-2.name
  policy_arn = aws_iam_policy.policy-codepipeline-newschool-us-east-2.arn
}
resource "aws_iam_policy" "policy-codepipeline-newschool-us-east-2" {
  name        = "policy-codepipeline-newschool-us-east-2"
  path        = "/service-role/"
  policy      = data.aws_iam_policy_document.policy-doc-codepipeline-newschool-us-east-2.json
}

data "aws_iam_policy_document" "policy-doc-codepipeline-newschool-us-east-2" {

  statement {
    sid = "PassRole"

    actions = ["iam:PassRole"]

    resources = ["*"]

    condition {
      test = "StringEqualsIfExists"
      variable = "iam:PassedToService"
      values = [
        "cloudformation.amazonaws.com",
        "elasticbeanstalk.amazonaws.com",
        "ec2.amazonaws.com",
        "ecs-tasks.amazonaws.com"
      ]
    }

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "codecommit"
    
    actions = [
      "codecommit:CancelUploadArchive",
      "codecommit:GetBranch",
      "codecommit:GetCommit",
      "codecommit:GetUploadArchiveStatus",
      "codecommit:UploadArchive"
    ]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "codedeploy"
    
    actions = [
      "codedeploy:CreateDeployment",
      "codedeploy:GetApplication",
      "codedeploy:GetApplicationRevision",
      "codedeploy:GetDeployment",
      "codedeploy:GetDeploymentConfig",
      "codedeploy:RegisterApplicationRevision"
    ]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "codestarConnectionsUseConnection"
    
    actions = ["codestar-connections:UseConnection"]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "others"
    
    actions = [
      "elasticbeanstalk:*",
      "ec2:*",
      "elasticloadbalancing:*",
      "autoscaling:*",
      "cloudwatch:*",
      "s3:*",
      "sns:*",
      "cloudformation:*",
      "rds:*",
      "sqs:*",
      "ecs:*"
    ]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "invokeAndListLambdaFunctions"

    actions = [
      "lambda:InvokeFunction",
      "lambda:ListFunctions"
    ]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "opsworks"

    actions = [
      "opsworks:CreateDeployment",
      "opsworks:DescribeApps",
      "opsworks:DescribeCommands",
      "opsworks:DescribeDeployments",
      "opsworks:DescribeInstances",
      "opsworks:DescribeStacks",
      "opsworks:UpdateApp",
      "opsworks:UpdateStack"
    ]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "cloudformation"

    actions = [
      "cloudformation:CreateStack",
      "cloudformation:DeleteStack",
      "cloudformation:DescribeStacks",
      "cloudformation:UpdateStack",
      "cloudformation:CreateChangeSet",
      "cloudformation:DeleteChangeSet",
      "cloudformation:DescribeChangeSet",
      "cloudformation:ExecuteChangeSet",
      "cloudformation:SetStackPolicy",
      "cloudformation:ValidateTemplate"
    ]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "codebuild"

    actions = [
      "codebuild:BatchGetBuilds",
      "codebuild:StartBuild",
      "codebuild:BatchGetBuildBatches",
      "codebuild:StartBuildBatch"
    ]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "devicefarm"

    actions = [
      "devicefarm:ListProjects",
      "devicefarm:ListDevicePools",
      "devicefarm:GetRun",
      "devicefarm:GetUpload",
      "devicefarm:CreateUpload",
      "devicefarm:ScheduleRun"
    ]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "servicecatalog"

    actions = [
      "servicecatalog:ListProvisioningArtifacts",
      "servicecatalog:CreateProvisioningArtifact",
      "servicecatalog:DescribeProvisioningArtifact",
      "servicecatalog:DeleteProvisioningArtifact",
      "servicecatalog:UpdateProduct"
    ]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "ecrDescribeImages"

    actions = [
      "ecr:DescribeImages"
    ]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "states"

    actions = [
      "states:DescribeExecution",
      "states:DescribeStateMachine",
      "states:StartExecution"
    ]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "appconfig"

    actions = [
      "appconfig:StartDeployment",
      "appconfig:StopDeployment",
      "appconfig:GetDeployment"
    ]

    resources = ["*"]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }
}