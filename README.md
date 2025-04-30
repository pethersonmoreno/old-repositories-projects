# example-c-swig-to-python





## Build together with the program 'example'

First you need to generate the wrap code `example_wrap.c` with your interface file `example.i`, then run the following command:

```sh
swig -python example.i
```
Now you have a file `example_wrap.c` in the same directory of `example.i`.

Then let's build the `example` program and its wrap program to run in Python (in this case we are using `gcc`):

```sh
gcc -fPIC -c example.c example_wrap.c -I/usr/include/python3.13
```
In the above code we are using as reference the include of Python 3.13 that is installed in the computer that it was tested.

After you run the `gcc` command to build, you will find 2 new files `example.o` and `example_wrap.o` in the directory.

Now we need connect them to use it, run the command `ld` to do it:

```sh
ld -shared example.o example_wrap.o -o _example.so
```

Now you can use the module `example` in Python code.





## Build only python module to connect to program 'example' that is already built

The program `example` is already built, then you must have a file `example.o`, in a part of your includes path or in your current directory.

Now you need to generate the wrap code `example_wrap.c` with your interface file `example.i`, then run the following command:

```sh
swig -python example.i
```
Now you have a file `example_wrap.c` in the same directory of `example.i`.

With it we have the library `example.o` and the file `example_wrap.c`, then we build the wrap program to run in Python (in this case we are using `gcc`):

```sh
gcc -fPIC -c example_wrap.c -I/usr/include/python3.13
```
In the above code we are using as reference the include of Python 3.13 that is installed in the computer that it was tested.

After you run the `gcc` command to build, you will find 2 new files `example.o` and `example_wrap.o` in the directory.

Now we need connect them to use it, run the command `ld` to do it:

```sh
ld -shared example.o example_wrap.o -o _example.so
```
Now you can use the module `example` in Python code.


### Commands to check if it works separately

Build the program only and put the file on directory `lib/`:

```sh
mkdir -p lib
mkdir build-program
cp -a example.c build-program/
cd build-program
gcc -c example.c
cp -a example.o ../lib/
cd ..
rm -rf build-program
```

Now let's use swig to generate the code to our wrap module that will use the lib in `lib/example.o`

```sh
mkdir -p lib_wrap
mkdir build-wrap-program
cp -a example.i build-wrap-program/
cd build-wrap-program
swig -python example.i # it generates the file example_wrap.c
gcc -fPIC -c example_wrap.c -I/usr/include/python3.13
cp -a example.py ../lib_wrap/
cp -a example_wrap.o ../lib_wrap/
cd ..
rm -rf build-wrap-program
```

Now we have the wrap module with the python connection in `lib_wrap/example.py` and `lib_wrap/example_wrap.o`.


Now we need connect them to use it, run the command `ld` to do it:

```sh
mkdir -p lib_connect
mkdir connect-wrap-program
cd connect-wrap-program
ld -shared ../lib/example.o ../lib_wrap/example_wrap.o -o ../lib_connect/_example.so
cd ..
rm -rf connect-wrap-program
```

Now let's test it with the files separated:

Test 1 working:

```sh
mkdir test-using-in-python-v1
cd test-using-in-python-v1
cp -a ../lib_wrap/example.py ./
cp -a ../lib_connect/_example.so ./
python -c "import example; print(example.fact(5)); print(example.my_mod(7,3)); print(example.get_time())"
cd ..
rm -rf test-using-in-python-v1
```

Test 2 working:

```sh
mkdir test-using-in-python-v2
cd test-using-in-python-v2
mkdir /tmp/site-package-example-v2
cp -a ../lib_wrap/example.py /tmp/site-package-example-v2/
cp -a ../lib_connect/_example.so /tmp/site-package-example-v2/
PYTHONPATH='/tmp/site-package-example-v2/' python -c "import example; print(example.fact(5)); print(example.my_mod(7,3)); print(example.get_time())"
rm -rf /tmp/site-package-example-v2
cd ..
rm -rf test-using-in-python-v2
```


Test 3 working:

