# terraform-course-alura-adaptation-to-google-cloud

To run all commands, enable in console google cloud in project used:
- Cloud Compute
- Cloud SQL Admin API
- API Service Networking
- Cloud Resource Manager API

Define env config to see log on exec of terraform:
`export TF_LOG=TRACE`

In IAM user used by Terraform, need `Administrador da rede de serviços` access to use `google_service_networking_connection` and `google_compute_global_address`.
