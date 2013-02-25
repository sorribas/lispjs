%{
#include <stdio.h>
#include <string.h>
#include "lisp_list.h"
#define YYSTYPE LispList*
 
void yyerror(const char *str)
{
        fprintf(stderr,"error: %s\n",str);
}
 
int yywrap()
{
        return 1;
} 
  
main()
{
        yyparse();
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

s_exps: empty | s_exps s_exp {  
  if($2 != NULL)
    printf("S_EXPS: %s ",(char *) $2->car);
  if($1 == NULL)
    printf("NULL S_EXPS\n");
  else
    printf("%d\n", $1->type);

  $$ = $2;
}

empty: {
  $$ = NULL;
};

s_exp: atom | list {
  $$ = $1;
  printf("S_EXP\n");
};

list: LPAREN s_exps RPAREN {
  $$= NULL;
  printf("LIST\n");
};

atom: NUMBER|ID|STRING {
  printf("ATOM\n");
  $$ = $1;
};
%%
