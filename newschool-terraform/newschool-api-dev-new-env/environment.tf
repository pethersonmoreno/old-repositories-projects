resource "aws_elastic_beanstalk_application" "app-newschool-api-dev-new-env" {
  name   = "newschool-api-dev-new-env"
  description = "New School Backend - branch develop-new-env"
}

resource "aws_elastic_beanstalk_environment" "env-newschool-api-dev-new-env" {
  name                = "env-newschool-api-dev-new-env"
  application         = aws_elastic_beanstalk_application.app-newschool-api-dev-new-env.name
  tier                  = "WebServer"
  solution_stack_name   = "64bit Amazon Linux 2018.03 v4.15.2 running Node.js"
  wait_for_ready_timeout= "20m"
  # version_label         = "" # can be used to define a version to environment
  tags                  = {}
  
  #################################################
  ###############  OTHER OPTIONS  #################
  #################################################
  # healthcheck
  setting {
    name      = "Application Healthcheck URL"
    namespace = "aws:elasticbeanstalk:application"
    value     = ""
  }
  # setting { # only supported on legacy environments
  #   name      = "Automatically Terminate Unhealthy Instances"
  #   namespace = "aws:elasticbeanstalk:monitoring"
  #   value     = "true"
  # }

  # restrict ssh source access to environment
  # setting {
  #   name      = "SSHSourceRestriction"
  #   namespace = "aws:autoscaling:launchconfiguration"
  #   value     = "tcp,22,22,0.0.0.0/0"
  # }


  #################################################
  ########## SOFTWARE WITHOUT APP ENV  ############
  #################################################

  # container nodejs options
  setting {
    name      = "ProxyServer"
    namespace = "aws:elasticbeanstalk:container:nodejs"
    value     = "nginx"
  }
  setting {
    name      = "NodeVersion"
    namespace = "aws:elasticbeanstalk:container:nodejs"
    value     = "12.18.3"
  }
  setting {
    name      = "GzipCompression"
    namespace = "aws:elasticbeanstalk:container:nodejs"
    value     = "false"
  }
  setting {
    name      = "NodeCommand"
    namespace = "aws:elasticbeanstalk:container:nodejs"
    value     = "npm start"
  }

  # AWS X-Ray
  # setting {
  #   name      = "XRayEnabled"
  #   namespace = "aws:elasticbeanstalk:xray"
  #   value     = "false"
  # }

  # S3 record storage
  # setting {
  #   name      = "LogPublicationControl"
  #   namespace = "aws:elasticbeanstalk:hostmanager"
  #   value     = "false"
  # }

  # streaming - instance logs - CloudWatch Logs
  setting {
    name      = "StreamLogs"
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    value     = "false"
  }
  # setting {
  #   name      = "RetentionInDays"
  #   namespace = "aws:elasticbeanstalk:cloudwatch:logs"
  #   value     = "7"
  # }
  # setting {
  #   name      = "DeleteOnTerminate"
  #   namespace = "aws:elasticbeanstalk:cloudwatch:logs"
  #   value     = "false"
  # }


  #################################################
  ################  INSTANCES  ####################
  #################################################

  # Monitoring Amazon CloudWatch
  setting {
    name      = "MonitoringInterval"
    namespace = "aws:autoscaling:launchconfiguration"
    value     = "5 minute"
  }

  # Root Volume (boot device)
  # setting {
  #   name      = "RootVolumeType"
  #   namespace = "aws:autoscaling:launchconfiguration"
  #   value     = ""
  # }
  # setting {
  #   name      = "RootVolumeSize"
  #   namespace = "aws:autoscaling:launchconfiguration"
  #   value     = ""
  # }
  # setting {
  #   name      = "RootVolumeIOPS"
  #   namespace = "aws:autoscaling:launchconfiguration"
  #   value     = ""
  # }

  # EC2 Security Groups
  setting {
    name      = "SecurityGroups"
    namespace = "aws:autoscaling:launchconfiguration"
    value     = join(",", ["secgroup-newschool-http"])
  }

  #################################################
  #################  CAPACITY  ####################
  #################################################

  # Auto Scaling Group
  setting {
    name      = "EnvironmentType"
    namespace = "aws:elasticbeanstalk:environment"
    value     = "SingleInstance"
  }
  # setting {
  #   name      = "MinSize"
  #   namespace = "aws:autoscaling:asg"
  #   value     = "1"
  # }
  # setting {
  #   name      = "MaxSize"
  #   namespace = "aws:autoscaling:asg"
  #   value     = "1"
  # }
  setting {
    name      = "EnableSpot"
    namespace = "aws:ec2:instances"
    value     = "false"
  }
  # setting {
  #   name      = "SpotMaxPrice"
  #   namespace = "aws:ec2:instances"
  #   value     = ""
  # }
  # setting {
  #   name      = "SpotFleetOnDemandBase"
  #   namespace = "aws:ec2:instances"
  #   value     = "0"
  # }
  # setting {
  #   name      = "SpotFleetOnDemandAboveBasePercentage"
  #   namespace = "aws:ec2:instances"
  #   value     = "0"
  # }
  # setting {
  #   name      = "InstanceType" # InstanceType option is obsolete, replaced by InstanceTypes option in the aws:ec2:instances namespace
  #   namespace = "aws:autoscaling:launchconfiguration"
  #   value     = "t2.micro"
  # }
  setting {
    name      = "InstanceTypes"
    namespace = "aws:ec2:instances"
    value     = "t2.micro, t2.small"
  }
  setting {
    name      = "ImageId"
    namespace = "aws:autoscaling:launchconfiguration"
    value     = "ami-0920920148d73505b"
  }
  # setting {
  #   name      = "Availability Zones"
  #   namespace = "aws:autoscaling:asg"
  #   value     = "Any"
  # }
  # setting {
  #   name      = "Custom Availability Zones"
  #   namespace = "aws:autoscaling:asg"
  #   value     = ""
  # }
  # setting {
  #   name      = "Cooldown"
  #   namespace = "aws:autoscaling:asg"
  #   value     = "360"
  # }

  # Time-based scalability
  # - can configure schedule actions with namespace "aws:autoscaling:scheduledaction"

  #################################################
  ###############  LOAD BALANCER  #################
  #################################################

  # - no option enabled to load balancer

  #################################################
  #####  CONTINUOUS UPDATES AND DEPLOYMENTS  ######
  #################################################

  # Application deployments
  setting {
    name      = "DeploymentPolicy"
    namespace = "aws:elasticbeanstalk:command"
    value     = "AllAtOnce"
  }
  # Configuration updates
  setting {
    name      = "RollingUpdateEnabled"
    namespace = "aws:autoscaling:updatepolicy:rollingupdate"
    value     = "false"
  }
  # setting {
  #   name      = "RollingUpdateType"
  #   namespace = "aws:autoscaling:updatepolicy:rollingupdate"
  #   value     = "Time"
  # }
  # setting {
  #   name      = "MaxBatchSize"
  #   namespace = "aws:autoscaling:updatepolicy:rollingupdate"
  #   value     = ""
  # }
  # setting {
  #   name      = "MinInstancesInService"
  #   namespace = "aws:autoscaling:updatepolicy:rollingupdate"
  #   value     = ""
  # }
  # setting {
  #   name      = "PauseTime"
  #   namespace = "aws:autoscaling:updatepolicy:rollingupdate"
  #   value     = ""
  # }
  # setting {
  #   name      = "Timeout"
  #   namespace = "aws:autoscaling:updatepolicy:rollingupdate"
  #   value     = "PT30M"
  # }

  # Deployment preferences
  setting {
    name      = "IgnoreHealthCheck"
    namespace = "aws:elasticbeanstalk:command"
    value     = "false"
  }

  setting {
    name      = "HealthCheckSuccessThreshold"
    namespace = "aws:elasticbeanstalk:healthreporting:system"
    value     = "Ok"
  }
  setting {
    name      = "Timeout"
    namespace = "aws:elasticbeanstalk:command"
    value     = "600"
  }

  # other deployment options
  # setting {
  #   name      = "BatchSizeType"
  #   namespace = "aws:elasticbeanstalk:command"
  #   value     = "Percentage"
  # }
  # setting {
  #   name      = "BatchSize"
  #   namespace = "aws:elasticbeanstalk:command"
  #   value     = "100"
  # }

  #################################################
  ##################  SECURITY  ###################
  #################################################

  # Service Function
  setting {
    name      = "ServiceRole"
    namespace = "aws:elasticbeanstalk:environment"
    value     = "arn:aws:iam::407910189591:role/aws-elasticbeanstalk-service-role"
  }

  # Virtual machine permissions
  # setting {
  #   name      = "EC2KeyName"
  #   namespace = "aws:autoscaling:launchconfiguration"
  #   value     = ""
  # }
  setting {
    name      = "IamInstanceProfile"
    namespace = "aws:autoscaling:launchconfiguration"
    value     = "aws-elasticbeanstalk-ec2-role"
  }

  #################################################
  #################  MONITORING  ##################
  #################################################
  
  # Health reports
  setting {
    name      = "SystemType"
    namespace = "aws:elasticbeanstalk:healthreporting:system"
    value     = "enhanced"
  }
  # setting {
  #   name      = "ConfigDocument"
  #   namespace = "aws:elasticbeanstalk:healthreporting:system"
  #   value     = jsonencode(
  #       setting {
  #           CloudWatchMetrics = {
  #               Environment = {
  #                   ApplicationLatencyP10    = null
  #                   ApplicationLatencyP50    = null
  #                   ApplicationLatencyP75    = null
  #                   ApplicationLatencyP85    = null
  #                   ApplicationLatencyP90    = null
  #                   ApplicationLatencyP95    = null
  #                   ApplicationLatencyP99    = null
  #                   ApplicationLatencyP99.9  = null
  #                   ApplicationRequests2xx   = null
  #                   ApplicationRequests3xx   = null
  #                   ApplicationRequests4xx   = null
  #                   ApplicationRequests5xx   = null
  #                   ApplicationRequestsTotal = null
  #                   InstancesDegraded        = null
  #                   InstancesInfo            = null
  #                   InstancesNoData          = null
  #                   InstancesOk              = null
  #                   InstancesPending         = null
  #                   InstancesSevere          = null
  #                   InstancesUnknown         = null
  #                   InstancesWarning         = null
  #               }
  #               Instance    = {
  #                   ApplicationLatencyP10    = null
  #                   ApplicationLatencyP50    = null
  #                   ApplicationLatencyP75    = null
  #                   ApplicationLatencyP85    = null
  #                   ApplicationLatencyP90    = null
  #                   ApplicationLatencyP95    = null
  #                   ApplicationLatencyP99    = null
  #                   ApplicationLatencyP99.9  = null
  #                   ApplicationRequests2xx   = null
  #                   ApplicationRequests3xx   = null
  #                   ApplicationRequests4xx   = null
  #                   ApplicationRequests5xx   = null
  #                   ApplicationRequestsTotal = null
  #                   CPUIdle                  = null
  #                   CPUIowait                = null
  #                   CPUIrq                   = null
  #                   CPUNice                  = null
  #                   CPUSoftirq               = null
  #                   CPUSystem                = null
  #                   CPUUser                  = null
  #                   InstanceHealth           = null
  #                   LoadAverage1min          = null
  #                   LoadAverage5min          = null
  #                   RootFilesystemUtil       = null
  #               }
  #           }
  #           Rules             = {
  #               Environment = {
  #                   Application = {
  #                       ApplicationRequests4xx = {
  #                           Enabled = true
  #                       }
  #                   }
  #                   ELB         = {
  #                       ELBRequests4xx = {
  #                           Enabled = true
  #                       }
  #                   }
  #               }
  #           }
  #           Version           = 1
  #       }
  #   )
  # }

  # other Health reports options
  # setting {
  #   name      = "EnhancedHealthAuthEnabled"
  #   namespace = "aws:elasticbeanstalk:healthreporting:system"
  #   value     = "false"
  # }

  # Streaming health events to CloudWatch Logs
  setting {
    name      = "HealthStreamingEnabled"
    namespace = "aws:elasticbeanstalk:cloudwatch:logs:health"
    value     = "false"
  }
  # setting {
  #   name      = "RetentionInDays"
  #   namespace = "aws:elasticbeanstalk:cloudwatch:logs:health"
  #   value     = "7"
  # }
  # setting {
  #   name      = "DeleteOnTerminate"
  #   namespace = "aws:elasticbeanstalk:cloudwatch:logs:health"
  #   value     = "false"
  # }

  #################################################
  ###############  MANAGED UPDATES  ###############
  #################################################

  # Managed platform updates
  setting {
    name      = "ManagedActionsEnabled"
    namespace = "aws:elasticbeanstalk:managedactions"
    value     = "true"
  }
  setting {
    name      = "PreferredStartTime"
    namespace = "aws:elasticbeanstalk:managedactions"
    value     = "Sat:16:00"
  }
  setting {
    name      = "UpdateLevel"
    namespace = "aws:elasticbeanstalk:managedactions:platformupdate"
    value     = "minor"
  }
  setting {
    name      = "InstanceRefreshEnabled"
    namespace = "aws:elasticbeanstalk:managedactions:platformupdate"
    value     = "false"
  }

  #################################################
  ################  NOTIFICATIONS  ################
  #################################################

  # nothing configured

  # setting {
  #   name      = "Notification Endpoint"
  #   namespace = "aws:elasticbeanstalk:sns:topics"
  #   value     = ""
  # }
  # setting {
  #   name      = "Notification Protocol"
  #   namespace = "aws:elasticbeanstalk:sns:topics"
  #   value     = "email"
  # }
  # setting {
  #   name      = "Notification Topic ARN"
  #   namespace = "aws:elasticbeanstalk:sns:topics"
  #   value     = ""
  # }
  # setting {
  #   name      = "Notification Topic Name"
  #   namespace = "aws:elasticbeanstalk:sns:topics"
  #   value     = ""
  # }

  #################################################
  ###################  NETWORK  ###################
  #################################################

  # nothing configured - no vpc defined
  # setting {
  #   name      = "AssociatePublicIpAddress"
  #   namespace = "aws:ec2:vpc"
  #   value     = ""
  # }
  # setting {
  #   name      = "ELBScheme"
  #   namespace = "aws:ec2:vpc"
  #   value     = "public"
  # }
  # setting {
  #   name      = "ELBSubnets"
  #   namespace = "aws:ec2:vpc"
  #   value     = ""
  # }
  # setting {
  #   name      = "Subnets"
  #   namespace = "aws:ec2:vpc"
  #   value     = ""
  # }
  # setting {
  #   name      = "VPCId"
  #   namespace = "aws:ec2:vpc"
  #   value     = ""
  # }

  #################################################
  ##############  SOFTWARE APP ENV  ###############
  #################################################

  # App environment variables
  setting {
    name      = "CHANGE_PASSWORD_EXPIRATION_TIME"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.CHANGE_PASSWORD_EXPIRATION_TIME
  }
  setting {
    name      = "CHANGE_PASSWORD_URL"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.CHANGE_PASSWORD_URL
  }
  setting {
    name      = "DATABASE_HOST"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.DATABASE_HOST
  }
  setting {
    name      = "DATABASE_NAME"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.DATABASE_NAME
  }
  setting {
    name      = "DATABASE_PASSWORD"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.DATABASE_PASSWORD
  }
  setting {
    name      = "DATABASE_PORT"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.DATABASE_PORT
  }
  setting {
    name      = "DATABASE_USERNAME"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.DATABASE_USERNAME
  }
  setting {
    name      = "EMAIL_CONTACTUS"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.EMAIL_CONTACTUS
  }
  setting {
    name      = "EXPIRES_IN_ACCESS_TOKEN"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.EXPIRES_IN_ACCESS_TOKEN
  }
  setting {
    name      = "EXPIRES_IN_REFRESH_TOKEN"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.EXPIRES_IN_REFRESH_TOKEN
  }
  setting {
    name      = "FRONT_URL"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.FRONT_URL
  }
  setting {
    name      = "JWT_SECRET"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.JWT_SECRET
  }
  setting {
    name      = "NODE_ENV"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.NODE_ENV
  }
  setting {
    name      = "NPM_CONFIG_PRODUCTION"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.NPM_CONFIG_PRODUCTION
  }
  setting {
    name      = "SMTP_HOST"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.SMTP_HOST
  }
  setting {
    name      = "SMTP_PASSWORD"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.SMTP_PASSWORD
  }
  setting {
    name      = "SMTP_PORT"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.SMTP_PORT
  }
  setting {
    name      = "SMTP_USER"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.SMTP_USER
  }
  setting {
    name      = "SYNC_DATABASE"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.SYNC_DATABASE
  }
  setting {
    name      = "PUSHER_APP_ID"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.PUSHER_APP_ID
  }
  setting {
    name      = "PUSHER_KEY"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.PUSHER_KEY
  }
  setting {
    name      = "PUSHER_SECRET"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.PUSHER_SECRET
  }
  setting {
    name      = "PUSHER_CLUSTER"
    namespace = "aws:elasticbeanstalk:application:environment"
    value     = var.PUSHER_CLUSTER
  }
}
variable "CHANGE_PASSWORD_EXPIRATION_TIME" {
  type = string
  description = "CHANGE_PASSWORD_EXPIRATION_TIME"
}
variable "CHANGE_PASSWORD_URL" {
  type = string
  description = "CHANGE_PASSWORD_URL"
}
variable "DATABASE_HOST" {
  type = string
  description = "DATABASE_HOST"
}
variable "DATABASE_NAME" {
  type = string
  description = "DATABASE_NAME"
}
variable "DATABASE_PASSWORD" {
  type = string
  description = "DATABASE_PASSWORD"
}
variable "DATABASE_PORT" {
  type = string
  description = "DATABASE_PORT"
}
variable "DATABASE_USERNAME" {
  type = string
  description = "DATABASE_USERNAME"
}
variable "EMAIL_CONTACTUS" {
  type = string
  description = "EMAIL_CONTACTUS"
}
variable "EXPIRES_IN_ACCESS_TOKEN" {
  type = string
  description = "EXPIRES_IN_ACCESS_TOKEN"
}
variable "EXPIRES_IN_REFRESH_TOKEN" {
  type = string
  description = "EXPIRES_IN_REFRESH_TOKEN"
}
variable "FRONT_URL" {
  type = string
  description = "FRONT_URL"
}
variable "JWT_SECRET" {
  type = string
  description = "JWT_SECRET"
}
variable "NODE_ENV" {
  type = string
  description = "NODE_ENV"
}
variable "NPM_CONFIG_PRODUCTION" {
  type = string
  description = "NPM_CONFIG_PRODUCTION"
}
variable "SMTP_HOST" {
  type = string
  description = "SMTP_HOST"
}
variable "SMTP_PASSWORD" {
  type = string
  description = "SMTP_PASSWORD"
}
variable "SMTP_PORT" {
  type = string
  description = "SMTP_PORT"
}
variable "SMTP_USER" {
  type = string
  description = "SMTP_USER"
}
variable "SYNC_DATABASE" {
  type = string
  description = "SYNC_DATABASE"
}
variable "PUSHER_APP_ID" {
  type = string
}
variable "PUSHER_KEY" {
  type = string
}
variable "PUSHER_SECRET" {
  type = string
}
variable "PUSHER_CLUSTER" {
  type = string
}