window.onload=init;

function init(){
  var button=document.getElementById("add_button");
  button.onclick=createSticky;
  var text=document.getElementById("note_text");
  text.onkeypress=handleKeyPress;
  var stickiesArray=getStickiesArray();
  for (var i = 0; i < stickiesArray.length; i++) {
    var key=stickiesArray[i];
    var value=JSON.parse(localStorage[key]);
    addStickToDOM(key,value);
  }
  /*for (var key in stickiesArray) {
    var key=stickiesArray[key];
    value=localStorage[key];
    addStickToDOM(key,value);
  }*/
}

function addStickToDOM(key,stickyObj){
  var stickies=document.getElementById("stickies");
  var sticky=document.createElement("li");
  sticky.setAttribute("id",key);
  sticky.style.backgroundColor=stickyObj.color;
  var span=document.createElement("span");
  span.setAttribute("class","sticky");
  span.innerHTML=stickyObj.value;
  sticky.appendChild(span);
  stickies.appendChild(sticky);
  sticky.onclick=deleteSticky;
}

function createSticky(){
  var stickiesArray=getStickiesArray();
  var value=document.getElementById("note_text").value;
  var currentDate=new Date();
  var time=currentDate.getTime();
  var key="note"+time;
  var colorSelectObj=document.getElementById("note_color");
  var index=colorSelectObj.selectedIndex;
  var color=colorSelectObj[index].value;
  var stickyObj={"value":value,"color": color};
  localStorage.setItem(key,JSON.stringify(stickyObj));
  stickiesArray.push(key);
  localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
  addStickToDOM(key,stickyObj);
  document.getElementById("form").reset();
}

function handleKeyPress(e){
  var button=document.getElementById("add_button");
  if (e.keyCode===13) {
    button.click();
    return false;
  }
}

function getStickiesArray(){
  var stickiesArray=localStorage["stickiesArray"];
  if (!stickiesArray) {
    stickiesArray=[];
    localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
  }else {
    stickiesArray=JSON.parse(stickiesArray);
  }
  return stickiesArray;
}

function deleteSticky(e){
  var key=e.target.id;
  if (e.target.tagName.toLowerCase()=="span") {
    key=e.target.parentNode.id;
  }
  localStorage.removeItem(key);
  var stickiesArray=getStickiesArray();
  if (stickiesArray){
    for (var i = 0; i < stickiesArray.length; i++) {
      if (key===stickiesArray[i]){
        stickiesArray.splice(i,1);
      }
    }
    localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
    removeStickyFromDOM(key);
  }
}

function removeStickyFromDOM(key){
  var sticky=document.getElementById(key);
  sticky.parentNode.removeChild(sticky);
}
