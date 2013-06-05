contacts = LispJs.list(LispJs.createObjFromArray(LispJs.list("name", "Dennis Ritchie", "phone", "3045553141")), LispJs.createObjFromArray(LispJs.list("name", "Edsger Dijkstra", "phone", "3045551618")), LispJs.createObjFromArray(LispJs.list("name", "Donald Knuth", "phone", "3045551346")));
updateTable = function() {
  ($("#addrTbl tbody")).html("");
  ($).each(contacts, function(i, x) {
    return (($("#addrTbl tbody")).append(LispJs.plus("<tr contacti='", i, "'><td>", (x).name, "</td> <td>", (x).phone, "</td><td><button class='btn btn-danger'>Eliminar</button></td></tr>")));
  });
  return (($(".btn-danger")).click(function() {
    contactId = (($(this)).parents("tr")).attr("contacti");
    (contacts).splice(contactId, 1);
    return (updateTable());
  }));
};
jQuery(function($) {
  ($("#addContactBtn")).click(function() {
    return (($("#addModal")).modal());
  });
  ($("#addBtn")).click(function() {
    (contacts).push(LispJs.createObjFromArray(LispJs.list("name", ($("#newName")).val(), "phone", ($("#newPhone")).val())));
    updateTable();
    return (($("#addModal")).modal("hide"));
  });
  return (updateTable());
});
