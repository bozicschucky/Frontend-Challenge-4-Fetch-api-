/* event listeners */
document.getElementById("signup-form").addEventListener("submit", registeruser);
//Global vars

 function flash(message,uiClass){
    // add text
    range = document.createRange();
    div = document.createElement('div')
    newNode = document.createElement('p')
    newNode.className = uiClass
    newNode.appendChild(document.createTextNode(message));
    div.appendChild(newNode)
    range.selectNode(document.getElementById('main_field')) 
    range.insertNode(div)
    //Time out
    setTimeout(()=>{
        const currentFlash = document.querySelector("."+uiClass);
        if (currentFlash){
            currentFlash.remove()
            window.location.href='login.html'
        }else {
            console.log('i am not working')
        }
    },2000)

 }


function registeruser(e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  console.log(username, password);
  data = {
    'username': username,
    'password': password
  };
  var url = "http://localhost:5000/api/v2/auth/register";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then((response) => {
               message = response
               console.log(message['message'])
               flash(message['message'],'danger')
               
  })
  .catch(error => console.error("Error:", error));
}