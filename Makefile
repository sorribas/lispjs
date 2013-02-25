all:
	lex lexer.l
	yacc -d parser.y
	gcc *.c -o lispjs

clean:
	rm parser.tab.*
	rm lex.yy.c
	rm y.tab.*
