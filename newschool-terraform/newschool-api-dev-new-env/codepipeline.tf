variable "s3_codepipeline_artifacts" {
  type = string
  description = "S3 Codepipeline Artifact Store"
}
variable "github_oauthtoken" {
  type = string
  description = "OAuthtoken used connect with github"
}
variable "github_owner" {
  type = string
  description = "Github owner to connect"
}
variable "github_repo" {
  type = string
  description = "Github repo in owner to connect"
}
variable "github_branch" {
  type = string
  description = "Branch from Github to use"
}
locals {
  # Service Role to Codepipeline
  iam_service_role_codepipeline = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/service-role/service-role-codepipeline-newschool-${var.aws_region}"
  # Service Role to Codebuild
  iam_service_role_codebuild = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/service-role/service-role-codebuild-newschool-${var.aws_region}"
  # Encryption Key S3 managed by AWS
  encryption_key_s3_managed = "arn:aws:kms:${var.aws_region}:${data.aws_caller_identity.current.account_id}:alias/aws/s3"
  # Codebuild project name
  codebuild_project_name = "nsbackbuild-dev-new-pipeline"
}
resource "aws_codebuild_project" "cb-nsback-dev-new-pipeline" {
  badge_enabled  = false
  build_timeout  = 60
  description    = "New School Backend Dev New Pipeline"
  encryption_key = local.encryption_key_s3_managed
  name           = local.codebuild_project_name
  queued_timeout = 480
  service_role   = local.iam_service_role_codebuild
  tags           = {}

  artifacts {
    type                   = "CODEPIPELINE"
    encryption_disabled    = false
    override_artifact_name = false
    name                   = local.codebuild_project_name
    packaging              = "NONE"
  }

  cache {
    type  = "NO_CACHE"
    modes = []
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/amazonlinux2-x86_64-standard:3.0"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode             = false
    type                        = "LINUX_CONTAINER"
  }

  logs_config {
    cloudwatch_logs {
      status = "DISABLED"
    }

    s3_logs {
      encryption_disabled = false
      location            = "${var.s3_codepipeline_artifacts}/lognsback-dev"
      status              = "ENABLED"
    }
  }

  source {
    type                = "CODEPIPELINE"
    git_clone_depth     = 0
    insecure_ssl        = false
    report_build_status = false
    buildspec           = yamlencode(yamldecode(file("${path.module}/buildspec.yml")))
  }
}

resource "aws_codepipeline" "cp-nsback-dev-new-pipeline" {
  name     = "nsback-dev-new-pipeline"
  role_arn = local.iam_service_role_codepipeline
  tags     = {}

  artifact_store {
    location = var.s3_codepipeline_artifacts
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      category         = "Source"
      configuration    = {
        "OAuthToken"           = var.github_oauthtoken
        "PollForSourceChanges" = "false"
        "Owner"                = var.github_owner
        "Repo"                 = var.github_repo
        "Branch"               = var.github_branch
      }
      input_artifacts  = []
      name             = "Source"
      namespace        = "SourceVariables"
      output_artifacts = [
        "SourceArtifact",
      ]
      owner            = "ThirdParty"
      provider         = "GitHub"
      region           = var.aws_region
      run_order        = 1
      version          = "1"
    }
  }
  stage {
    name = "Build"

    action {
      category         = "Build"
      configuration    = {
        "ProjectName" = aws_codebuild_project.cb-nsback-dev-new-pipeline.name
      }
      input_artifacts  = [
        "SourceArtifact",
      ]
      name             = "Build"
      namespace        = "BuildVariables"
      output_artifacts = [
        "BuildArtifact",
      ]
      owner            = "AWS"
      provider         = "CodeBuild"
      region           = var.aws_region
      run_order        = 1
      version          = "1"
    }
  }
  stage {
    name = "Deploy"

    action {
      category         = "Deploy"
      configuration    = {
        "ApplicationName" = aws_elastic_beanstalk_application.app-newschool-api-dev-new-env.name
        "EnvironmentName" = aws_elastic_beanstalk_environment.env-newschool-api-dev-new-env.name
      }
      input_artifacts  = [
        "BuildArtifact",
      ]
      name             = "Deploy"
      namespace        = "DeployVariables"
      output_artifacts = []
      owner            = "AWS"
      provider         = "ElasticBeanstalk"
      region           = var.aws_region
      run_order        = 1
      version          = "1"
    }
  }
}