// Check if there is Local Storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null){
    document.documentElement.style.setProperty('--main-color',mainColors);

    // remove active class from all li s
    document.querySelectorAll(".colors-list li").forEach(ele =>{
        ele.classList.remove("active");

        // add active class on element with data-color === Local Storage item
        if (ele.dataset.color === mainColors){
            // Add active class
            ele.classList.add("active")
        }
    });
}

// Randnom background option
let backgroundOption = true;

// Variable to contol the Interval
let backgroundInterval;

// Check if there's Local Storage random background item
let backgroundLoaclItem = localStorage.getItem("background_option");

if(backgroundLoaclItem !== null){

    if(backgroundLoaclItem === 'true'){
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    // remove active class from all li s
    document.querySelectorAll(".random-bacgrounds span").forEach(element =>{
        element.classList.remove("active");

    });
    if(backgroundLoaclItem === 'true'){

        document.querySelector(".random-bacgrounds .yes").classList.add("active");

    } else {
        document.querySelector(".random-bacgrounds .no").classList.add("active");
    }
}

// Toggle Class on icon
document.querySelector(".icon-box .fa-gear").onclick = function() {
    // Toggle Class spin
    this.classList.toggle("fa-spin");
    // Toggle Class open
    document.querySelector(".settings-box").classList.toggle("open");
}

// Swith colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop on all list items
colorsLi.forEach(li =>{

    // Click on every li
    li.addEventListener("click", (e) =>{

        // Set color on root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

        // Set color on Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        // // remove active class from all li s
        // e.target.parentElement.querySelectorAll(".active").forEach(ele =>{
        //     ele.classList.remove("active");
        // });

        // // Add  active class on self
        // e.target.classList.add("active");

        HandleActive(e);


    })

});

// Swith Random Background
const randomBackground = document.querySelectorAll(".random-bacgrounds span");

// Loop on all spans
randomBackground.forEach(span =>{

    // Click on every span
    span.addEventListener("click", (e) =>{

        // // remove active class from all span
        // e.target.parentElement.querySelectorAll(".active").forEach(ele =>{
        //     ele.classList.remove("active");
        // });

        // // Add  active class on self
        // e.target.classList.add("active");
        HandleActive(e);

        if(e.target.dataset.background === 'yes'){
            
            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option", true);

        } else {
            
            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);

        }

    })

});
// Select landing page element
let landingPage = document.querySelector(".landing-page");

// Get array of imgs
let imgsArray = ["m1.jpg", "m2.jpg", "m3.jpg", "m4.jpg", "m5.jpg"];

// this normal Interval
/* setInterval(() =>{
    // Get random number
    let randomNumber = Math.floor(Math.random() * imgsArray.length);

    // Change backgroung img
    landingPage.style.backgroundImage = 'url("imgs/'+ imgsArray[randomNumber] +'")';

}, 10000); */

// function to randomize imgs
function randomizeImgs() {

    if (backgroundOption === true){

        backgroundInterval = setInterval(() =>{
            // Get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            // Change backgroung img
            landingPage.style.backgroundImage = 'url("imgs/'+ imgsArray[randomNumber] +'")';
        
        }, 10000);

    }

}
randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // Skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    
    // Skills Outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    
    // Window height
    let windowHeight = this.innerHeight;
    
    // Window Scrolltop
    let windowScrollTop = this.pageYOffset;
    
    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })

    }

};

// Create Popup with the images
let ourGallery = document.querySelectorAll(".our-gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {
        // Create Overlay Element
        let overlay = document.createElement("div");

        // Add class to overlay
        overlay.className = 'popup-overlay';

        // Append overlay to the body
        document.body.appendChild(overlay);

        // Create Popup Box
        let popupBox = document.createElement("div");

        // Add class  to the popup box
        popupBox.className = 'popup-box';

        if(img.alt !== null){

            // Create Heading
            let imgHeading = document.createElement("h3");

            // Create Text for Heading
            let imgText = document.createTextNode(img.alt);

            // Append the text to the heading
            imgHeading.appendChild(imgText);

            // Append the heading to the popup box
            popupBox.appendChild(imgHeading);

        }

        //  Create The image
        let popupImage = document.createElement("img");

        // set image source
        popupImage.src = img.src

        // Add image to the popup box
        popupBox.appendChild(popupImage);

        // Append the popup box to the body
        document.body.appendChild(popupBox);
        
        // Create the close Span
        let closeButton = document.createElement("span");

        // Create The close Button text
        let closeButtonText = document.createTextNode("X");

        // append the text to the close button 
        closeButton.appendChild(closeButtonText);

        // add class to close button
        closeButton.className = 'close-button';

        // add close button to the popup box
        popupBox.appendChild(closeButton);
    });

});

// Close popup
document.addEventListener("click", (e) => {

    if(e.target.className == 'close-button'){
        // remove the current popup
        e.target.parentNode.remove();

        // remove overlay 
        document.querySelector(".popup-overlay").remove();

    }

});

// Select All links
const allLinks = document.querySelectorAll(".links a");

// Select All bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");



function SecrollToSomewhere(element){

    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: 'smooth'
    
            });
    
        });
    });

}

SecrollToSomewhere(allBullets);
SecrollToSomewhere(allLinks);

// Handle Active class state
function HandleActive(ev){

     // remove active class from all li s
    ev.target.parentElement.querySelectorAll(".active").forEach(ele =>{
        ele.classList.remove("active");
    });

    // Add  active class on self
    ev.target.classList.add("active");

}


let bulletsSpan = document.querySelectorAll(".show-bullets span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if(bulletLocalItem !== null){
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".show-bullets .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".show-bullets .no").classList.add("active");
    }
}

bulletsSpan.forEach(span =>{

    span.addEventListener("click", (e) => {

        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'none');
        }
        
        HandleActive(e);

    });

})

// reset Button
document.querySelector(".reset-option").onclick = function() {

    // localStorage.clear(); //or
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");

    //reload window
    window.location.reload();
}