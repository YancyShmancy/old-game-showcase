// fire a function with each keypress instead of putting
// all of the functionality into each case.

// for moving planets, set variable for value that
// planet will move. This is a ratio (such as 0.4 or 0.68)
// Set another variable for ratio * ship-move distance

// Use second variable for Tween.

var distanceY = 0;
var distanceX = 0;
var $shipElement = document.getElementById('player-ship');
var pressed = false;
var $orangePlanet = document.getElementById('planet-1');
var $whitePlanet = document.getElementById('planet-2');
var $yellowPlanet = document.getElementById('planet-3');
var $bluePlanet = document.getElementById('planet-4');
var height = $(document).height();
var $projects = document.getElementById('projects');
var $aboutMe = document.getElementById('about-me');
var $contact = document.getElementById('contact');
var $instructions = document.getElementById('instructions');

var $ship = {
    el: $shipElement,
    direction: 0,
    x: 50,
    y: 50
};

var CONSTANTS = {
    SPEED: 50,
};

var planets = {
    orange: {
        y: 0,
        speed: 0.6
    },
    
    blue: {
        y: 1200,
        speed: 0.3
    },
    
    white: {
        y: 500,
        speed: 0.8
    },
    
    yellow: {
        y: 800,
        speed: 0.5
    },
};

var modules = {
    station: {
        el: document.getElementById('station')
    },
    projects: {
        el: document.getElementById('projects'),
        x: 100,
        y: 600,
        width: 200,
        height: 500
    },
    aboutMe: {
        el: document.getElementById('about-me'),
        x: (window.innerWidth/10) * 7,
        y: 1000,
        width: 200,
        height: 400
    },
    contact: {
        el: document.getElementById('contact'),
        x: -200,
        y: 1100,
        width: 400,
        height: 200
    }
};

$shipElement.style.top = "70px";
$shipElement.style.left = "50%";
$projects.style.top = "600px";
$projects.style.left = "100px";
$aboutMe.style.top = "1000px";
$contact.style.top = "1500px";


// ------------- FUNCTIONS ------------------------

var clickRight = function(){
    moveShipRight();
    $ship.direction = -90;
    turnShip();
    coordinateCheck();
    setTimeout( function() {
        $ship.x = parseInt($shipElement.style.left);
    }, 1500);
};

var clickLeft = function(){
    moveShipLeft();
    $ship.direction = 90;
    turnShip();
    coordinateCheck();
    setTimeout( function() {
        $ship.x = parseInt($shipElement.style.left);
    }, 1500);
    
};

var clickUp = function(){
    moveShipUp();
    $ship.direction = 180;
    turnShip();
    coordinateCheck();
    setTimeout( function() {
        $ship.y = parseInt($shipElement.style.top);
    }, 1500);
};

var clickDown = function() {
    $ship.direction = 0;
    moveShipDown();
    turnShip();
    coordinateCheck();
    setTimeout( function() {
        $ship.y = parseInt($shipElement.style.top);
    }, 1500);
};

// functions to move ship

var moveShipDown = function() {
    if ($ship.y <= 300) {
        TweenLite.to( $ship.el, 1, { top: '+='+CONSTANTS.SPEED });
    };
    
    // move planets up
    TweenLite.to( $orangePlanet, 1, {top: '-='+(CONSTANTS.SPEED * planets.orange.speed)} );
    TweenLite.to( $whitePlanet, 1, {top: '-='+(CONSTANTS.SPEED * planets.white.speed)} );
    TweenLite.to( $yellowPlanet, 1, {top: '-='+(CONSTANTS.SPEED * planets.yellow.speed)} );
    TweenLite.to( $bluePlanet, 1, {top: '-='+(CONSTANTS.SPEED * planets.blue.speed)} );
    
    // move other ships up
    TweenLite.to( modules.station.el, 1, {top: '-='+CONSTANTS.SPEED} );
    TweenLite.to( modules.projects.el, 1, {top: '-='+CONSTANTS.SPEED} );
    TweenLite.to( modules.aboutMe.el, 1, {top: '-='+CONSTANTS.SPEED} );
    TweenLite.to( modules.contact.el, 1, {top: '-='+CONSTANTS.SPEED} );
    
    // move instructions
    TweenLite.to($instructions, 1, {top: '-='+CONSTANTS.SPEED});
    
    modules.projects.y = parseInt( $projects.style.top );
    modules.aboutMe.y = parseInt( $aboutMe.style.top );
    modules.contact.y = parseInt( $contact.style.top );
};

var moveShipUp = function() {
    if ($ship.y >= 40) {
        TweenLite.to ( $ship.el, 1, { top: '-='+CONSTANTS.SPEED} );
    };
    $ship.y = parseInt($shipElement.style.top);
    
    // move planets down
    TweenLite.to( $orangePlanet, 1, {top: '+='+(CONSTANTS.SPEED * planets.orange.speed)} );
    TweenLite.to( $whitePlanet, 1, {top: '+='+(CONSTANTS.SPEED * planets.white.speed)} );
    TweenLite.to( $yellowPlanet, 1, {top: '+='+(CONSTANTS.SPEED * planets.yellow.speed)} );
    TweenLite.to( $bluePlanet, 1, {top: '+='+(CONSTANTS.SPEED * planets.blue.speed)} );
    
    // move other ships down
    TweenLite.to( modules.station.el, 1, {top: '+='+CONSTANTS.SPEED} );
    TweenLite.to( modules.projects.el, 1, {top: '+='+CONSTANTS.SPEED} );
    TweenLite.to( modules.aboutMe.el, 1, {top: '+='+CONSTANTS.SPEED} );
    TweenLite.to( modules.contact.el, 1, {top: '+='+CONSTANTS.SPEED} );
    
    // move instructions 
    TweenLite.to($instructions, 1, {top: '+='+CONSTANTS.SPEED});
    
};

