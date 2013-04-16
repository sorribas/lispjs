contacts = LispJs.list(LispJs.createObjFromArray(LispJs.list("name", "Dennis Ritchie", "phone", "3045553141")), LispJs.createObjFromArray(LispJs.list("name", "Edsger Dijkstra", "phone", "3045551618")), LispJs.createObjFromArray(LispJs.list("name", "Donald Knuth", "phone", "3045551346")));
"Hola esto es un comentario";
updateTable = function() {
  LispJs.callFunWithObj($("#addrTbl tbody"), "html", "");
  LispJs.callFunWithObj($, "each", contacts, function(i, x) {
    LispJs.callFunWithObj($("#addrTbl tbody"), "append", LispJs.plus("<tr contacti='", i, "'><td>", LispJs.get(x, "name"), "</td> <td>", LispJs.get(x, "phone"), "</td><td><button class='btn btn-danger'>Delete</button></td></tr>"));
  });
  LispJs.callFunWithObj($(".btn-danger"), "click", function() {
    contactId = LispJs.callFunWithObj(LispJs.callFunWithObj($(this), "parents", "tr"), "attr", "contacti");
    LispJs.callFunWithObj(contacts, "splice", contactId, 1);
    updateTable();
  });
};
jQuery(function($) {
  updateTable();
});

