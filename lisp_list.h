#ifndef _LISP_LIST_H_
#define _LISP_LIST_H_

typedef enum {
  NUMBER_ATOM, STRING_ATOM, ID_ATOM, LIST
} LispType;

typedef struct LispListStruct {
  void* car;
  struct LispListStruct *cdr;
  LispType type;
} LispList;

LispList* newNumberNode(char *);

LispList* newStringNode(char *);

LispList* newIdNode(char *);

LispList* newListNode(void *);

void pushToList(LispList*, LispList*);

void printList(LispList*);

#endif /* _LISP_LIST_H_ */
