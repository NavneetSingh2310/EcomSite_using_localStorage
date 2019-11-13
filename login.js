var checkArray=[];
var logInArray=[];
var logId=0;
var flag=0;
function signup()
{
  location.href="signup.html";
}

function login()
{

  var username=document.getElementById("username").value;
  var password=document.getElementById("password").value;
  if(username!=""&&password!="")
  {
    for(var i=0;i<checkArray.length;i++)
    {
      flag=0;
      if(username==checkArray[i].username&&password==checkArray[i].password)
      {
        flag=1;
        logId=i;
        break;
      }
    }
    if(flag==0)
    {
      console.log(checkArray);
      alert("Username Or Password Do Not Match!");
    }
    else
    {
      alert("Login Successfull");
      logInArray.push(checkArray[logId]);
      storeFlag(logInArray);
      location.href="viewProducts.html";
    }
  }
  else
  {
    alert("Fill All The Empty Fields");
  }

}

function storeFlag(logInArray)
{
  sessionStorage.logarray=JSON.stringify(logInArray);
  console.log(logInArray);
}

function getStoredProducts()
  {
  if(!localStorage.userInfo)
  {
  localStorage.userInfo=JSON.stringify([]);
  }
  else
  {
  checkArray=JSON.parse(localStorage.userInfo);
  console.log(checkArray);
  }
}
