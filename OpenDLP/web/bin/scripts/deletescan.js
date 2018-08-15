function toggleRows(val) {
  var tab=document.getElementById("table1");
  for (i = 0; i < tab.rows.length; i++) {
    var row = tab.rows[i];    
    if (row.id == "incomplete") {    
      row.style.display = (val ? "table-row" : "none");      
    }     
  }
}
