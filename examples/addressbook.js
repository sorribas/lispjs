contacts = LispJs.list(LispJs.createObjFromArray(LispJs.list("name", "Dennis Ritchie", "phone", "3045553141")), LispJs.createObjFromArray(LispJs.list("name", "Edsger Dijkstra", "phone", "3045551618")), LispJs.createObjFromArray(LispJs.list("name", "Donald Knuth", "phone", "3045551346")));
updateTable = function() {
  LispJs.callFunWithObj($("#addrTbl tbody"), "html", "");
  LispJs.callFunWithObj($, "each", contacts, function(i, x) {
    return (LispJs.callFunWithObj($("#addrTbl tbody"), "append", LispJs.plus("<tr contacti='", i, "'><td>", LispJs.get(x, "name"), "</td> <td>", LispJs.get(x, "phone"), "</td><td><button class='btn btn-danger'>Eliminar</button></td></tr>")));
  });
  return (LispJs.callFunWithObj($(".btn-danger"), "click", function() {
    contactId = LispJs.callFunWithObj(LispJs.callFunWithObj($(this), "parents", "tr"), "attr", "contacti");
    LispJs.callFunWithObj(contacts, "splice", contactId, 1);
    return (updateTable());
  }));
};
jQuery(function($) {
  LispJs.callFunWithObj($("#addContactBtn"), "click", function() {
    return (LispJs.callFunWithObj($("#addModal"), "modal"));
  });
  LispJs.callFunWithObj($("#addBtn"), "click", function() {
    LispJs.callFunWithObj(contacts, "push", LispJs.createObjFromArray(LispJs.list("name", LispJs.callFunWithObj($("#newName"), "val"), "phone", LispJs.callFunWithObj($("#newPhone"), "val"))));
    updateTable();
    return (LispJs.callFunWithObj($("#addModal"), "modal", "hide"));
  });
  return (updateTable());
});
