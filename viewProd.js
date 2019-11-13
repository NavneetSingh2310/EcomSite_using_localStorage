var CartArray=[];
var retrievedArray=[];
var CartId=0;
var userArray=[];
var showListProducts=document.getElementById("showListProducts");
var showname=document.getElementById("Show");



function addProducttoDOM(newObj)
{
  var listdiv1=document.createElement("div");
  listdiv1.setAttribute("id",newObj.Prodid);
  var prodName=newObj.Prodname;
  var prodDesc=newObj.Proddesc;
  var prodprice=newObj.Prodprice;
  var prodquan=newObj.Prodquan;
  var label1=document.createElement("LABEL");
  var label2=document.createElement("LABEL");
  var label3=document.createElement("LABEL");
  var label4=document.createElement("LABEL");
  label1.innerHTML="Product Name: "+prodName;
  label2.innerHTML="Product Desc: "+prodDesc;
  label3.innerHTML="Product Price: "+prodprice;
  if(prodquan<=0)
  {
    label4.innerHTML="Out of stock !";
    label4.setAttribute("style","font-size:1.5em; font-Family:Georgia; margin-left:15px; color:red;");
  }
  label1.setAttribute("style","font-size:1.5em; font-Family:Georgia; margin-left:15px;");
  label2.setAttribute("style","font-size:1.5em; font-Family:Georgia; margin-left:15px;");
  label3.setAttribute("style","font-size:1.5em; font-Family:Georgia; margin-left:15px;");

  var inputQuan=document.createElement("input");
  inputQuan.setAttribute("placeholder","  quantity");
  inputQuan.setAttribute("type","number");
  inputQuan.setAttribute("style","margin:left:5px; width: 8%; height:5%;  margin-top:10px; margin-left:15px;");
  inputQuan.setAttribute("id","inputQuan");
  if(prodquan<=0)
  inputQuan.setAttribute("disabled","true");

  var addToCart=document.createElement("button");
  addToCart.innerHTML="Add To Cart";
  addToCart.setAttribute("id","addToCart");
  addToCart.setAttribute("style","height:30px; color:red; background-color:black; font-size: 12px; border:none; margin-left:10px; ");

  listdiv1.append(label1);
  insertBlankLine(listdiv1);
  listdiv1.append(label2);
  insertBlankLine(listdiv1);
  listdiv1.append(label3);
  insertBlankLine(listdiv1);
  if(prodquan<=0)
  {
  listdiv1.append(label4);
  insertBlankLine(listdiv1);
  }
  listdiv1.append(inputQuan);
  listdiv1.append(addToCart);
  insertBlankLine(listdiv1);
  insertBlankLine(listdiv1);
  insertBlankLine(listdiv1);
  showListProducts.appendChild(listdiv1);

addToCart.addEventListener("click",function()
{
  if(userArray.length==0)
  {
    alert("You need to Login first.");
    location.href="login.html";
  }

  else{
    var target=event.target.parentNode;
    var quantity=inputQuan.value;
    if(quantity=="")
    {
      alert("Fill Some Value In It");
    }
    else
    {
    var flag=validate(retrievedArray[getProductIndex(target.id)].Prodquan,quantity);
    if(flag==true)
    {
      alert("Product Added In Your Cart.");
      var CartObj={
        UserId:userArray[0].username,
        Prodid:newObj.Prodid,
        ProdName:prodName,
        ProdDesc:prodDesc,
        Prodprice:prodprice,
        ProdQuan:quantity
      }
      console.log(CartObj);
    var temp = checkIndex(CartArray,newObj.Prodid,userArray[0].username);
    console.log(userArray);
    if(temp != -1)
    {
      CartArray.splice(temp,1,CartObj);
      console.log(CartArray);
    }
    else if(temp == -1)
    {
      CartArray.push(CartObj);
      CartId++;
      console.log(CartArray);
    }

    }
}
}
});

}


function getCartProducts()
{
  if(!localStorage.cartProduct)
  {
    localStorage.cartProduct=JSON.stringify([]);
  }
  else
  {
    CartArray=JSON.parse(localStorage.cartProduct);
    console.log(CartArray);
  }
}


