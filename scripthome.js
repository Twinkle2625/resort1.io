let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose= document.querySelector('#form-close');
let menu= document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

//backtotop button start

const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 300) { // Show backToTopButton
    if(!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  }
  else { // Hide backToTopButton
    if(backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function() {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

// function backToTop() {
//   window.scrollTo(0, 0);
// }

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;
  
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};
//backtotop btn end


window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active'); 
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
 });

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
 });


formBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
 });

 formClose.addEventListener('click', () => {
    loginForm.classList.remove('active');
 });

 videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src= btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    })
 });

 var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },    
    
 });
 function toggleChatbot() {
  const chatbot = document.getElementById('chat-container');
  const toggleButton = document.getElementById('chatbot-toggle');

  // Toggle the display of the chatbot container
  if (chatbot.style.display === "none" || chatbot.style.display === "") {
    chatbot.style.display = "flex"; // Show the chatbot
    toggleButton.textContent = "Close Chat"; // Change button text
  } else {
    chatbot.style.display = "none"; // Hide the chatbot
    toggleButton.textContent = "Chat with Us"; // Change button text back
  }
}

function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  if (userInput.trim() === "") return; // Prevent empty messages
  
  const chatBox = document.getElementById('chat-box');
  
  // Add user message
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user-message');
  userMessage.textContent = userInput;
  chatBox.appendChild(userMessage);
  
  // Clear the input field
  document.getElementById('user-input').value = '';
  
  // Generate bot response
  const botResponse = generateResponse(userInput);
  
  // Add bot message
  const botMessage = document.createElement('div');
  botMessage.classList.add('message', 'bot-message');
  botMessage.textContent = botResponse;
  chatBox.appendChild(botMessage);
  
  // Scroll chat to bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateResponse(userInput) {
  const responses = {
    "hello": "Hi there! How can I help you?",
    "how are you": "I'm doing great, thank you for asking!",
    "what is your name": "I'm your friendly chatbot.",
    "bye": "Goodbye! Have a great day!",
    "what is the website about?": "The website is about our Golf Resort in Protugal",
    "what is golf?":"Golf is a sport played by many, it includes a hockey stick, golf ball and need of golf course."
  };
  
  // Check if user input matches a predefined response
  const lowerInput = userInput.toLowerCase();
  if (responses[lowerInput]) {
    return responses[lowerInput];
  } else {
    return "I'm sorry, I didn't quite get that. Can you ask something else?";
  }
}