var moveShipLeft = function() {
    if ($ship.x > 20) {
        TweenLite.to($ship.el, 1, { left: '-='+CONSTANTS.SPEED });
    };
};

var moveShipRight = function() {
    if ($ship.x < (window.innerWidth - 20)) {
        TweenLite.to($ship.el, 1, { left: '+='+CONSTANTS.SPEED });
    };
};

// function to turn ship.
var turnShip = function() {
    TweenMax.to($ship.el, 0.5, {rotation: $ship.direction});
}

// function to check coordinates and fires functions to 
// pull up lightboxes
var coordinateCheck = function() {
    if ($ship.y >= modules.contact.y - 100 && 
        $ship.y <= modules.contact.y + modules.contact.width) {
        TweenLite.to( $ship.el, 2, { 
            top: modules.contact.y - 50
        });
        $ship.direction = 90;
        $('#dock').addClass('active');
        turnShip();
        setTimeout(contactAction, 3000);
    } else if ($ship.x >= modules.projects.x &&
       $ship.x <= modules.projects.x + 300 &&
       $ship.y >= modules.projects.y &&
       $ship.y <= modules.projects.y + 400) {
        TweenLite.to( $ship.el, 2, {
            top: modules.projects.y + 100,
            left: modules.projects.x + 200
        });
        $ship.direction = 180;
        turnShip();
        $('#dock').addClass('active');
        setTimeout(projectLightbox, 3000);
    } else if ($ship.x >= modules.aboutMe.x - 50 &&
              $ship.x <= modules.aboutMe.x + 200 &&
              $ship.y >= modules.aboutMe.y - 200 &&
              $ship.y <= modules.aboutMe.y + 400){
        TweenLite.to( $ship.el, 2, {
            top: modules.aboutMe.y + 50,
            left: modules.aboutMe.x - 50
        });
        $ship.direction = 0;
        turnShip();
        $('#dock').addClass('active');
        
        setTimeout(aboutMeLightbox, 3000);
    } else {
        return false;
    };
};
    

// update module's x properties
// if window is resized  
window.onresize = function() {
    modules.projects.x = parseInt($projects.style.left);
    modules.contact.x = parseInt($contact.style.left);
    modules.aboutMe.x = (window.innerWidth/10) * 7;
};


// switch function for movement
$(document).keydown(function(e) {
    if(!pressed){
        switch (e.which) {
            case 37: 
                clickLeft();
            break;
            case 39:
                clickRight();
            break;
            case 38:
                clickUp();
            break;
            case 40:
                clickDown();
            break;
        }
    }
});


// prevents arrow keys from moving the window
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


// function for creating the lightboxes

var projectLightbox = function() {
    
    $('#projects-lb').addClass('active');
    $('.lb-bg').addClass('active');
    $('body').addClass('stop-scrolling');
    
    $('.lb-bg').on("click", function(){
        $('#projects-lb').removeClass('active');
        $('.lb-bg').removeClass('active');
        $('body').removeClass('stop-scrolling');
        $('#dock').removeClass('active');
        TweenLite.to( $ship.el, 0.1, {
            top: 200,
            left: (window.innerWidth/10) * 5
        });
        
        $ship.direction = 0;
        turnShip();
        
        setTimeout( function(){
            $ship.x = parseInt($shipElement.style.left);
            $ship.y = parseInt($shipElement.style.top);
        }, 1000 );
    }); 
}

var aboutMeLightbox = function() {
    $('#aboutMe-lb').addClass('active');
    $('.lb-bg').addClass('active');
    $('body').addClass('stop-scrolling');
    
    $('.lb-bg').on("click", function(){
        $('#aboutMe-lb').removeClass('active');
        $('.lb-bg').removeClass('active');
        $('body').removeClass('stop-scrolling');
        $('#dock').removeClass('active');
        
        TweenLite.to( $ship.el, 0.1, {
            top: 300,
            left: (window.innerWidth/10) * 5
        });
        
        $ship.direction = 0;
        turnShip();
        
        setTimeout( function(){
            $ship.x = parseInt($shipElement.style.left);
            $ship.y = parseInt($shipElement.style.top);
        }, 1000 );
    }); 
}

var contactAction = function() {
    var timeline = new TimelineLite()
    timeline.to($ship.el, 2, { y:'+=50px', opacity: 0 })
            .to(modules.contact.el, 5, {left:'150%'});
    
    setTimeout($('#contact-info').addClass('active'), 3000);
    $('body').addClass('stop-scrolling');
}

$(window).on('scroll', function(e) {
	e.preventDefault();
})

$('#projects').on('click', projectLightbox);
$('#about-me').on('click', aboutMeLightbox);




                                          
                                          
                                          
                                          
                                          
                                          
                                          
                                          
                                          
                                          
                                          
                                          
                                          