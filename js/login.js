document.getElementById("sign-btn").addEventListener("click", function(){
     const inputUser = document.getElementById("input-user");
     const userName = inputUser.value 
     
     const inputPassword = document.getElementById("input-password")
     const password = inputPassword.value;
     
     if(userName == "admin" && password == "admin123"){
         alert("login Successful")
         window.location.assign("./home.html")
     }else{
        alert("long Failed")
     }
})