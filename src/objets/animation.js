console.log("oui c'est l'animation")

//https://www.youtube.com/watch?v=fR0tHI0nFYk&t=309s

const flightPath =
{
    curviness: 1.25,
    autoRotate: true,
    values: [
        {x: 100, y: 0},
        {x: 150, y: -20},
        {x: 400, y: 10},
        {x: 650, y: 100},
        {x: 850, y: -100},
        {x: 600, y: -50},
        {x: 900, y: -10},
        {x: 1150, y: 100},
        {x: 1550, y: 200},
        {x: 2050, y: 300},
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
    duration: 2000,
    triggerHook: 1
})
.setTween(tween)
.addTo(controller);