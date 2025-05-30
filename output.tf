output "ip" {
 value = google_compute_instance.dev.network_interface.0.access_config.0.nat_ip
}

output "ip-dev6" {
 value = google_compute_instance.dev6.network_interface.0.access_config.0.nat_ip
}

output "dev5" {
 value = google_compute_instance.dev5.network_interface.0.access_config.0.nat_ip
}

output "dev6" {
 value = google_compute_instance.dev6.network_interface.0.access_config.0.nat_ip
}

output "dev7" {
 value = google_compute_instance.dev7.network_interface.0.access_config.0.nat_ip
}