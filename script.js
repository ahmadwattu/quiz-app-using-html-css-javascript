const questions = [
    {
        question: "which is largest animal in the world?",
        answers:[
            {text: "shark", correct: false},
            {text: "blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "which is the smallest country in the world?",
        answers: [
            {text:"Vatican city", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]
    },
    {
        question: "which is the largest desert in the world?",
        answers:[
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },
    {
        question: "which is the smallest continent in the world?",
        answers:[
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    }

];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "next";
    showQuestion();
}

function showQuestion(){

    restState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        // calling answers true or false values 
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        // adding event listener, when we click on button it call the select answer's function
        button.addEventListener("click", selectAnswer)
    });
}

// function to remove previos data

function restState(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// function to select answer

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        // increasing score if it's correct
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    // here all buttons gets selected but we want to one button to get selected and others being
    // disabled, so for that we are adding array which look for true value and if not then it disabled others also show next button.

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
            
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    restState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play again!";
    nextBtn.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

// adding event for nextbtn

nextBtn.addEventListener("click", () => {
   // if questions length is less than 4 we will add function to handle next button otherwise start quiz.
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();