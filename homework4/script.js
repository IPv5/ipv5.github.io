const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const questionImage = document.getElementById("questionImage");
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const timeGuage = document.getElementById("timeGuage");
const restart = document.getElementById("restart");


const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");


const progress = document.getElementById("progress");
const scoreContainer = document.getElementById("scoreContainer");

let questions = [{
        question: "Is programming cool?",
        imgSrc: "img/questionimage.jpg",
        choiceA: "What is programming",
        choiceB: "No",
        choiceC: "Yes",
        correct: "C"
    },
    {
        question: "Is grass green?",
        imgSrc: "img/questionimage.jpg",
        choiceA: "I can't tell",
        choiceB: "Yes",
        choiceC: "No",
        correct: "B"
    },
    {
        question: "Is the sun hot?",
        imgSrc: "img/questionimage.jpg",
        choiceA: "Maybe",
        choiceB: "No",
        choiceC: "Yes",
        correct: "C"
    },
    {
        question: "Is water wet?",
        imgSrc: "img/questionimage.jpg",
        choiceA: "No",
        choiceB: "TBH IDK",
        choiceC: "Maybe",
        correct: "B"
    },
    {
        question: "What month is it?",
        imgSrc: "img/questionimage.jpg",
        choiceA: "April",
        choiceB: "January",
        choiceC: "December",
        correct: "A"
    }
];

let lastQuestionIndex = questions.length - 1;
let runningQuestionIndex = 0;

function renderQuestion() {
    let q = questions[runningQuestionIndex];
    questionImage.innerHTML = "<img src=" + q.imgSrc + ">";
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}


function progressRender() {
    for (let qIndex = 0; qIndex <= lastQuestionIndex; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

function answerIsCorrect() {
    document.getElementById(runningQuestionIndex).style.backgroundColor = "green";
    document.getElementById("background").style.backgroundColor = "green";
    document.getElementById("response").innerHTML = "Correct!";
}

function answerIsWrong() {
    document.getElementById(runningQuestionIndex).style.backgroundColor = "red";
    document.getElementById("background").style.backgroundColor = "red";
    document.getElementById("response").innerHTML = "Wrong!";
}

const questionTime = 10;
const guageWidth = 150;
let count = 0;
let score = 0;
const guageProgressUnit = guageWidth / questionTime;

function counterRender() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * guageProgressUnit + "px";
        count++;
    } else {
        count = 0;
        answerIsWrong();
        if (runningQuestionIndex < lastQuestionIndex) {
            runningQuestionIndex++;
            renderQuestion();
        } else {
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer) {
    if (questions[runningQuestionIndex].correct == answer) {
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    count = 0;
    if (runningQuestionIndex < lastQuestionIndex) {
        runningQuestionIndex++;
        renderQuestion();
    } else {
        clearInterval(TIMER);
        scoreRender();
    }
}

start.addEventListener("click", startQuiz);
let TIMER;

function startQuiz() {
    start.style.display = "none";
    counterRender();
    quiz.style.display = "block";
    progressRender();
    renderQuestion();
    TIMER = setInterval(counterRender, 1000);
}

//condition ? value_if_true : value_if_false
function scoreRender() {
    scoreContainer.style.display = "block";
    const scorePercent = Math.round(100 * score / questions.length);
    let img = (scorePercent >= 80) ? "img/5.png" :
        (scorePercent >= 60) ? "img/4.png" :
        (scorePercent >= 40) ? "img/3.png" :
        (scorePercent >= 20) ? "img/2.png" : "img/1.png";

    scoreContainer.innerHTML = "<img src=" + img + ">";
    scoreContainer.innerHTML += "<p>" + scorePercent + "%</p>";
    restart.style.display = "block";
}

restart.addEventListener("click", function() {
    scoreContainer.style.display = "none";
    progress.innerHTML = "";
    count = 0;
    score = 0;
    runningQuestionIndex = 0;
    document.getElementById("background").style.backgroundColor = "#464646";
    document.getElementById("response").innerHTML = "";
    startQuiz();
})