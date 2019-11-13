var userArray=[];
var userId=0;



function signup()
{
  var name=document.getElementById("name").value;
  var username=document.getElementById("Username").value;
  var email=document.getElementById("email").value;
  var password=document.getElementById("Password").value;
  var obj={
    name:name,
    username:username,
    email:email,
    password:password
  }
  var valid=validate(obj);
  console.log(userArray);
  if(valid==1)
  {
    alert("SignUp Successfull");
    location.href="login.html";
  }
}



function validate(obj)
{
  if(obj.name==""||obj.username==""||obj.email==""||obj.password=="")
  {
    alert("Please Fill All The Empty Fields");
    return 0;
  }
  if(obj.password.length<9)
  {
    alert("Password Length Must Be Greater Than 8 Characters");
    return 0;
  }
  if(!obj.email.includes("@")||!obj.email.includes(".com"))
  {
    alert("Invalid Email");
    return 0;
  }
  if(userArray.length==0)
  {
    userArray.push(obj);
    console.log(userArray);
    storeProducts(userArray);
    userId++;
    return 1;
  }
  else
  {
    var f=0;
    for(var i=0;i<userArray.length;i++)
    {
      if(userArray[i].username==obj.username)
      {
        f=1;
        break;
      }
    }
    if(f==1)
    {
      alert("Username Already Exist");
      return 0;
    }
    else
    {
      userArray.push(obj);
      userId++;
      console.log(userArray);
      storeProducts(userArray);
      return 1;
    }
  }
}


function storeProducts(CartArray)
{
localStorage.userInfo=JSON.stringify(userArray);
}


function getStoredProducts()
{
if(!localStorage.userInfo)
{
localStorage.userInfo=JSON.stringify([]);
}
else
{
userArray=JSON.parse(localStorage.userInfo);
}}
