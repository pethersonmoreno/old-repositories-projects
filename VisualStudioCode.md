# Use of Visual Studio Code to program in PHP

## Visual Studio Code Config

To apply automatic format when you save the file, change the config editor.formatOnSave in your settings.json:
    "editor.formatOnSave": true
Now when you save the file it will format the file to you.

## Project Config

To use the phpcs and phpcbf in the project install in your composer.json the package "squizlabs/php_codesniffer" with the command:
 - composer require --dev "squizlabs/php_codesniffer"
With that you can validate the quality of you code with phpcs and phpcbf with the extension PHP Sniffer

## Useful extensions

### PHP Sniffer

Reference: https://github.com/wongjn/vscode-php-sniffer

Configure settings.json:
  "phpSniffer.run": "onType",
  "phpSniffer.executablesFolder": "./vendor/bin/",
  
The onType to phpSniffer.run affect you when you are coding, you can see the error on syntax while you are coding without saving the code.

The config phpSniffer.executablesFolder to ./vendor/bin/ means that the extension will use the phpcs and phpcbf of your composer.json, it is better because your project has the phpcs inside the require dev packages.
