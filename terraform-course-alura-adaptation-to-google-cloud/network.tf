resource "google_compute_firewall" "default" {
  name    = "test-firewall"
  network = google_compute_network.default.name
  # network = "default"

  direction = "INGRESS"

  source_ranges = var.cdirs_acesso_remoto
  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
}

resource "google_compute_network" "default" {
  name  = "default-terraform-pet"
  project = "terraform-pet"
  routing_mode  = "REGIONAL"
  description = "Default network for the project terraform-pet"
  timeouts {}
}

resource "google_compute_firewall" "default-us-central1" {
  provider = google.us-central1
  name    = "test-firewall-us-central1"
  network = google_compute_network.default-us-central1.name
  # network = "default"

  direction = "INGRESS"

  source_ranges = var.cdirs_acesso_remoto
  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
}
# resource "google_compute_firewall" "mysql-us-central1" {
#   provider = google.us-central1
#   name    = "mysql-public-access"
#   network = google_compute_network.default-us-central1.name
#   # network = "default"

#   direction = "INGRESS"

#   source_ranges = var.cdirs_acesso_remoto
#   allow {
#     protocol = "tcp"
#     ports    = ["3306"]
#   }
# }

resource "google_compute_network" "default-us-central1" {
  provider = google.us-central1
  name  = "default-terraform-pet-us-central1"
  project = "terraform-pet"
  routing_mode  = "REGIONAL"
  description = "Default network for the project terraform-pet"
  timeouts {}
}