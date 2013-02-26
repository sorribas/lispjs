#include "code_generator.h"

static FILE* out;

void generateCodeForList(LispList*);
void generateCodeForNode(LispList*);
void generateFuncCall(LispList*);

void generateCode(LispList* program, FILE* f) {
  out = f;
  generateCodeForList(program);
}

void generateCodeForList(LispList* program) {
  LispList* curr = program;

  while (curr != NULL) {
    generateCodeForNode(curr);
    curr = curr->cdr;
  }

  fprintf(out, ";\n");
}

void generateCodeForNode(LispList* node) {
  if(node->type == LIST) {
    generateFuncCall(node->car);
  } else {
    fprintf(out, "%s",(char *) node->car);
  }
}

void generateFuncCall(LispList* xs) {
  generateCodeForNode(xs);
  fprintf(out, "(");

  LispList* curr = xs->cdr;
  while (curr != NULL) {
    generateCodeForNode(curr);
    
    if (curr->cdr != NULL) {
      fprintf(out,", ");
    }
    curr = curr->cdr;
  }

  fprintf(out, ")");
}
