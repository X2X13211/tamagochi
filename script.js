"use strict"; 

let hunger = 50; 
let happiness = 50; 
let health = 50; 
let thirst = 50; 

let gameRunning = true; 

updateScreen(); 

function doAction(action) {
    if (!gameRunning) return; 
    
    switch(action) {
        case "feed": 
            let hungerDown = Math.floor(Math.random() * 6) + 10;
            hunger = Math.max(0, hunger - hungerDown); 
            happiness = Math.max(0, happiness - 5);
            addToChat("Xan", "Yummy! Thanks for the food!");
        break; 
        
        case "play": 
            let happinessUp = Math.floor(Math.random() * 6) + 10;
            happiness = Math.min(100, happiness + happinessUp);
            hunger = Math.min(100, hunger + 5);
            addToChat("Xan", "Wow! Playing is so much fun!");
        break; 

        case "sleep": 
            let healthUp = Math.floor(Math.random() * 6) + 15;
            health = Math.min(100, health + healthUp);
            hunger = Math.min(100, hunger + 5);
            addToChat("Xan", "Zzz... Good night!");
        break;
        
        case "drink":
            let thirstUp = Math.floor(Math.random() * 6) + 10; 
            thirst = Math.min(100, thirst + thirstUp); 
            hunger = Math.min(100, hunger + 3);
            addToChat("Xan", "Thanks for water!"); 
        break; 
    }
    timePasses();
    checkGameOver();
    updateScreen();
}

function timePasses() {
    if (hunger + 5 < 100) {
        hunger = hunger + 5; 
    }else {
        hunger = 100;
    }
    if (happiness - 5 > 0 && health - 5 > 0 && thirst -5 > 0) {
        happiness = happiness -5; 
        health = health -5; 
        thirst = thirst -5; 
    }else {
        happiness = 0;
        health = 0; 
        thirst = 0; 
    }
}

setInterval(function() {
    if (gameRunning) {
        timePasses();
        checkGameOver();
        updateScreen();
    }
}, 10000)

function checkGameOver() {
    if (hunger >= 100 || happiness <= 0 || health <= 0 || thirst <= 0) {  
        gameRunning = false; 
        addToChat("Xan", "💀Game over!");
    }
}

function addToChat(who, text) {
    let chatBox = document.getElementById('chatMessages');
    let messageDiv = document.createElement('div');
    
    messageDiv.innerHTML = '<strong>' + who + ':</strong> ' + text;
    messageDiv.className = 'message xan-message';
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function exitGame() {
    gameRunning = false;
    addToChat("Xan", "Goodbye! Thanks for playing!");
}

function updateScreen() {
    document.getElementById('hungerText').textContent = hunger + '%';
    document.getElementById('happinessText').textContent = happiness + '%';
    document.getElementById('healthText').textContent = health + '%';
    document.getElementById('thirstText').textContent = thirst + '%';
}

function sendMessage() {
    let userInput = document.getElementById('UserInput'); 
    let message = userInput.value.trim();

    if (message === '') return; 

    addToChat("You", message);
    userInput.value = ''; 

    happiness = Math.min(100, happiness + 10);
    updateScreen();

    let answers = [
        "That is interesting!",
        "Tell me more!", 
        "I love talking with you!",
        "Wow, So cool!",
        "Thanks for chatting!",
        "I'm listening!",
        "That's awesome!",
        "Nice!",
        "Really?",
        "I think so too!"
    ]; 

    let randomAnswer = answers [Math.floor(Math.random() * answers.length)]; 
    addToChat("Xan", randomAnswer); 

}



