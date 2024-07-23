export let questions; 

async function generateQuestions(url) {
    try {
        const response = await axios.get(url);
        
        if (!response) {
            throw new Error("Something went wrong. Please try again later.");
        }

        questions = response.data;
        console.log(questions)
        // Check if questions is not null
        if (questions) {
            // Check if the previous questions and if there's any clear them
            localStorage.removeItem("triviaQuestions");

            // I need to use localStorage to store the question to be able to fetch it async
            // after generating a questions
            localStorage.setItem("triviaQuestions", JSON.stringify(questions));
            
            // After the questions has been generated push the user to the other page
            setTimeout(window.location.href = "./pages/quiz.html", 3000); 
        }
        
    } catch (error) {
        console.error(error)
    }
}

const form = document.querySelector(".hero__form--action");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const amount = event.target.questionCount.value;
    const type = event.target.questionType.value;
    const level = event.target.difficulty.value;
    
    const url = configUrl(amount, 18, level, type);
    console.log(url)
    generateQuestions(url)
});

// --------------- Utility funciton for configuring the url -----------------
function configUrl(
    amount, 
    category,
    difficulty, 
    type
) {
    const baseUrl = "https://opentdb.com/api.php";
    const params = [];
  
    // Push amount parameter (always required)
    params.push(`amount=${amount}`);
  
    // Push category parameter (always required)
    params.push(`category=${category}`);
    console.log(amount, difficulty, type)
    // This is an optional  
    if (difficulty !== "all") {
      params.push(`difficulty=${difficulty}`);
    }
  
    // This is an optional
    if (type !== "all") {
      params.push(`type=${type}`);
    }
  
    // Join parameters with "&" separator
    const queryString = params.join("&");
  
    const url = `${baseUrl}?${queryString}`;
  
    return url;
}
