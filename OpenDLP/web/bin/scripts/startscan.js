function changeDisplay(dropdown){
    var myindex  = dropdown.selectedIndex
    var selValue = dropdown.options[myindex].value
    var selText  = dropdown.options[myindex].text
    if (selText.indexOf("(meta_agent)") == -1 && selText.indexOf("(post_agent)") == -1) {    
      document.getElementById("form1").action="start-verify.html";
      toggleOff("MetaOptions");
      toggleOn ("BasicOptions");
      //new: Josh 2018.06.30
//    for(var i = 0; i < dropdown.length; ++i)
//    {
//        toggleOff("gpgrn".concat(dropdown.options[i].value));
//    }
//    toggleOn("gpgrn".concat(selValue));
      /////
    } else {  // This is a meta_agent
      document.getElementById("form1").action="meta-list.html";      
      toggleOn ("MetaOptions");
      toggleOff("BasicOptions");
    }

    return true;
}
function toggleOn(a) {
	var e=document.getElementById(a);
	if(!e)return true;
	e.style.display="block";
	return true;
}
function toggleOff(a) {
	var e=document.getElementById(a);
	if(!e)return true;
	e.style.display="none";
	return true;
}
