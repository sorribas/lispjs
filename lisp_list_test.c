/*#include <stdio.h>
#include <stdlib.h>
#include "lisp_list.h"

int main() {
  LispList* xs = newStringNode("hey");
  pushToList(xs, newStringNode("Hi"));
  pushToList(xs, newStringNode("Jo"));

  LispList* ys = newStringNode("Edu");
  pushToList(ys, newStringNode("Jose"));
  pushToList(ys, newStringNode("Dorian"));
  pushToList(ys, newStringNode("Jorge"));

  pushToList(xs, newListNode(ys));
  pushToList(xs, newStringNode("Hello"));
  pushToList(xs, newStringNode("World"));

  printList(xs);

  LispList* parseTree =  parse();
  printList(parseTree);
  printf("\n");
  return 0;
}*/