function getStoredProducts()
{
if(!localStorage.adminproducts)
{
localStorage.adminproducts=JSON.stringify([]);
}
else
{
retrievedArray=JSON.parse(localStorage.adminproducts);
for(i=0;i<retrievedArray.length;i++)
{
addProducttoDOM(retrievedArray[i]);
}}}


function getSessionProducts()
{
  if(sessionStorage.logarray)
  userArray=JSON.parse(sessionStorage.logarray);
  console.log(userArray);
if(userArray.length==0)
{
sessionStorage.logarray=JSON.stringify([]);
var anchor=document.createElement("A");
var text=document.createTextNode("Login/Register");
anchor.appendChild(text);
anchor.setAttribute("href","login.html");
anchor.setAttribute("style","align:right");
anchor.setAttribute("style","margin-top:10px;");
anchor.setAttribute("style","font-size:1.7em;");
showname.append(anchor);
}
else if(userArray.length!=0)
{
loggedIn();
console.log(userArray);
}
}


function insertBlankLine(divi)
{
  var br=document.createElement("br");
  divi.appendChild(br);
}



function validate(prodquan,enteredquan)
{
  if(enteredquan==""){
  alert("Fill Quantity");
  return false;}
  else if(parseInt(enteredquan)<=0)
  {
    alert("Invalid Quantity");
    return false;
  }
  else if(parseInt(enteredquan)>parseInt(prodquan))
  {
    alert("Quantity Should Be Less Than or Equal To "+prodquan);
    return false;
  }
  return true;
}


function checkIndex(CartArray,id,username)
{
  for(var i=0;i<CartArray.length;i++)
  {
    if(CartArray[i].UserId==username && CartArray[i].Prodid == id)
    {
      return i;
    }
  }
  return -1;
}


function storeProducts(CartArray)
{
localStorage.cartProduct=JSON.stringify(CartArray);
}



function check()
{
  if(userArray.length==0)
  {
    alert("You must Login first.");
    location.href="login.html";
  }
  else
  {
    if(!checkUser(userArray[0].username))
    {
       alert("Please Select Some Product First !");
    }
    else
    {
  var temp=JSON.parse(localStorage.cartProduct);
    if(temp.length!=0)
    {
      for(var i=0;i<temp.length;i++)
      {
        if(!CartArray.includes(temp[i])){
        CartArray.push(temp[i]);
        console.log(temp[i]);}
      }
    }
    console.log(CartArray);
    storeProducts(CartArray);
    console.log(retrievedArray);
    location.href="CartProducts.html";
    }
 }
}


function getProductIndex(id)
{
  for(var i=0;i<retrievedArray.length;i++)
  {
    if(retrievedArray[i].Prodid==id)
    return i;
  }
  return 0;
}
function loggedIn()
{
  var h2=document.createElement("h2");
  h2.innerHTML="Hello "+userArray[0].name+"";
  h2.setAttribute("style","font-size:1.9em;")
  var div1=document.createElement("div");
  div1.setAttribute("style","padding:10px;");
  div1.setAttribute("style","display:inline-block;");
  div1.append(h2);
  var h1=document.createElement("h1");
  h1.setAttribute("style","font-size:2.2em;")
  h1.innerHTML="|";
  var div2=document.createElement("div");
  div2.setAttribute("style","display:inline-block;");
  div2.append(h1);
  var anchor=document.createElement("A");
  var text=document.createTextNode("Logout");
  anchor.appendChild(text);
  anchor.setAttribute("href","login.html");
  anchor.setAttribute("style","font-size:1.5em;");
  anchor.addEventListener("click",function(){
  sessionStorage.logarray=JSON.stringify([]);
  });
  var div3=document.createElement("div");
  div3.setAttribute("style","display:inline-block;");
  div3.append(anchor);
  showname.append(div1);
  showname.append(div2);
  showname.append(div3);
}



function checkUser(username)
{
  for(var i=0;i<CartArray.length;i++)
  {
    if(CartArray[i].UserId==username)
    {
      return true;
    }
  }
  return false;
}
