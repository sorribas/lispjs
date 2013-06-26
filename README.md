LispJS
======

LispJS is a small Lisp-like language that compiles to JavaScript. It is still a work in progress
but feel free to take a look at it :).


Installation
------------

You can install LispJS with npm

    [sudo] npm install lispjs -g

To compile a file

    lispjs source.lispjs -o output.js

The language
------------

The main idea of the language is to have a JavaScript with Lisp syntax.
Let's start with a simple example

    (alert "Hello World")

As in any lisp the function execution in LispJS is (func param1 param2 ...)

Now there are some specific functions to be used with LispJS such as the def function
to define values.

    (def a 3)

From that point on the 'a' identifier has the value '3' assigned. One important thing
to know is the basic arithmetic functions

    (def a (+ 2 2))
    (def b (- 4 3))
    (def c (* 2 3))
    (def d (/ 4 2))

This is equivalent to the JavaScript

    var a = 2 + 2;
    var b = 4 - 3;
    var c = 2 * 3;
    var d = 4 / 2;

One of the most important things to do with any lisp is working with lists.
This is the way to define lists in LispJS

    (def xs (list 1 2 3 4))

You can also use the 'car' and 'cdr' functions of lisp

    (car xs) ; returns 1
    (cdr xs) ; returns (2 3 4)

LispJS also includes some of the traditional lisp operators like map, foldLeft, 
foldRight and filter. More are to be added in the future.

To define JavaScript objects from LispJS you have to use a list, this way:

    (def person (object (list
       "name" "Eduardo Sorribas"
       "country" "Dominican Republic")))

As you can see, the language is far from ready and there are many things yet
to define. There is an example of LispJS using jQuery in the examples folder.
If you have any questions feel free to write to me or create an issue.

Disclaimer
----------

This language was made as a university assignment and was later somewhat fixed.
It is obviously missing a lot of stuff: there are not enough tests, the semantic
analyzer is incomplete and the language lacks a lot of features. I uploaded on 
the chance that someone might be interested and would want to check and maybe 
improve it a bit.

I do not intend this language to be used for professional purposes. I intend 
to improve the compiler whenever I have time. If you want to help you can try 
to write some simple programs and report any issue you had. Or if you want you 
can try to fix the issue and send a pull request.

License
-------

MIT License. Read LICENSE.txt for more information.
