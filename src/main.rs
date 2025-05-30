use std::{fs::File, io::Read, io::Error, path::Path};
use sha2::{Sha256, Digest};
use walkdir::WalkDir;
use dict::{ Dict, DictIface };

fn hash_file(file_path: &Path) ->
    Result<String, Error> {

    let mut file = File::open(file_path)?;

    let mut sha256_hasher = Sha256::new();

    const BUF_SIZE_BYTES: usize = 64 * 1024;
    let mut byte_buffer = vec![0; BUF_SIZE_BYTES];
    loop {
        let n = file.read(&mut byte_buffer)?;
        let valid_buf_slice = &byte_buffer[..n];
        sha256_hasher.input(valid_buf_slice);
        if n == 0 {
            break;
        }
    }

    Ok(format!("{:x}", sha256_hasher.result()))
}
fn list_duplicate_files() {
    let mut dict = Dict::<Vec<String>>::new();
    
    for entry in WalkDir::new(".").into_iter().filter_map(|e| e.ok()) {
        if entry.metadata().unwrap().is_file() {
            let path_file = entry.path().display().to_string();
            let digest = hash_file(entry.path()).unwrap();
            if dict.contains_key(digest.as_str()) {
                let mut old_vector: Vec<String> = dict.get(digest.as_str()).unwrap().to_vec();
                println!("F: {} - Q: {}", path_file, old_vector.len()+1);
                old_vector.push(path_file);
                dict.remove_key(digest.as_str());
                dict.add(digest, old_vector);
            } else {
                let mut new_vector: Vec<String> = Vec::<String>::new();
                println!("F: {} - Q: {}", path_file, 1);
                new_vector.push(path_file);
                dict.add(digest, new_vector);
            }
            
        }
    }
    for entry in dict.iter() {
        let digest = &entry.key;
        if entry.val.len() > 1 {
            println!("");
            println!("digest: {}", digest);
            for item in entry.val.iter() {
                println!(" - {}", item);
            }
            println!("");
        }
    }
}


fn main() -> Result<(), Error> {
  list_duplicate_files();

  Ok(())
}