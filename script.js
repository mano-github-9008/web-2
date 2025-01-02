document.oncontextmenu = () =>{
  alert("Viewing source page is not allowed due to security key ")
  return false
}

document.onkeydown = e =>{
  if(e.key == "F12"){
      alert("Viewing source page is not allowed due to security key")
      return false
  }
  if(e.ctrlKey && e.key=="u"){
      alert("Don't try to view the source code due to security key")
      return false
  }

  if(e.ctrlKey && e.key=="s"){
      alert("You are not allowed to save this file")
      return false
  }
}

const notifications = document.querySelector(".notifications"),
buttons = document.querySelectorAll(".buttons .btn");

// Object containing details for different types of toasts
const toastDetails = {
    timer: 5000,
    success: {
        icon: 'fa-circle-check',
        text: 'Success: This is a success toast.',
    },
    error: {
        icon: 'fa-circle-xmark',
        text: 'Error: This is an error toast.',
    },
    warning: {
        icon: 'fa-triangle-exclamation',
        text: 'Warning: This is a warning toast.',
    },
    info: {
        icon: 'fa-circle-info',
        text: 'Not yet Uploaded !',
    }
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
}

const createToast = (id) => {
    // Getting the icon and text for the toast based on the id passed
    const { icon, text } = toastDetails[id];
    const toast = document.createElement("li"); // Creating a new 'li' element for the toast
    toast.className = `toast ${id}`; // Setting the classes for the toast
    // Setting the inner HTML for the toast
    toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    notifications.appendChild(toast); // Append the toast to the notification ul
    // Setting a timeout to remove the toast after the specified duration
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

// Adding a click event listener to each button to create a toast when clicked
buttons.forEach(btn => {
    btn.addEventListener("click", () => createToast(btn.id));
});


window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader--hidden");
  
    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
    });
  });
  window.addEventListener("load", () => {
    const loader = document.querySelector(".loader2");
  
    loader.classList.add("loader--hidden");
  
    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
    });
  });
  const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  modeToggle = document.querySelector(".dark-light"),
  searchToggle = document.querySelector(".searchToggle"),
  sidebarOpen = document.querySelector(".sidebarOpen"),
  siderbarClose = document.querySelector(".siderbarClose");

  let getMode = localStorage.getItem("mode");
      if(getMode && getMode === "dark-mode"){
        body.classList.add("dark");
      }

// js code to toggle dark and light mode
  modeToggle.addEventListener("click" , () =>{
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");

    // js code to keep user selected mode even page refresh or file reopen
    if(!body.classList.contains("dark")){
        localStorage.setItem("mode" , "light-mode");       
       
    }else{
        localStorage.setItem("mode" , "dark-mode");
        
    }
  });


    

  
//   js code to toggle sidebar
sidebarOpen.addEventListener("click" , () =>{
nav.classList.add("active");
});

body.addEventListener("click" , e =>{
let clickedElm = e.target;

if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
    nav.classList.remove("active");
}
});

setInterval(function(){
  const clock = document.querySelector(".display");
  let time = new Date();
  let sec = time.getSeconds();
  let min = time.getMinutes();
  let hr = time.getHours();
  let day = 'AM';
  if(hr > 12){
    day = 'PM';
    hr = hr - 12;
  }
  if(hr == 0){
    hr = 12;
  }
  if(sec < 10){
    sec = '0' + sec;
  }
  if(min < 10){
    min = '0' + min;
  }
  if(hr < 10){
    hr = '0' + hr;
  }
  clock.textContent = hr + ':' + min + ':' + sec + " " + day;
});

// Example to add animation on time change
function updateTime() {
  const timeDisplay = document.querySelector('.clock .display');
  timeDisplay.classList.add('change-time');

  // Remove the class after the animation to allow it to re-trigger
  setTimeout(() => {
    timeDisplay.classList.remove('change-time');
  }, 500); // Match the duration of the animation
}


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

var Acc = document.getElementsByClassName("Accordion");
var i;

for (i = 0; i < Acc.length; i++) {
  Acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var paneL = this.nextElementSibling;
    if (paneL.style.display === "block") {
      paneL.style.display = "none";
    } else {
      paneL.style.display = "block";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("introVideo");

  // Attempt to autoplay with sound
  video.play().catch(error => {
      console.warn("Autoplay with sound was blocked by the browser:", error);

      // Fallback: Mute the video and retry autoplay
      video.muted = true;
      video.play().then(() => {
          console.log("Autoplay with muted video succeeded.");
      }).catch(err => {
          console.error("Autoplay failed even after muting:", err);
      });
  });
});
