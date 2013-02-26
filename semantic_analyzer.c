#include "semantic_analyzer.h"

void semanticCheck(LispList* program) {
  if(program->type == STRING_ATOM || program->type == NUMBER_ATOM) {
    printf("type error: invalid function: %s\n", (char *) program->car);
    exit(1);
  }

  LispList* curr = program;
  while (curr != NULL) {
    if(curr->type == LIST) {
      semanticCheck(curr->car);
    }
    curr = curr->cdr;
  }
}
