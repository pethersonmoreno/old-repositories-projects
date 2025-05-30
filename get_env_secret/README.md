# get-env-secret


## How to Install

To install `get_env_secret` use the command:
```sh
go install github.com/pethersonmoreno/get_env_secret@latest
```

After it you need add GO bin directory to your path, example added in a file `~/.bashrc`:

```sh
export PATH="${HOME}/go/bin:${PATH}"
```

To get environment variables directly to you terminal, you need install the script `env-secret.sh` too. Use this command to install in your home directory:

```sh
curl https://raw.githubusercontent.com/pethersonmoreno/get_env_secret/main/env-secret.sh -o ~/env-secret.sh
```

## How to Configure

Before use the script `env-secret.sh`, you need configure your credentials encrypted.

By default `~/BHS/credentials.jert` is the file path to encrypted data that is used.

To generate this file, you need to create a json file in the path `~/BHS/credentials.json` in the structure of the file `credentials-example.json`, and then execute:

```sh
get_env_secret encrypt
```

It will ask the password used to generate the encrypted file. After it, please delete the file `~/BHS/credentials.json` to your security.

To decrypt the entire file to JSON again, execute:

```sh
get_env_secret decrypt
```

It will ask again the same password used to generate the encrypted file. After view, change or update your credentials info, please remember of delete the file `~/BHS/credentials.json` to your security.

## How to Use

Let's say that you have 2 credentials registered `xpto_dev` and `xpto_prod`. You can use the credentials `xpto_dev` in a terminal with the following command:

```sh
source ~/env-secret.sh xpto_dev
```

If it works, you will get the  answer "Credentials added to environment variables".
