console.log("oui c'est l'animation")

//https://www.youtube.com/watch?v=fR0tHI0nFYk&t=309s

const flightPath =
{
    curviness: 1.25,
    autoRotate: true,
    values: [
        {x: 100, y: -20},
        {x: 300, y: 10},
        {x: 500, y: 100},
        {x: 750, y: -100},
        {x: 350, y: -50},
        {x: 600, y: 100},
        {x: 800, y: 0},
        {x: window.innerWidth, y: -250},
    ]
};

const tween = new TimelineLite();

tween.add(
    TweenLite.to(".timetravel", 1, 
    {
        bezier: flightPath,
        ease: Power1.easeInOut
    })
);

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement: '.animation',
    duration: 1000,
    triggerHook: 0.5
})
.setTween(tween)
.addTo(controller);