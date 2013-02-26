all:
	lex lexer.l
	yacc -d parser.y
	gcc *.c -ggdb -o lispjs

clean:
	rm y.tab.*
	rm lex.yy.c
