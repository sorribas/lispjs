%{
#include <stdio.h>
#include <string.h>
#include "lisp_list.h"
#include "parser.h"
#define YYSTYPE LispList*

static LispList* program;
 
void yyerror(const char *str) {
        fprintf(stderr,"error: %s\n",str);
}
 
int yywrap() {
        return 1;
} 
  
LispList* parse() {
  yyparse();
  return program;
} 

%}

/*
BNF rules of LISP

s_expression = atomic_symbol \
              / "(" s_expression "."s_expression ")" \
              / list 

list = "(" s_expression < s_expression > ")"

atomic_symbol = letter atom_part

atom_part = empty / letter atom_part / number atom_part

letter = "a" / "b" / " ..." / "z"

number = "1" / "2" / " ..." / "9"

empty = " "
*/


%token NUMBER ID STRING LPAREN RPAREN

%%

program: s_exps {
  program = $1;
}

s_exps: empty | s_exps s_exp {  
  if($1 == NULL) {
    $$ = $2;
  }
  else {
    pushToList($1 ,$2);
    $$ = $1;
  }
}

empty: {
  $$ = NULL;
};

s_exp: atom | list {
  $$ = $1;
};

list: LPAREN s_exps RPAREN {
  $$ = newListNode($2);
};

atom: NUMBER|ID|STRING {
  $$ = $1;
};
%%
