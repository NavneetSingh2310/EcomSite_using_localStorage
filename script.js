var ProdArray=[];
var ProdId=0;
var currentId=0;
var temp=1;
var targetParent;
var editParent;
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var aAddProduct = document.getElementById("aAddProduct");

aAddProduct.addEventListener("click",function(){
  createNewProductPanel();
  aAddProduct.setAttribute("style","visibility:hidden");
});

function createNewProductPanel()
{
  if(temp==1)
  {
  temp=0;

  var h2=document.createElement("h2");
  h2.setAttribute("id","h2");
  h2.innerHTML="Enter Product Details!"

  var div1=document.createElement("div");
  div1.setAttribute("id","div1");
  var ProdName=document.createElement("input");
  ProdName.setAttribute("id","ProdName");
  ProdName.setAttribute("placeholder","Enter Product Name");
  div1.appendChild(ProdName);
  insertBlankLine(div1);
  insertBlankLine(div1);


  var div2=document.createElement("div");
  div2.setAttribute("id","div2");
  var ProdDesc=document.createElement("input");
  ProdDesc.setAttribute("id","ProdDesc");
  ProdDesc.setAttribute("placeholder","Enter Product Desc");
  div2.appendChild(ProdDesc);
  insertBlankLine(div2);
  insertBlankLine(div2);


  var div3=document.createElement("div");
  div3.setAttribute("id","div3");
  var ProdPrice=document.createElement("input");
  ProdPrice.setAttribute("type","number");
  ProdPrice.setAttribute("id","ProdPrice");
  ProdPrice.setAttribute("placeholder","Enter Product Price");
  div3.appendChild(ProdPrice);
  insertBlankLine(div3);
  insertBlankLine(div3);

 var div4=document.createElement("div");
 div4.setAttribute("id","div4");
 var ProdQuan=document.createElement("input");
 ProdQuan.setAttribute("type","number");
 ProdQuan.setAttribute("id","ProdQuan");
 ProdQuan.setAttribute("placeholder","Enter Product Quantity");
 div4.appendChild(ProdQuan);
 insertBlankLine(div4);
 insertBlankLine(div4);

var div5=document.createElement("div");
div5.setAttribute("id","div5");
var submitButton=document.createElement("button");
submitButton.setAttribute("id","submitButton");
submitButton.setAttribute("style","margin-left:5px");
submitButton.innerHTML="Submit";
submitButton.addEventListener("click",function()
{
  var flag=validation();
  if(flag==true){
  addProducttoArray();
   }
   else
   alert("Please Fill All The Empty Fields");
});

var cancelButton=document.createElement("button");
cancelButton.setAttribute("id","cancelButton");
cancelButton.setAttribute("style","margin-left:20px");
cancelButton.innerHTML="Cancel";
cancelButton.addEventListener("click",function(){
removeFields();
});

var saveButton=document.createElement("button");
saveButton.setAttribute("id","saveButton");
saveButton.setAttribute("style","margin-left:20px");
saveButton.setAttribute("style","visibility:hidden");
saveButton.addEventListener("click",function(){
var newObject={
  Prodid:currentId,
  Prodname:document.getElementById("ProdName").value,
  Proddesc:document.getElementById("ProdDesc").value,
  Prodprice:document.getElementById("ProdPrice").value,
  Prodquan:document.getElementById("ProdQuan").value
}
replaceInArray(newObject);
updateDom(newObject);
removeFields();
});
saveButton.innerHTML="Save";
div5.append(submitButton);
div5.append(cancelButton);
div5.append(saveButton);

divAddProduct.append(h2);
divAddProduct.append(div1);
divAddProduct.append(div2);
divAddProduct.append(div3);
divAddProduct.append(div4);
divAddProduct.append(div5);
}
}

function insertBlankLine(divi)
{
  var br=document.createElement("br");
  divi.appendChild(br);
}

function validation()
{
  var prodName=document.getElementById("ProdName").value;
  var prodDesc=document.getElementById("ProdDesc").value;
  var prodPrice=document.getElementById("ProdPrice").value;
  var prodQuan=document.getElementById("ProdQuan").value;
  if(prodName == ""||prodDesc == ""||prodPrice == ""||prodQuan==""){
  return false;}
  else
  return true;
}


function addProducttoArray()
{
  var ProdObject={
  Prodid:ProdId,
  Prodname:document.getElementById("ProdName").value,
  Proddesc:document.getElementById("ProdDesc").value,
  Prodprice:document.getElementById("ProdPrice").value,
  Prodquan:document.getElementById("ProdQuan").value
  }
  ProdArray.push(ProdObject);
  storeProducts(ProdArray);
  addProducttoDOM(ProdObject);
  removeFields();
  ProdId++;
  console.log(JSON.stringify(ProdArray));
}

