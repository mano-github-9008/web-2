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

//  toggle hamburger menu
function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("active");
}

function toggleDropdown(event) {
  event.preventDefault();
  const dropdownMenu = event.target.nextElementSibling;
  dropdownMenu.classList.toggle("active");
}

// Close dropdowns when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.classList.remove('active');
      });
  }
});


window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader--hidden");
  
    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
    });
  });

  const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  modeToggle = document.querySelector(".dark-light"),
  searchToggle = document.querySelector(".searchToggle");

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


// files section
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

// sliders
let currentIndex = 0;
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const intervalTime = 3000; // Change slides every 3 seconds

function moveSlide() {
    currentIndex++;

    if (currentIndex >= totalSlides) {
        currentIndex = 0; // Reset to the first slide
    }

    updateSlide();
}

function updateSlide() {
    slider.style.transform = `translateX(${-currentIndex * 100}%)`;
}

// Auto slide function
function startAutoSlide() {
    setInterval(moveSlide, intervalTime);
}

// Start the auto-slide when the page loads
startAutoSlide();


    //HOD's Section 

    document.getElementById("toggle-button").addEventListener("click", function() {
      var quoteText = document.getElementById("quote-text");
      var button = document.getElementById("toggle-button");
    
      // Toggle between showing and hiding the extra part of the quote
      quoteText.classList.toggle("show");
    
      // Change button text depending on the state
      if (quoteText.classList.contains("show")) {
        button.textContent = "Read Less";
      } else {
        button.textContent = "Read More";
      }
    });
    
    // Over View
    // Intersection Observer to trigger animation on scroll
const elements = document.querySelectorAll('.animated-text');

const observerOptions = {
  threshold: 0.5  // Trigger when 50% of the element is in view
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view'); // Add class when element is in view
      observer.unobserve(entry.target); // Stop observing after animation
    }
  });
}, observerOptions);

// Observe each animated element
elements.forEach(element => {
  observer.observe(element);
});


// attendance calculator
document.getElementById("csvFile").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  
  reader.onload = function(e) {
      const content = e.target.result;
      const lines = content.split(/\r?\n/).map(line => line.split(','));

      // Assuming CSV structure: Name, Roll Number
      const names = [];
      const rollNumbers = [];

      for (let i = 1; i < lines.length; i++) {  // Skip header
          const [name, rollNumber] = lines[i];
          if (name && rollNumber) {
              names.push(name.trim());
              rollNumbers.push(rollNumber.trim());
          }
      }

      // Populate dropdowns
      populateDropdown(names, rollNumbers);
  };

  reader.readAsText(file);
});

function populateDropdown(names, rollNumbers) {
  const nameSelect = document.getElementById("name");
  const rollNumberSelect = document.getElementById("rollNumber");

  // Clear existing options
  nameSelect.innerHTML = "<option value=''>Select Name</option>";
  rollNumberSelect.innerHTML = "<option value=''>Select Roll Number</option>";

  // Add new options
  names.forEach((name, index) => {
      const nameOption = document.createElement("option");
      nameOption.value = name;
      nameOption.textContent = name;
      nameSelect.appendChild(nameOption);

      const rollNumberOption = document.createElement("option");
      rollNumberOption.value = rollNumbers[index];
      rollNumberOption.textContent = rollNumbers[index];
      rollNumberSelect.appendChild(rollNumberOption);
  });

  // Show the form after CSV is loaded
  document.getElementById("attendance-form").style.display = "block";
}

document.getElementById("attendance-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const rollNumber = document.getElementById("rollNumber").value;
  const totalClasses = parseInt(document.getElementById("totalClasses").value);
  const attendedClasses = parseInt(document.getElementById("attendedClasses").value);

  if (isNaN(totalClasses) || isNaN(attendedClasses)) {
      alert("Please enter valid numbers for both fields.");
      return;
  }

  const attendancePercentage = (attendedClasses / totalClasses) * 100;
  let status = '';
  if (attendancePercentage < 75) {
      status = `Defaulter! Attendance: ${attendancePercentage.toFixed(2)}%`;
  } else {
      status = `Good Standing! Attendance: ${attendancePercentage.toFixed(2)}%`;
  }

  // Display the result
  document.getElementById("status").textContent = `Name: ${name}, Roll Number: ${rollNumber} - ${status}`;
  document.getElementById("result").style.display = "block";
});


function showTab(tabId) {
  // Hide all tab content
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => content.classList.remove('active'));

  // Remove active class from all buttons
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => button.classList.remove('active'));

  // Show the selected tab content
  document.getElementById(tabId).classList.add('active');

  // Set the clicked button as active
  const activeButton = tabButtons[Array.from(tabButtons).findIndex(button => button.textContent === tabId.split('-').join(' ').replace(/(^|\s)[a-z]/g, match => match.toUpperCase()))];
  activeButton.classList.add('active');
}