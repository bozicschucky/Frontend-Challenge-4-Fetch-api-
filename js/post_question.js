/* event listeners */
document.getElementById("post-form").addEventListener("submit", createQuestion);
token = localStorage.getItem("token");

function flash(message, uiClass) {
  // add text
  range = document.createRange();
  div = document.createElement("div");
  newNode = document.createElement("p");
  newNode.className = uiClass;
  newNode.appendChild(document.createTextNode("Question created"));
  div.appendChild(newNode);
  range.selectNode(document.getElementById("post-form"));
  range.insertNode(div);
  //Time out
  setTimeout(() => {
    const currentFlash = document.querySelector("." + uiClass);
    if (currentFlash) {
      currentFlash.remove();
      window.location.href = "questions.html";
    } else {
      console.log("i am not working");
    }
  }, 1000);
}

function createQuestion(e) {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;
  // console.log(username, password);
  data = {
    title: title,
    body: body
  };
  var url = "https://stackoverflowlite2.herokuapp.com/api/v2/questions";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: ` Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log(response);
      flash("Question created", "danger");
    })
    .catch(error => console.error("Error:", error));
}
