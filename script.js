document.oncontextmenu = () => {
  alert("Viewing source page is not allowed due to security key ")
  return false
}

 // Check for session variable or referrer (example)
 const allowed = sessionStorage.getItem("isSYStudent");

 if (allowed !== "true") {
   // Not allowed - redirect or block
   document.write("<h1 style='color:red;text-align:center;'>Access Denied</h1>");
   setTimeout(() => {
     window.location.href = "index.html"; // redirect to home or error page
   }, 200);
 }

document.onkeydown = e => {
  if (e.key == "F12") {
    alert("Viewing source page is not allowed due to security key")
    return false
  }
  if (e.ctrlKey && e.key == "u") {
    alert("Don't try to view the source code due to security key")
    return false
  }

  if (e.ctrlKey && e.key == "s") {
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
if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

// js code to toggle dark and light mode
modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");

  // js code to keep user selected mode even page refresh or file reopen
  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");

  } else {
    localStorage.setItem("mode", "dark-mode");

  }
});
// files section


// Show Content on Click
function showContent(id) {
  let sections = document.querySelectorAll(".content-section");
  sections.forEach(section => section.style.display = "none");
  document.getElementById(id).style.display = "block";
}


// toast or notification

function showToast(message) {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000); // Disappear after 3 seconds
}

// sliders
let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('dots');

  // Create dots dynamically
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('#dots span');
  updateSlider();

  function moveSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateSlider();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  function updateSlider() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  }


//HOD's Section 

document.querySelectorAll('.toggle-button').forEach(button => {
  button.addEventListener('click', () => {
    // Find the related read-more content (assumes next sibling)
    const readMore = button.previousElementSibling;
    
    if (readMore.classList.contains('show')) {
      // Hide read more
      readMore.classList.remove('show');
      button.classList.remove('active');
      button.textContent = 'Read More';
    } else {
      // Show read more
      readMore.classList.add('show');
      button.classList.add('active');
      button.textContent = 'Read Less';
    }
  });
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
document.getElementById("csvFile").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
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

document.getElementById("attendance-form").addEventListener("submit", function (event) {
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


  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });
