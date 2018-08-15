function toggleCheckboxes() {
    var fields = document.SessionList.checkList;
    var checkval = document.SessionList.checkAll.checked;
    if (Object.prototype.toString.call(fields).indexOf("NodeList") == -1) {
        // Not an array
        fields.checked = checkval;  // Handles case where only one item in list
    } else {
        // Handles case where many items in list
        for (i = 0; i < fields.length; i++) {
            fields[i].checked = checkval;
        }
    }
    return true;
}

function updateSystems() {
    var fields = document.SessionList.checkList;
    var checkval = document.SessionList.checkAll.checked;
    if (Object.prototype.toString.call(fields).indexOf("NodeList") == -1) {
        // Not an array     
        if (fields.checked == true) document.SessionList.systems.value = fields.value;
        else { 
            alert("No sessions selected, nothing to scan.");
            return false;
        }
    } else {  // Handles case where there are many items in list
        var sessions = "";
        var cnt = 0;
        for (i = 0; i < fields.length; i++) {
            if (fields[i].checked) {
                cnt++;
                sessions += fields[i].value + "\\n";
            }
        }
        if (cnt == 0) { 
            alert("No sessions selected, nothing to scan.");
            return false;
        }
        document.SessionList.systems.value = sessions;      
    }
    return true;
}

function doPause() {
    alert("pause");
    return true;
}

function doResume() { 
    alert ("resume"); 
    return true; 
}

function doUninstall() { 
    alert ("uninstall"); 
    return true; 
}
