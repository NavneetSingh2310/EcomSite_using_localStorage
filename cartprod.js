var cartArray=[];
var cartId=0;
var retrieved=[];
var userArray=[];
var cartProducts=document.getElementById("CartProducts");

var flag=0;
function addProducttoDOM(newObj)
{
  retrieved=JSON.parse(localStorage.adminproducts);
  var listdiv1=document.createElement("div");
  listdiv1.setAttribute("id",newObj.Prodid);
  var ind=getProductIndex(newObj.Prodid);
  var prodName=newObj.ProdName;
  var prodDesc=newObj.ProdDesc;
  var prodprice=newObj.Prodprice;
  var prodquan=newObj.ProdQuan;
  var label1=document.createElement("LABEL");
  var label2=document.createElement("LABEL");
  var label3=document.createElement("LABEL");
  var label4=document.createElement("LABEL");
  label1.innerHTML="Product Name: "+prodName;
  label2.innerHTML="Product Desc: "+prodDesc;
  label3.innerHTML="Product Price: "+prodprice;
  if(retrieved[ind].Prodquan>0)
  label4.innerHTML="Product Quantity: "+prodquan;
  else{
  label4.innerHTML="Out of stock !";
  label4.setAttribute("style","color:red;");
  flag++;
      }
  label1.setAttribute("style","font-size:1.5em; font-Family:sans-serif; margin-left:15px;");
  label2.setAttribute("style","font-size:1.5em; font-Family:sans-serif; margin-left:15px;");
  label3.setAttribute("style","font-size:1.5em; font-Family:sans-serif; margin-left:15px;");
  label4.setAttribute("style","font-size:1.5em; font-Family:sans-serif; margin-left:15px;");

  var deleteCart=document.createElement("button");
  deleteCart.innerHTML="Delete Product";
  deleteCart.setAttribute("id","deleteCart");
  deleteCart.setAttribute("style","margin-left:15px");
  deleteCart.setAttribute("style","margin-top:10px");
  deleteCart.setAttribute("style","height:30px; color:white; background-color:grey; font-size: 12px; border:none; margin-left:10px; margin-top:30px;");

  listdiv1.append(label1);
  insertBlankLine(listdiv1);
  listdiv1.append(label2);
  insertBlankLine(listdiv1);
  listdiv1.append(label3);
  insertBlankLine(listdiv1);
  listdiv1.append(label4);
  insertBlankLine(listdiv1);
  listdiv1.append(deleteCart);
  insertBlankLine(listdiv1);
  insertBlankLine(listdiv1);
  insertBlankLine(listdiv1);
  listdiv1.setAttribute("style","border:ridge");
  cartProducts.append(listdiv1);

  deleteCart.addEventListener("click",function(){
    var target=event.target.parentNode;
    var removeId=deleteFormCart(parseInt(target.id),userArray[0].username);
    console.log(removeId);
    removeFromArray(removeId);
    updateDOM(target);
  });
}

function getStoredProducts()
{
if(!localStorage.cartProduct)
{
localStorage.cartProduct=JSON.stringify([]);
}
else
{
cartArray=JSON.parse(localStorage.cartProduct);
for(i=0;i<cartArray.length;i++)
{
var findId=checkId(cartArray[i].UserId);
if(findId==true)
addProducttoDOM(cartArray[i]);
console.log(findId);
}}}


function checkId(username)
{
  for(var i=0;i<userArray.length;i++)
  {
    if(userArray[i].username==username){
    return true;}
  }
  return false;
}


function insertBlankLine(divi)
{
  var br=document.createElement("br");
  divi.appendChild(br);
}


function getIndex(id)
{
  for(var i=0;i<cartArray.length;i++)
  {
    if(cartArray[i].Prodid==id)
    {
      return i;
    }
  }
}

function getProductIndex(id)
{
  for(var i=0;i<retrieved.length;i++)
  {
    if(retrieved[i].Prodid==id)
    return i;
  }
  return 0;
}


function removeFromArray(id)
{
  if(flag!=0)
  flag--;
  cartArray.splice(id,1);
  console.log(cartArray);
  storeProducts(cartArray);
}


function updateDOM(target)
{
  target.parentNode.removeChild(target);
}

function storeProducts(CartArray)
{
localStorage.cartProduct=JSON.stringify(CartArray);
}


function checkOutUser()
{
  if(userArray.length==0)
  {
    alert("You need to Login first.");
    location.href="login.html";
  }
  else
  {
   if(flag!=0)
   {
     alert("First Delete Out Of Stock Products !");
     console.log(retrieved);
   }
   else if(!checkCart(userArray[0].username))
   {
     alert("Your Cart is empty.");
   }
   else if(quanEmpty())
   {
     alert("Some Products Are Out Of Stock !");
     location.href="CartProducts.html";
   }
   else
   {
   console.log(retrieved);
   cartArray=JSON.parse(localStorage.cartProduct);
   for(var i=0;i<cartArray.length;i++)
   {
     console.log(cartArray);
     var g=deleteFormCart(cartArray[i].Prodid,userArray[0].username);
      if(g!=-1){
       var ind=getProductIndex(cartArray[i].Prodid);
       retrieved[ind].Prodquan=retrieved[ind].Prodquan-cartArray[i].ProdQuan;
       cartArray.splice(g,1);
       console.log(cartArray);
       i--;
     }
  }

   console.log(retrieved);
   console.log(cartArray);
   alert("Thankyou For Shopping With Us!");
   localStorage.cartProduct=JSON.stringify(cartArray);
   localStorage.adminproducts=JSON.stringify(retrieved);
   location.href="viewProducts.html";
}
}
}


function deleteFormCart(id,username)
{
  for(var i=0;i<cartArray.length;i++)
  {
     if(cartArray[i].UserId==username && cartArray[i].Prodid==id)
     {
       return i;
     }
  }
  return -1;
}


function getSessionProducts()
{
  if(sessionStorage.logarray)
  userArray=JSON.parse(sessionStorage.logarray);
  console.log(userArray);
}


function continueUser()
{
  location.href="viewProducts.html";
}


function checkCart(username)
{
  for(var i=0;i<cartArray.length;i++)
  {
    if(cartArray[i].UserId==username)
    return true;
  }
  return false;
}



function quanEmpty()
{
  retrieved=JSON.parse(localStorage.adminproducts);
  for(var i=0;i<cartArray.length;i++)
  {
    if(cartArray[i].UserId==userArray[0].username)
    {
      for(var j=0;j<retrieved.length;j++)
      {
        if(retrieved[j].Prodid == cartArray[i].Prodid && retrieved[j].Prodquan<=0)
        {
          return true;
        }
      }
    }
  }
  return false;
}


function totalPrice()
{
  var totalprice=0;
  for(var i=0;i<cartArray.length;i++)
  {
    totalprice=totalprice+(cartArray[i].ProdQuan*cartArray[i].Prodprice);
  }
  var label=document.getElementById("total");
  label.innerHTML="Total Price: "+totalprice;
}
