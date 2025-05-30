resource "aws_iam_role" "service-role-codebuild-newschool-us-east-2" {
  name                  = "service-role-codebuild-newschool-us-east-2"

  force_detach_policies = false
  max_session_duration  = 3600
  path                  = "/service-role/"
  assume_role_policy = data.aws_iam_policy_document.policy-doc-service-role-codebuild-newschool-us-east-2.json
}
data "aws_iam_policy_document" "policy-doc-service-role-codebuild-newschool-us-east-2" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["codebuild.amazonaws.com"]
    }
  }
}
resource "aws_iam_role_policy_attachment" "attachment-service-role-codebuild-newschool-us-east-2" {
  role       = aws_iam_role.service-role-codebuild-newschool-us-east-2.name
  policy_arn = aws_iam_policy.policy-codebuild-newschool-us-east-2.arn
}
resource "aws_iam_policy" "policy-codebuild-newschool-us-east-2" {
  name        = "policy-codebuild-newschool-us-east-2"
  path        = "/service-role/"
  policy      = data.aws_iam_policy_document.policy-doc-codebuild-newschool-us-east-2.json
}

data "aws_iam_policy_document" "policy-doc-codebuild-newschool-us-east-2" {

  statement {
    sid = "logs"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    resources = [
      "arn:aws:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/codebuild/*",
    ]
  }

  statement {
    sid = "s3"

    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:GetBucketAcl",
      "s3:GetBucketLocation",
    ]

    resources = [
      "arn:aws:s3:::codepipeline-${var.aws_region}-*",
    ]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }

  statement {
    sid = "codebuildReport"

    actions = [
      "codebuild:CreateReportGroup",
      "codebuild:CreateReport",
      "codebuild:UpdateReport",
      "codebuild:BatchPutTestCases",
      "codebuild:BatchPutCodeCoverages",
    ]

    resources = [
      "arn:aws:codebuild:${var.aws_region}:${data.aws_caller_identity.current.account_id}:report-group/*",
    ]

    condition {
      test = "StringEquals"
      variable = "aws:RequestedRegion"
      values = [var.aws_region]
    }
  }
}