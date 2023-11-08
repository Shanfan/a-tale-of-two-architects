let tl = gsap.timeline()

let tweenHeader = tl.to(['.title h1', '.title .before', '.title .after'], {
    y: -50,
    opacity: 0,
    stagger: 0.5,
}, 0).to('.scrollIndicator', {
    opacity: 0
})

ScrollTrigger.create({
    animation: tweenHeader,
    trigger: '.title',
    scroller: '.heroImg',
    start: 'top top',
    end: '+=200',
    scrub: 0,
})

let narrations = gsap.utils.toArray('.narrationWrapper')

narrations.forEach((narration) => {
    tl.from(narration, {
        yPercent: 100,
        opacity: 0,
        scrollTrigger: {
            trigger: narration,
            scroller: '.heroImg',
            start: 'top 100%',
            end: 'top 60%',
            scrub: 0
        }
    })
})