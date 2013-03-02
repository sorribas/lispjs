#include "code_generator.h"

static FILE* out;
static int indentLevel = 0;

void generateCodeForList(LispList*);
void generateCodeForNode(LispList*);
void generateFuncCall(LispList*);
void generateLambda(LispList*);
void generateParamererList(LispList*);
void generateDefinition(LispList*);

void generateCode(LispList* program, FILE* f) {
  out = f;
  generateCodeForList(program);
}

void printIndent() {
  int i;
  for (i = 0; i < indentLevel; i++) {
    fprintf(out, "  ");
  }
}

void generateCodeForList(LispList* program) {
  LispList* curr = program;

  while (curr != NULL) {
    printIndent();
    generateCodeForNode(curr);
    fprintf(out, ";\n");
    curr = curr->cdr;
  }
}

void generateCodeForNode(LispList* node) {
  if(node->type == LIST) {
    if( ((LispList*) node->car)->type == ID_ATOM  && 0 == strcmp((char*) ((LispList*) node->car)->car , "def") )
      generateDefinition(node->car);
    else if( ((LispList*) node->car)->type == ID_ATOM  && 0 == strcmp((char*) ((LispList*) node->car)->car , "lambda") )
      generateLambda(node->car);
    else
      generateFuncCall(node->car);
  } else {
    fprintf(out, "%s",(char *) node->car);
  }
}

void generateLambda(LispList* node) {
  fprintf(out, "function(");
  indentLevel++;
  generateParamererList(node->cdr->car);
  fprintf(out, ") {\n");
  generateCodeForList(node->cdr->cdr);
  indentLevel--;
  printIndent();
  fprintf(out, "}");
}

void generateParamererList(LispList* xs){
  LispList *curr = xs;

  while (curr != NULL) {
    fprintf(out, "%s", (char *)curr->car);
    curr = curr->cdr;
    if(curr != NULL) {
      printf(", ");
    }
  }
}

void generateDefinition(LispList* node) {
  // TODO validate this in semantic analyzer
  char* var = (char*)node->cdr->car;
  fprintf(out, "%s = ", var);
  generateCodeForNode(node->cdr->cdr);
}

void generateFuncCall(LispList* xs) {
  // TODO validate this in semantic analyzer
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
