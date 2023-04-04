// Random Quote API URL
const quoteURL = "https://api.quotable.io/random?minLength=80&maxLength=100";

const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

// Display random quotes
const renderNewQuote = async () => {
    const response = await fetch(quoteURL);
    let data = await response.json();
    quote = data.content;

    let arr = quote.split("").map((value) => {
        return "<span class='quote-chars'>" + value + "</span>";
    });

    quoteSection.innerHTML += arr.join("");
}

// Start Test
const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timerReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
};

// Logic for comparing the inputs from the given quote
userInput.addEventListener("input", () => {
    let quoteChars =  document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);
    let userInputChars = userInput.value.split("");
    quoteChars.forEach((char, index) => {
        if(char.innerText == userInputChars[index]) {
            char.classList.add("success")
        } else if(userInputChars[index] ==  null){
            if(char.classList.contains("success")){
                char.classList.remove("success");
            }
            else {
                char.classList.remove("fail");
            }
        }
        else{
            if(!char.classList.contains("fail")){
                mistakes += 1;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerHTML =  mistakes;
        }

        // Return true if entered values are correct
        let check = quoteChars.every(element => {

            return element.classList.contains("success");
        });
        if(check){
            displayResults();
        }

    });
});


// Sets time
const timerReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
}

// Update timer on screen
function updateTimer(){
    if(time == 0){
        displayResults();
    } else {
        document.getElementById("timer").innerHTML = --time + "s";
    }
}


// End test
const displayResults = () => {
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if(time != 0){
        timeTaken = (60 -time) / 100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + " wpm";
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";
};


window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
}