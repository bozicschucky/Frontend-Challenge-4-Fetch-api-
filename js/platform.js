var url = "https://stackoverflowlite2.herokuapp.com/api/v2/questions";
token = localStorage.getItem("token");

function flash(message, uiClass) {
  // add text
  range = document.createRange();
  div = document.createElement("div");
  newNode = document.createElement("p");
  newNode.className = uiClass;
  newNode.appendChild(document.createTextNode("Welcome back user"));
  div.appendChild(newNode);
  range.selectNode(document.getElementById("main_field"));
  range.insertNode(div);
  //Time out
  setTimeout(() => {
    const currentFlash = document.querySelector("." + uiClass);
    if (currentFlash) {
      currentFlash.remove();
    } else {
      console.log("i am not working");
    }
  }, 1000);
}

fetch(url, {
  method: "GET",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: ` Bearer ${token}`
  }
})
  .then(res => {
    return res.json();
  })
  .then(response => {
    flash("all questions", "danger");
    questions = response.platform_questions;

    let ids = [];
    let title = [];
    let body = [];
    let authors = [];

    function get_data(questions) {
      for (let i = 0; i < questions.length; i++) {
        title.push(questions[i]["title"]);
        body.push(questions[i]["body"]);
        ids.push(questions[i]["id"]);
        authors.push(questions[i]["author"]);
      }
    }
    get_data(questions);

    urls = [];
    let html = "<h2>Recent Questions </h2>";
    let answers_html = "";
    for (let i = 0; i < ids.length; i++) {
      html += ` 
              <a href="${url}" id=${ids[i]}>${title[i]}<a/> by <b>${
        authors[i]
      }</b> <br> 
                                            `;
      urls.push(`https://stackoverflowlite2.herokuapp.com/api/v2/questions/${ids[i]}`);
      url = `https://stackoverflowlite2.herokuapp.com/api/v2/questions/${ids[i]}`;
    }

    specific_question = document.getElementById("questions");
    specific_question.onclick = e => {
      e.preventDefault();
      if (e.target && e.target.nodeName == "A") {
        id = parseInt(e.target.attributes.getNamedItem("id").value);
        var url = `https://stackoverflowlite2.herokuapp.com/api/v2/questions/${id}`;
        localStorage.setItem("id", id);
        window.location.href = "answers.html";
      }
    };

    document.getElementById("questions").innerHTML = html;
  });
