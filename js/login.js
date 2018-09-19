/* event listeners */
document.getElementById("signup-form").addEventListener("submit", registeruser);
//Global vars

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