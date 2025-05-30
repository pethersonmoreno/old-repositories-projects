resource "random_uuid" "db-mysql" { }
# resource "random_id" "timestamp" {
#   keepers = {
#     datetime = formatdate("YYYYMMDDHHMM", timestamp())
#   }

#   byte_length = 12
# }