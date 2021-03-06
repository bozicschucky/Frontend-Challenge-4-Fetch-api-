let id = parseInt(localStorage.getItem("id"));
let url = `https://stackoverflowlite2.herokuapp.com/api/v2/questions/${id}`;
const token = localStorage.getItem("token");
const currentUser = localStorage.getItem("current_user");

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

    question = response.question;
    answers = question["answers"];

    function answer(answers) {
      answers_array = [];
      id_array = [];
      for (let i = 0; i < answers.length; i++) {
        id_array.push(answers[i]["id"]);
        answers_array.push(answers[i]["body"]);
      }
      return answers_array;
    }
    ans = answer(answers);
    if (currentUser == question["author"]) {
      html = `
                  <h2> Question details  for question ${id}</h2>
                    <div>
                    Title:${question["title"]} <br>
                    Body:${question["body"]} <br>
                    Author:${question["author"]} <br>
                    <div class='answers'>
                        <form id="answerform">
                            <label for="name"></label>
                            <input type="text" name="name" placeholder = "answer body" id="name" class="answer_input"> <br>
                            <button type="submit" class="btn" id='answersbtn'> post</button>
                        </form>
                    </div>
                    <h3>Answers</h3> <br>
                    </div>
                        `;
      for (let i = 0; i < ans.length; i++) {
        if (answers[i]["status"] == true) {
          html += `${ans[i]} by<b> ${answers[i]["author"]}</b><br>
                                <input class='btn' id=${
                                  id_array[i]
                                } type='submit' value='accepted' style='background-color:black;color:white;'> <br>

                                        `;
        } else {
          html += `${ans[i]} by<b> ${answers[i]["author"]}</b><br>
                                <input class='btn btn-ans' id=${
                                  id_array[i]
                                } type='submit' value='accept'> <br>
                                        `;
        }
      }
    } else {
      html = `
                  <h2> Question details  for question ${id}</h2>
                    <div>
                    Title:${question["title"]} <br>
                    Body:${question["body"]} <br>
                    Author:${question["author"]} <br>
                    <div class='answers'>
                        <form id="answerform">
                            <label for="name"></label>
                            <textarea type="text" name="name" placeholder = "answer body" id="name" class="answer_input"></textarea> <br>
                            <button type="submit" class="btn" id='answersbtn'> post</button>
                        </form>
                    </div>
                    <h3>Answers</h3> <br>
                    </div>
                        `;
      for (let i = 0; i < ans.length; i++) {
        if (answers[i]["status"] == true) {
          html += `${ans[i]} by<b> ${answers[i]["author"]}</b><br>
                                <input class='btn btn-accept' id=${
                                  id_array[i]
                                } type='submit' value='accepted' style='background-color:black;color:white;'>
                                 <input class='btn' id=${id_array[i]} type='submit' value='update'> <br>`;

                                        ;

        } else {
          html += `${ans[i]} by<b> ${answers[i]["author"]}</b><br>
                    <input class='btn' id=${id_array[i]} type='submit' value='update'> <br>`;
        }
      }
    }

    document.getElementById("questions").innerHTML = html;
    btn = document.getElementById("answersbtn");
    btn.addEventListener("click", e => {
      e.preventDefault();
      let answer = document.getElementById("name").value;
      let id = parseInt(localStorage.getItem("id"));
      let url = `https://stackoverflowlite2.herokuapp.com/api/v2/questions/${id}` + "/answers";
      data = {
        body: answer,
        accept_status: false
      };
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(response => {
          window.location.href = "answers.html";
        });
    });

    if (currentUser == question["author"]) {
      acceptbtn = document.querySelector(".question");
      acceptbtn.addEventListener("click", e => {
        e.preventDefault();
        if (e.target && e.target.nodeName == "INPUT") {
          question_id = parseInt(localStorage.getItem("id"));
          ans_id = parseInt(e.target.attributes.getNamedItem("id").value);
          url = `https://stackoverflowlite2.herokuapp.com/api/v2/questions/${question_id}/answers/${ans_id}`;
          data = {
            body:
              "You should watch alot of motivational videos and listen to reggae music",
            accept_status: true
          };
          fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          })
            .then(res => res.json())
            .then(response => {
              window.location.href = "answers.html";
            });
        }
      });
    } else {
      acceptbtn = document.querySelector(".question");
      acceptbtn.addEventListener("click", e => {
        e.preventDefault();
        if (e.target && e.target.nodeName == "INPUT") {
          btnAccept = document.querySelectorAll(".btn-accept");
          for (let i = 0; i < btnAccept.length; i++) {
            btnAccept[i].disabled = true;
          }

          question_id = parseInt(localStorage.getItem("id"));
          ans_id = parseInt(e.target.attributes.getNamedItem("id").value);
          url = `https://stackoverflowlite2.herokuapp.com/api/v2/questions/${question_id}/answers/${ans_id}`;
          var modal = document.getElementById("myModal");
          var span = document.getElementsByClassName("close")[0];
          modal.style.display = "block";

          //close model when the span is clicked
          span.onclick = e => {
            modal.style.display = "none";
          };

          // When the user clicks anywhere outside of the modal, close it
          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          };

          // handle the event for answer submission
          ansBtn = document.getElementById("answerupdate");
          ansBtn.addEventListener("click", () => {
            console.log("submited some random shit");
            let body = document.getElementById("answerinput").value;

            data = {
              body: body,
              accept_status: false
            };

            fetch(url, {
              method: "PUT",
              body: JSON.stringify(data),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            })
              .then(res => res.json())
              .then(response => {
                console.log(response);
                window.location.href = "answers.html";
              });
          });
        }
      });
    }
  });
