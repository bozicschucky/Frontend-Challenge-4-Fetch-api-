let profile = document.querySelector('.user_details')
let questions = document.querySelector('.recent_question')
let most_popular = document.querySelector('.user_most_answers')
let url = 'http://localhost:5000/api/v2/profile'
let token = localStorage.getItem('token')



 fetch(url, {
         method: "GET",
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
             "Authorization": ` Bearer ${token}`
         }
     })
     .then((res) => {
         return res.json();
     })
     .then((response)=> {
            console.log(response)
            username = response['username']
            num_of_questions = response['number_of_questions']
            recent = response['recent']
            
            let user_html = `
                            <div class="user_details">
                                <h2>About ${username}</h2>
                                <p>Num of questions(${num_of_questions})</p>
                            </div>
                        `
            let recent_questions = `
                                <div class="">
                                    <h2 class="user_question_header">Recent  (${num_of_questions}) Questions by ${username}</h2>
                                </div>
                                    `
            recent.forEach( function(element, index) {
                // console.log(element)
                recent_questions += `<p> ${element} </p>`
            });

            profile.innerHTML = user_html
            questions.innerHTML = recent_questions

     })



let top_questions = ` 
                <h2>Top (10) questions asked by User X   with most answers</h2>
                    <p>How to code flask (200 Answers)</p>
                    <p>How to do django development using TDD(100 Answers)</p>
                    <p>How to write code without writing code(50) Answers</p>
                    <p>How to be a python core developer(45) Answers</p>
                    <p>Top tools used by pro developers(40) Answers</p>
                    <p>Modern software development workflows(35) Answers</p>
                    <p>What are the best software practises(20) Answers</p>
                    <p>The best code editor vim or emacs(19) Answers</p>
                    <p>How to write code without writing code(17) Answers</p>
                    <p>How to code react apps (16) Answers</p>
                    <p>Should i use react or vue what's the best(15) Answers</p>
                </h2>
            `

most_popular.innerHTML = top_questions