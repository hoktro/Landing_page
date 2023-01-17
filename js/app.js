/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
*/

const sections = document.querySelectorAll("section");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isInViewport( currentSection ){
    let position = currentSection.getBoundingClientRect();
    return ( 0 <= position.left && 
            position.right <= ( window.innerWidth || document.documentElement.clientWidth ) &&
            position.top >= -300 &&
            position.bottom <= ( 1.3 * window.innerHeight || document.documentElement.clientHeight ) );
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
window.addEventListener( 'load', buildNavMenu() );


// Add class 'active' to section when near top of viewport
function activeSection() {

    for( const element of sections ) 
        if( isInViewport(element) ) {
            element.classList.add( "your-active-class", "active" );
            element.querySelector("h2").style.color = "black";
        }
        else {
            element.classList.remove( "your-active-class", "active" );
            element.querySelector("h2").style.color = "white";
        }

}


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
function buildNavMenu() {

    let navbar = document.getElementById('navbar__list');

    for( const element of sections ) {
        let newItem = document.createElement("li");
        newItem.classList.add( "navbar__list__item" );
        newItem.innerHTML = `<a href = "#${element.getAttribute("id")}" class = "menu__link">${element.getAttribute("data-nav")}</a>`;
        navbar.appendChild( newItem );
    }
}

// Scroll to section on link click
function scrollToSelection() {
    const navList = document.querySelectorAll(".nav__hyperlink");
    for( const element of navList ) {
        element.addEventListener( 'click', function() { 
            let destination = document.querySelector( element.getAttribute( 'href' ) ).getBoundingClientRect();
            window.scrollTo( { destination, behavior: 'smooth' } );
        } )
    }
}

// Set sections as active
window.addEventListener( 'scroll', activeSection ); // active section whenever scroll the screen

// Auto hide navbar
var myTimeout = setTimeout( hideNavBar, 5000 ); // Auto hide after 5s
const NavBar = document.querySelector('.navbar__menu');

function hideNavBar() { 
    NavBar.style.display = "none";
}

function showNavBar() {
    NavBar.style.display = "block";
}

function resetTimeout() {
    clearTimeout( myTimeout );                      // clear exist timeout
    showNavBar();                                   // show the navbar
    myTimeout = setTimeout( hideNavBar, 5000 );     // set new timeout
}

window.addEventListener( 'scroll', resetTimeout );  // add listener to scroll

// Back to top button

let backButton = document.getElementById('back-to-top');
let nail = document.querySelector('.main__hero');

window.addEventListener( 'scroll', showBackToTopButton );

function showBackToTopButton() {

    let nailPos = nail.getBoundingClientRect();

    if( nailPos.top <= 0 ) backButton.style.display = "block";
    else backButton.style.display = "none";
}
