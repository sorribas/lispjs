#include <stdio.h>
#include <stdlib.h>
#include "lisp_list.h"
#include "semantic_analyzer.h"
#include "code_generator.h"

LispList* parse();

int main() {
  LispList* parseTree =  parse();
  //printList(parseTree);
  printf("\n");

  semanticCheck(parseTree);

  generateCode(parseTree, stdout);
  return 0;
}
