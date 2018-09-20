    let id = parseInt(localStorage.getItem('id'))
    var url = `http://localhost:5000/api/v2/questions/${id}`;
    token = localStorage.getItem('token')


    fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Authorization": ` Bearer ${token}`
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((response) => {

            question = response.question
            answers = question['answers']
            console.log(answers)
            function answer(answers) {
                answers_array = []
                id_array = []
                for (let i = 0; i < answers.length; i++) {
                    id_array.push(answers[i]['id'])
                    answers_array.push(answers[i]['body'])
                }
                return answers_array
            }
            // answer(answers)
            ans = answer(answers)
            html = `
          <h2> Question details  for question ${id}</h2>
            <div>
            Title:${question['title']} <br>
            Body:${question['body']} <br>
            Author:${question['author']} <br>
            <div class='answers'>
                <form id="answerform">
                    <label for="name"></label>
                    <input type="text" name="name" placeholder = "answer body" id="name" class="answer_input"> <br>
                    <button type="submit" class="btn" id='answersbtn'> post</button>
                </form>
            </div>
            <h3>Answers</h3> <br>
            </div>
                `
                    ans.forEach(function(element) {
                        html += `${element} <br>
            <div>
            <input class='btn' id='answerbtn' type='submit' value='accept'> <br>
            </div>
                            `
            });
            document.getElementById('questions').innerHTML = html;
            btn = document.getElementById('answersbtn')
            console.log(btn)
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                let answer = document.getElementById('name').value
                url = url + '/answers'
                 data = {
                     'body': answer,
                     'accept_status': false
                 }
                fetch(url, {
                     method: 'POST',
                     body: JSON.stringify(data),
                     headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${token}`
                     }
                 }).then(res => res.json())
                   .then( response => {
                        window.location.href='answers.html'
                   })
            })

        });