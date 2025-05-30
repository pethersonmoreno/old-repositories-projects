provider "google" {
  version     = "3.29.0"
  credentials = file(var.google-credentials-file-path)
  project     = var.google-project-name
  region      = "us-east1"
  zone        = "us-east1-c"
}

provider "google" {
  alias       = "us-central1"
  version     = "3.29.0"
  credentials = file(var.google-credentials-file-path)
  project     = var.google-project-name
  region      = "us-central1"
  zone        = "us-central1-b"
}
provider "random" {
  version = "2.3"
}

resource "google_compute_instance" "dev" {
  name         = "terraform-google-dev0"
  machine_type = "f1-micro" # 1 CPU and 614 MB memory
  # zone         = "us-east1-c"

  tags = ["terraform", "dev0"]

  boot_disk {
    initialize_params {
      image = var.google-images["us-east1"]
    }
  }

  metadata = {
    ssh-keys = "ubuntu:${file(var.keypub-instance-file-path)}"
  }

  network_interface {
    # network = "default"
    network = google_compute_network.default.name
    access_config {
     // Include this section to give the VM an external ip address
    }
  }
}

/*
resource "google_compute_instance" "dev4" {
  name         = "terraform-google-dev4"
  machine_type = "f1-micro" # 1 CPU and 614 MB memory
  # zone         = "us-east1-c"

  tags = ["terraform", "dev4"]

  boot_disk {
    initialize_params {
      image = var.google-images["us-east1"]
    }
  }

  metadata = {
    ssh-keys = "ubuntu:${file(var.keypub-instance-file-path)}"
  }

  network_interface {
    network = "default"
    # network = google_compute_network.default.name
    access_config {
     // Include this section to give the VM an external ip address
    }
  }

  depends_on = [google_storage_bucket.dev4]
}
*/


resource "google_compute_instance" "dev5" {
  name         = "terraform-google-dev5"
  machine_type = "f1-micro" # 1 CPU and 614 MB memory
  # zone         = "us-east1-c"

  tags = ["terraform", "dev5"]

  boot_disk {
    initialize_params {
      image = var.google-images["us-east1"]
    }
  }

  metadata = {
    ssh-keys = "ubuntu:${file(var.keypub-instance-file-path)}"
  }

  network_interface {
    network = "default"
    # network = google_compute_network.default.name
    access_config {
     // Include this section to give the VM an external ip address
    }
  }
}

resource "google_compute_instance" "dev6" {
  provider = google.us-central1
  name         = "terraform-google-dev6"
  machine_type = "f1-micro" # 1 CPU and 614 MB memory

  tags = ["terraform", "dev6"]

  boot_disk {
    initialize_params {
      image = var.google-images["us-central1"]
    }
  }

  metadata = {
    ssh-keys = "ubuntu:${file(var.keypub-instance-file-path)}"
  }

  network_interface {
    # network = "default"
    network = google_compute_network.default-us-central1.name
    access_config {
     // Include this section to give the VM an external ip address
    }
  }
  depends_on = [google_sql_database.mysql-homologacao]
}


resource "google_compute_instance" "dev7" {
  provider = google.us-central1
  name         = "terraform-google-dev7"
  machine_type = "f1-micro" # 1 CPU and 614 MB memory

  tags = ["terraform", "dev7"]

  boot_disk {
    initialize_params {
      image = var.google-images["us-central1"]
    }
  }

  metadata = {
    ssh-keys = "ubuntu:${file(var.keypub-instance-file-path)}"
  }

  network_interface {
    # network = "default"
    network = google_compute_network.default-us-central1.name
    access_config {
     // Include this section to give the VM an external ip address
    }
  }
}

/*
resource "google_storage_bucket" "dev4" {
  name          = "pethersonmorenotesting-dev4"
  location      = "US-EAST1"
  storage_class = "STANDARD"
  force_destroy = true # used to destroy bucket with its objects on terraform destroy
  # bucket_policy_only       = false
  # default_event_based_hold = false
}
*/

resource "google_storage_bucket" "homologacao" {
  name          = "pethersonmorenotesting-homologacao"
  location      = "US-EAST1"
  storage_class = "STANDARD"
  force_destroy = true # used to destroy bucket with its objects on terraform destroy
  # bucket_policy_only       = false
  # default_event_based_hold = false
}

resource "google_sql_database" "mysql-homologacao" {
  provider = google.us-central1
  name     = "mysql-homologacao"
  instance = google_sql_database_instance.instance-mysql-homologacao.name
  depends_on = [google_sql_database_instance.instance-mysql-homologacao]
}

resource "google_sql_database_instance" "instance-mysql-homologacao" {
  provider = google.us-central1
  name   = "instance-mysql-homologacao-${random_uuid.db-mysql.result}"
  database_version  = "MYSQL_5_7"
  settings {
    tier = "db-f1-micro"
    ip_configuration {
      ipv4_enabled    = true
      private_network = google_compute_network.default-us-central1.id
      dynamic "authorized_networks" {
        for_each = var.ips_acesso_remoto
        iterator = item

        content {
          name  = "public access"
          value = item.value
        }
      }
      # dynamic "authorized_networks" {
      #   for_each = [google_compute_instance.dev6]
      #   iterator = apps

      #   content {
      #     name  = apps.value.name
      #     value = apps.value.network_interface.0.access_config.0.nat_ip
      #   }
      # }
    }
  }

  depends_on = [google_service_networking_connection.default-us-central1-private_vpc_connection]
}
resource "google_sql_user" "users" {
  name     = "homologacao"
  instance = google_sql_database_instance.instance-mysql-homologacao.name
  host     = "%"
  password = "homologacao"
}

resource "google_compute_global_address" "default-us-central1-private_ip_address" {
  provider = google.us-central1

  name          = "default-us-central1-private-ip-address"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.default-us-central1.id
}

resource "google_service_networking_connection" "default-us-central1-private_vpc_connection" {
  provider = google.us-central1

  network                 = google_compute_network.default-us-central1.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.default-us-central1-private_ip_address.name]
}