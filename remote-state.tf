terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "pethersonmoreno-alura-terraform-course"

    workspaces {
      name = "google-terraform-pet"
    }
  }
}