%{
#include <stdio.h>
#include "y.tab.h"
#include "lisp_list.h"
%}
%%
[0-9]+                  yylval = newNumberNode(strdup(yytext)); return NUMBER;
[a-zA-Z\+\-\*]+         yylval = newIdNode(strdup(yytext)); return ID;
L?\"(\\.|[^\\"])*\"     yylval = newStringNode(strdup(yytext)); return STRING;
\(                      return LPAREN;
\)                      return RPAREN;
\n                      /* ignore end of line */;
[ \t]+                  /* ignore whitespace */;
%%
