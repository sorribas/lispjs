
/* description: Parses end executes mathematical expressions. */

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
  console.log($1);
};


/*empty: {
  console.log('EMPTY');
  $$ = null;
};*/

s_exps: s_exps s_exp {  
    console.log($1 + ' ' +$2);
    $1.push($2);
    $$ = $1;
  }
|
  { $$ = [];} 

;

s_exp: atom | list {
  $$ = $1;
};

list: LPAREN s_exps RPAREN {
  console.log($2);
  $$ = $2;
};

atom: NUMBER|ID|STRING {
  $$ = yytext;
};
