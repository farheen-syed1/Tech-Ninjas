const { results: questions } = JSON.parse(localStorage.getItem("triviaQuestions"));
console.log(questions)


const quizContainerEl = document.querySelector(".quiz__container");
let currentIndexQuestion = 0; // Keep track on the index of the current question
function renderQuestion(q, i) {
    // Question Content
    const questionEl = document.getElementById("quiz-question");
    questionEl.textContent = q.question;

    // Choices Content
    let multiple;

    if (q.type === "multiple") {
        multiple = [q.correct_answer, ...q.incorrect_answers];

        // shuffle the choices
        multiple.sort(() => Math.random() - 0.5);

        const labelIds = ["text_answer_a", "text_answer_b", "text_answer_c", "text_answer_d"];
        const optionIds = ["option_a", "option_b", "option_c", "option_d"]
        multiple.forEach((option, index) => {
            const labelEl = document.querySelector(`.${labelIds[index]}`);
            const optionEl = document.querySelector(`#${optionIds[index]}`);
            optionEl.setAttribute("value", option)
            labelEl.textContent = option;
        })
    }

    if (q.type === "boolean") {
        const optionA = document.getElementById("option_a");
        optionA.value = "True";
        const labelA = document.querySelector(".text_answer_a");
        labelA.textContent = "True";

        const optionB = document.getElementById("option_b");
        optionB.value = "False";
        const labelB = document.querySelector(".text_answer_b");
        labelB.textContent = "False";

        // Hide the other 2 options if the question type is boolean
        document.querySelector(".optionC").style.display = "none";
        document.querySelector(".optionD").style.display = "none";
    } else {
        // Show all options for multiple choice questions
        document.querySelector(".optionC").style.display = "block";
        document.querySelector(".optionD").style.display = "block";
    }

}

// Function for resetting the questions and choices for the next question
function clearContent() {
    const labelIds = ["text_answer_a", "text_answer_b", "text_answer_c", "text_answer_d"];
    const optionIds = ["option_a", "option_b", "option_c", "option_d"]

    labelIds.forEach(id => {
        const labelEl = document.querySelector(`.${id}`);
        labelEl.textContent = '';
        labelEl.removeAttribute("style")
    });
    optionIds.forEach(id => {
        const optionEl = document.querySelector(`#${id}`);
        optionEl.checked = false;
        optionEl.removeAttribute("value");
    });
}

function showCorrectAnswer(correctAnswer) {
    const labelIds = ["text_answer_a", "text_answer_b", "text_answer_c", "text_answer_d"];
    labelIds.forEach(id => {
        const labelEl = document.querySelector(`.${id}`);

        // Apply styles based on the user results
        if (labelEl.textContent === correctAnswer) {
            labelEl.style.color = "#0B6E4F";
        } else {
            labelEl.style.color = "#d62828";
        }
    });
}

function handleNextQuestion() {
    // Clear the previous questions and answers
    clearContent();

    // Increment the questionIndex tally
    currentIndexQuestion++;
    
    // Checks if we still have more questions
    if (currentIndexQuestion < questions.length) {
        renderQuestion(questions[currentIndexQuestion]);
    } else {
        alert("Quiz completed!");
        // Redirect user back to home after quiz completed in 3 secs
        setTimeout(window.location.href = "../landing.html", 3000 )
        
    }
}

function chooseAnswer() {
    const form = document.getElementById("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const correctAnswer = questions[currentIndexQuestion].correct_answer;

        // Call the function to show the correct answer
        showCorrectAnswer(correctAnswer)

        // Set timeout for 3 seconds before the next qustion comes
        setTimeout(handleNextQuestion, 3000);
    })
}

function main() {
    renderQuestion(questions[currentIndexQuestion]);
    chooseAnswer();
}

main();

// https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=boolean
// https://opentdb.com/api.php?amount=20&category=18&difficulty=hard&type=boolean