```sh
mkdir test-using-in-python-v3
cd test-using-in-python-v3
mkdir /tmp/site-package-example-v3
cp -a ../lib_wrap/example.py /tmp/site-package-example-v3/
mkdir /tmp/lib-so-files-v3
cp -a ../lib_connect/_example.so /tmp/lib-so-files-v3/
# the name of file _example.so can be changed to _example.cpython-313-x86_64-linux-gnu.so in this case because I'm using python in the version 3.13 
PYTHONPATH='/tmp/site-package-example-v3/:/tmp/lib-so-files-v3' python -c "import example; print(example.fact(5)); print(example.my_mod(7,3)); print(example.get_time())"
rm -rf /tmp/lib-so-files-v3
rm -rf /tmp/site-package-example-v3
cd ..
rm -rf test-using-in-python-v3
```


Test 4 not working:

```sh
mkdir test-using-in-python-v4
cd test-using-in-python-v4
mkdir /tmp/site-package-example-v4
cp -a ../lib_wrap/example.py /tmp/site-package-example-v4/
mkdir /tmp/lib-so-files-v4
cp -a ../lib_connect/_example.so /tmp/lib-so-files-v4/
PYTHONPATH='/tmp/site-package-example-v4/' LD_LIBRARY_PATH=/tmp/lib-so-files-v4:$LD_LIBRARY_PATH python -c "import example; print(example.fact(5)); print(example.my_mod(7,3)); print(example.get_time())"
rm -rf /tmp/lib-so-files-v4
rm -rf /tmp/site-package-example-v4
cd ..
rm -rf test-using-in-python-v4
```

### How to build using shared library on linux

```sh
mkdir dynamic_link
cd dynamic_link

mkdir lib-src
cp -a ../example.c lib-src/
cp -a ../example.h lib-src/

mkdir includes
cp -a ../example.h includes/

mkdir lib
# File compiled will be here

# 
# 
cd lib-src
gcc -o example.o -fPIC -c example.c
gcc -o ../lib/libexample.so -shared example.o
cd ..
# 
# 

# Case 1 - Compile without pass a default path where find library that it depends.
mkdir module_python
mkdir lib-python
cp -a ../example.i module_python/
cd module_python
swig -python example.i
gcc -o ../lib-python/_example.so example_wrap.c -I/usr/include/python3.13 -I../includes/ -L../lib/ -lexample -fPIC -shared
cp -a example.py ../lib-python/
cd ../lib-python/
LD_LIBRARY_PATH=../lib/ python -c "import example; print(example.fact(5)); print(example.my_mod(7,3)); print(example.get_time())"
rm -rf module_python
rm -rf lib-python
# 
# 

# 
# 
# Case 2 - Compile passing a default path where find library that it depends - because of it, it's not needed use the variable LD_LIBRARY_PATH=../lib/ to add the path
mkdir module_python
mkdir lib-python
cp -a ../example.i module_python/
cd module_python
swig -python example.i
gcc -o ../lib-python/_example.so example_wrap.c -I/usr/include/python3.13 -I../includes/ -L../lib/ -lexample -Wl,-rpath=../lib/ -fPIC -shared
# -L../lib/ - it configures a where to find at the moment the library that this project depends
# -Wl,-rpath=../lib/ - it configures a additional place where the program will find its library that it needs to run
cp -a example.py ../lib-python/
cd ../lib-python/
python -c "import example; print(example.fact(5)); print(example.my_mod(7,3)); print(example.get_time())"
cd ../
rm -rf module_python
rm -rf lib-python
# 
# 


# 
# 
rm -rf lib-src
rm -rf lib
cd ..
rm -rf dynamic_link
```

You can see the libs needed by a binary file running the following command:

```sh
patchelf --print-needed _example.so 
```

You can also add other shared library as dependency, and you remove too, here a command to add a shared library to it

```sh
patchelf --add-needed libexample.so _example.so
```

You can get all info of binary about ELF running the following commmand:

```sh
readelf -a example_wrap.so
```
## Example to test the python module `example`

You can run it in a command:

```sh
python -c "import example; print(example.fact(5)); print(example.my_mod(7,3)); print(example.get_time())"
```

Or you can open your `python` terminal in the directory and then run the following commands after `>>> `:

```sh
>>> import example
>>> example.fact(5)
120
>>> example.my_mod(7,3)
1
>>> example.get_time()
'Tue Apr 29 12:08:01 2025\n'
>>> 
```
