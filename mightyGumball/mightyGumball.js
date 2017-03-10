var lastreporttime=0;

window.onload=function(){
  var internalId=setInterval(handleRefresh,"3000");
  var cleanButton=document.getElementById("cleanButton");
  cleanButton.onclick=function(){
    clearInterval(internalId);
  }
  /*var url="http://gumball.wickedlysmart.com";
  var request=new XMLHttpRequest();
  request.open("GET",url);
  request.onload=function(){
    if(request.status==200){
      upDateSalses(request.responseText);
    }
  };
  request.send(null);*/
}

//function upDateSalses(responseText){
function upDateSalses(sales){
  var salesDiv=document.getElementById("sales");
//  var sales=JSON.parse(responseText);
  for (var i = 0; i < sales.length; i++) {
    var sale=sales[i];
    var div=document.createElement("div");
    div.setAttribute("class","saleItem");
    div.innerHTML=sale.name+" sold "+sale.sales+" gumballs";
    salesDiv.appendChild(div);
  }
  if (sales.length>0) {
    lastreporttime=sales[sales.length-1].time;
  }
}

function handleRefresh(){
  var url="http://gumball.wickedlysmart.com?callback=upDateSalses"+
            "&lastreporttime="+lastreporttime+"&random="+
            (new Date()).getTime();

  var newScriptElement=document.createElement("script");
  newScriptElement.setAttribute("src",url);
  newScriptElement.setAttribute("id","jsonp");

  var oldScriptElement=document.getElementById("jsonp");
  var head=document.getElementsByTagName("head")[0];
  if (oldScriptElement==null) {
    head.appendChild(newScriptElement);
  }
  else {
    head.replaceChild(newScriptElement,oldScriptElement);
  }
}
