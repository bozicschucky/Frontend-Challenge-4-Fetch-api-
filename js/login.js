/* event listeners */
        document.getElementById("login-form").addEventListener("submit", loginuser);

         function flash(message,uiClass){
        // add text
        range = document.createRange();
        div = document.createElement('div')
        newNode = document.createElement('p')
        div.className = uiClass
        newNode.appendChild(document.createTextNode(message));
        div.appendChild(newNode)
        range.selectNode(document.getElementById('main_field')) 
        range.insertNode(div)
        //Time out
        setTimeout(()=>{
            const currentFlash = document.querySelector("."+uiClass);
            if (currentFlash){
                currentFlash.remove()
                window.location.href='questions.html'
            }else {
                console.log('i am not working')
            }
        },2000)

     }

        function loginuser(e) {
            e.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            console.log(username, password);
            data = {
                'username': username,
                'password': password
            };
            var url = "https://stackoverflowlite2.herokuapp.com/api/v2/auth/login";
            fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(response => {
                    token = response.access_token
                    localStorage.setItem('token', token)
                    flash(response.message,'danger')
                })
                .catch(error => console.error("Error:", error));
        }