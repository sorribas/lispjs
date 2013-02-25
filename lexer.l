%{
#include <stdio.h>
#include "y.tab.h"
%}
%%
[0-9]+                  /*yylval = (char *) strdup(yytext);*/ return NUMBER;
[a-zA-Z\+\-\*]+         /*yylval=yytext;*/ return ID;
L?\"(\\.|[^\\"])*\"     /*yylval=yytext;*/ return STRING;
\(                      return LPAREN;
\)                      return RPAREN;
\n                      /* ignore end of line */;
[ \t]+                  /* ignore whitespace */;
%%
