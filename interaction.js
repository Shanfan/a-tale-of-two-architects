const tl = gsap.timeline({
    defaults: { duration: 1, ease: "linear" },
})

let scrollStart = document.querySelector('.mainContent').getBoundingClientRect().top;
let scrollEnd = document.querySelector('.header').getBoundingClientRect().height;

let slideHeader = tl.addLabel("start")
    .to('.header', { height: 0 })
    .to('.nav', { yPercent: -100 }, "<")
    .to('.title h1', { y: -scrollEnd }, "<")

let triggerSlideHeader = ScrollTrigger.create({
    animation: slideHeader,
    trigger: '.mainContent',
    start: `top ${scrollStart}`,
    end: `+=${scrollEnd}`,
    scrub: 1,
})





// .call() // use this call to set isYear T/F

// let timeSplit = tl.addLabel("earlyLife")
//     .to('.visCanvas .right', { y: -scale(1926) })
//     .to('.left .yearMarks', { xPercent: -25, x: '2em' }, '<')
//     .to('.right .yearMarks', { xPercent: 25, x: '-2em' }, '<')
//     .to('.early.career', { opacity: 0.75, duration: 0.5 }, '<1')
//     .addLabel('timeSplit')

// let triggerTimeSplit = ScrollTrigger.create({
//     animation: timeSplit,
//     trigger: '.visCanvas',
//     start: `${scale(1918)} 400`,
//     end: `+=${scale(1937) - scale(1918)}`,
//     scrub: 1,
//     // markers: true,
// })

// let isYear = true
// function updateAnnoucer() { // This still needs to go into scroll event listener
//     const announcer = document.querySelector('.announcer')
//     const headerBottom = document.querySelector('.header').getBoundingClientRect().bottom
//     const canvasTop = canvas.getBoundingClientRect().top
//     const currentYear = Math.round(scale.invert(headerBottom - canvasTop))

//     announcer.textContent = isYear ? currentYear : `Age ${currentYear - 1918}`

//     console.log(isYear)
// }


// tl.to('.mid.career', { opacity: 0.75, duration: 0.1 })
//     .to('.late.career', { opacity: 0.75, duration: 0.1 })
//     .to('.legacy.career', { opacity: 0.75, duration: 0.1 })

// Animation Timeline Planning:
// 1. When header moves up to top, Hero Image shrinks
// 2. with header pinned at top, between 1915~1960: Announcer shows "year"
//    As user scrolls, talk about each architect's upbringing and professional education
// 3. between 1960 ~ 1989: Announcer shows "Age"
//     Two timelines split
// 4. 1960~1973: "early career" Narration focus on the Opera House Saga
// 5. 1973~1989: "mid career" Narration focus on Gehry's experimentation & his winning of Pritzker Prize
// 6. 1990 ~ 2003: Announcer shows "year"
//    Two timelines come back together
//    Disney Concert Hall + BilBao
// 7. 2003~2008: final years
//    2003 Pritzker Price