function removeFields()
{
temp=1;
divAddProduct.removeChild(h2);
divAddProduct.removeChild(div1);
divAddProduct.removeChild(div2);
divAddProduct.removeChild(div3);
divAddProduct.removeChild(div4);
divAddProduct.removeChild(div5);
aAddProduct.setAttribute("style","visibility:visible");
}
function addProducttoDOM(ProdObj)
{
var listdiv1=document.createElement("div");
var prodName=ProdObj.Prodname;
var prodDesc=ProdObj.Proddesc;
var prodprice=ProdObj.Prodprice;
var prodquan=ProdObj.Prodquan;
var label1=document.createElement("LABEL");
var label2=document.createElement("LABEL");
var label3=document.createElement("LABEL");
var label4=document.createElement("LABEL");
label1.innerHTML="ProdName: "+prodName;
label2.innerHTML="ProdDesc: "+prodDesc;
label3.innerHTML="ProdPrice: "+prodprice;
label4.innerHTML="ProdQuantity: "+prodquan;

var editButton=document.createElement("button");
editButton.setAttribute("id","editButton");
editButton.setAttribute("style","margin-left:3px");
editButton.setAttribute("style","margin-top:5px");
editButton.innerHTML="Edit";

var deleteButton=document.createElement("button");
deleteButton.setAttribute("id","deleteButton");
deleteButton.setAttribute("style","margin-top:5px");
deleteButton.setAttribute("style","margin-left:10px");
deleteButton.innerHTML="Delete";

listdiv1.append(label1);
insertBlankLine(listdiv1);
listdiv1.append(label2);
insertBlankLine(listdiv1);
listdiv1.append(label3);
insertBlankLine(listdiv1);
listdiv1.append(label4);
insertBlankLine(listdiv1);
listdiv1.append(editButton);
listdiv1.append(deleteButton);
insertBlankLine(listdiv1);
insertBlankLine(listdiv1);
divListProducts.append(listdiv1);
console.log(ProdArray);
editButton.addEventListener("click",function(){
editFunction(prodName,prodDesc,prodprice,prodquan,ProdObj);
});

deleteButton.addEventListener("click",function(){
deleteFunction(ProdObj);
});
}


function removeFromProductsArray(id)
{
  ProdArray.splice(id,1);
  console.log(ProdArray);
  storeProducts(ProdArray);
}


function insertDataIntoFields(prodName,prodDesc,prodprice,prodquan)
{
  var name=document.getElementById("ProdName");
  var desc=document.getElementById("ProdDesc");
  var price=document.getElementById("ProdPrice");
  var quantity=document.getElementById("ProdQuan");
  name.value=prodName;
  desc.value=prodDesc;
  price.value=prodprice;
  quantity.value=prodquan;
}


function updateDom(newObj)
{
  var divi=document.createElement("div");
  var prodName=newObj.Prodname;
  var prodDesc=newObj.Proddesc;
  var prodprice=newObj.Prodprice;
  var prodquan=newObj.Prodquan;
  var label1=document.createElement("h2");
  var label2=document.createElement("h3");
  var label3=document.createElement("h3");
  var label4=document.createElement("h3");
  label1.innerHTML="ProdName: "+prodName;
  label2.innerHTML="ProdDesc: "+prodDesc;
  label3.innerHTML="ProdPrice: "+prodprice;
  label4.innerHTML="ProdQuan: "+prodquan;

  var editButton=document.createElement("button");
  editButton.setAttribute("id","editButton");
  editButton.setAttribute("style","margin-left:3px");
  editButton.setAttribute("style","margin-top:5px");
  editButton.innerHTML="Edit";

  var deleteButton=document.createElement("button");
  deleteButton.setAttribute("id","deleteButton");
  deleteButton.setAttribute("style","margin-top:5px");
  deleteButton.setAttribute("style","margin-left:10px");
  deleteButton.innerHTML="Delete";
  divi.append(label1);
  insertBlankLine(divi);
  divi.append(label2);
  insertBlankLine(divi);
  divi.append(label3);
  insertBlankLine(divi);
  divi.append(label4);
  insertBlankLine(divi);
  divi.append(editButton);
  divi.append(deleteButton);
  insertBlankLine(divi);
  insertBlankLine(divi);
  editParent.parentNode.replaceChild(divi,editParent);
  editButton.addEventListener("click",function(){
  editFunction(prodName,prodDesc,prodprice,newObj);
  });
  deleteButton.addEventListener("click",function(){
  deleteFunction(newObj);
  });
}


function getProductIndex(id)
{
  for (var i = 0; i < ProdArray.length; i++)
	{
      if (ProdArray[i].Prodid == id)
			return i;
  }
}


function replaceInArray(newObj)
{
  for(var i=0;i<ProdArray.length;i++)
  {
    if(ProdArray[i].Prodid==newObj.Prodid)
    {
      ProdArray[i]=newObj;
    }
  }
  console.log(ProdArray);
  storeProducts(ProdArray);
}


function storeProducts(ProdArray)
{
console.log(ProdArray);
localStorage.adminproducts=JSON.stringify(ProdArray);
}


/*function getStoredProducts()
{
if(!localStorage.adminproducts)
{
localStorage.adminproducts=JSON.stringify([]);
}
else
{
ProdArray=JSON.parse(localStorage.adminproducts);
ProdId=ProdArray[ProdArray.length-1].Prodid+1;
console.log(ProdId);
for(i=0;i<ProdArray.length;i++)
{
addProducttoDOM(ProdArray[i]);
}
}
}


function editFunction(prodName,prodDesc,prodprice,prodquan,ProdObj)
{
  editParent=event.target.parentNode;
  createNewProductPanel();
  aAddProduct.setAttribute("style","visibility:hidden");
  document.getElementById("submitButton").setAttribute("style","visibility:hidden");
  document.getElementById("cancelButton").setAttribute("style","visibility:hidden");
  document.getElementById("saveButton").setAttribute("style","visibility:visible");
  insertDataIntoFields(prodName,prodDesc,prodprice,prodquan);
  currentId=ProdObj.Prodid;
}


function deleteFunction(ProdObj)
{
  targetParent = event.target.parentNode;
  console.log(ProdObj.Prodid);
  removeFromProductsArray(getProductIndex(ProdObj.Prodid));
  targetParent.parentNode.removeChild(targetParent);
}
*/