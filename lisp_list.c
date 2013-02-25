#include <stdio.h>
#include <stdlib.h>
#include "lisp_list.h"

LispList* newNode() {
  LispList* rs = (LispList*) malloc(sizeof(LispList));
  if (rs == NULL) {
    printf("OUT OF MEMORY\n");
    exit(1);
  }

  return rs;
}

LispList* newNumberNode(char *str){ 
  LispList* rs = newNode();
  rs->car = str;
  rs->cdr = NULL;
  rs->type = NUMBER_ATOM;
  return rs;
}

LispList* newStringNode(char *str){ 
  LispList* rs = newNode();
  rs->car = str;
  rs->cdr = NULL;
  rs->type = STRING_ATOM;
  return rs;
}

LispList* newIdNode(char *str){ 
  LispList* rs = newNode();
  rs->car = str;
  rs->cdr = NULL;
  rs->type = ID_ATOM;
  return rs;
}

LispList* newListNode(void *lst){ 
  LispList* rs = newNode();
  rs->car = lst;
  rs->cdr = NULL;
  rs->type = LIST;
  return rs;
}

void pushToList(LispList* xs, LispList* node){
  LispList *curr = xs;

  while (curr->cdr != NULL) {
    curr = curr->cdr;
  }

  curr->cdr = node;
}

void printNode(LispList* node) {
  if (node->type != LIST) {
    printf("%s, ", (char *)node->car);
  } else {
    printList(node->car);
  }
}

void printList(LispList* xs){
  LispList *curr = xs;

  printf("[");
  while (curr != NULL) {
    printNode(curr);
    curr = curr->cdr;
  }
  printf("]\n");
}
