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
    fprintf(out, ";\n");
    curr = curr->cdr;
  }

}

void generateCodeForNode(LispList* node) {
  if(node->type == LIST) {
    if( ((LispList*) node->car)->type == ID_ATOM  && 0 == strcmp((char*) ((LispList*) node->car)->car , "def") )
      generateDefinition(node->car);
    else
      generateFuncCall(node->car);
  } else {
    fprintf(out, "%s",(char *) node->car);
  }
}

void generateDefinition(LispList* node) {
  // TODO validate this in semantic analyzer
  char* var = (char*)node->cdr->car;
  fprintf(out, "%s = ", var);
  generateCodeForNode(node->cdr->cdr);
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
