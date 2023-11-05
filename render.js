// import { PersonLifetime } from './utils/mapLifetime.js'
// import { layYearMarks, renderWar } from './utils/mapMetaMarks.js'
// import utzonData from './data/utzon.json' assert {type: "json"}
// import gehryData from './data/gehry.json' assert {type: "json"}
// import getDimensions from './utils/getDimensions.js'

import createRefLinks from "./utils/createRefLinks.js";


// export const scale = d3.scaleLinear()
//     .range([0, getDimensions('.visCanvas').height])
//     .domain([1912, 2022])

// export const utzonEvents = getEventsData(utzonData)
// export const gehryEvents = getEventsData(gehryData)

// function getEventsData(data) {
//     const events = []
//     events.push(data.birth, data.death, data.pritzker)

//     data.primeProject.events.forEach(d => {
//         events.push({ "year": d.year, "description": d.description })
//     })

//     if (data.secondaryProject) {
//         data.secondaryProject.events.forEach(d => {
//             events.push({ "year": d.year, "description": d.description })
//         })
//     }

//     data.otherEvents.forEach(d => {
//         events.push({ "year": d.year, "description": d.description })
//     })

//     return events
// }

// document.querySelector('.utzon.content p').innerHTML = utzonEvents.find(event => event.year === 1918).description
// document.querySelector('.gehry.content p').innerHTML = gehryEvents.find(event => event.year === 1929).description

// layYearMarks('.visCanvas .left .yearMarks', scale);
// layYearMarks('.visCanvas .right .yearMarks', scale);

// renderWar('.visCanvas .left .wwi', 1914, 1918, scale)
// renderWar('.visCanvas .right .wwi', 1914, 1918, scale)
// renderWar('.visCanvas .left .wwii', 1937, 1945, scale)
// renderWar('.visCanvas .right .wwii', 1937, 1945, scale)

// const utzon = new PersonLifetime(utzonData, '.visCanvas .utzon', scale)
// const gehry = new PersonLifetime(gehryData, '.visCanvas .gehry', scale)

// utzon.drawEvents('prime')
// utzon.drawEvents('other')
// gehry.drawEvents('prime')
// gehry.drawEvents('secondary')
// gehry.drawEvents('other')


createRefLinks('.references')