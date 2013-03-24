/* lexical grammar */
%lex
%%
[0-9]+                  return 'NUMBER';
[a-zA-Z\+\-\*]+         return 'ID';
L?\"(\\.|[^\\"])*\"     return 'STRING';
\(                      return 'LPAREN';
\)                      return 'RPAREN';
\n                      /* ignore end of line */;
[ \t]+                  /* ignore whitespace */;

/lex

%start program

%% /* language grammar */


program: s_exps {
  return $1;
};

s_exps: s_exps s_exp {  
  $1.push($2);
  $$ = $1;
} | { $$ = [];};

s_exp: atom | list {
  $$ = $1;
};

list: LPAREN s_exps RPAREN {
  $$ = $2;
};

atom
  : NUMBER { $$ = {txt: yytext, type: 'number'}; }
  | ID { $$ = {txt: yytext, type: 'id'}; }
  | STRING { $$ = {txt: yytext, type: 'string'}; }
;
