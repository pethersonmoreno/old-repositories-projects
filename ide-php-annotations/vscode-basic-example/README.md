# Example of a project with use of phpcs and phpcbf applied in the project

The file example/Product.php has the namespace commented, it causes a error in PSR1:

    [PSR1.Classes.ClassDeclaration.MissingNamespace]
    Each class must be in a namespace of at least one level (a top-level vendor name)

If you remove the comment the error will not show in problems in Visual Studio Code.