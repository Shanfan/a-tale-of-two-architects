import { PersonLifetime } from './utils/mapLifetime.js'
import { layYearMarks, renderWar } from './utils/mapMetaMarks.js'
import utzonData from './data/utzon.json' assert {type: "json"}
import gehryData from './data/gehry.json' assert {type: "json"}
import getDimensions from './utils/getDimensions.js'


export const scale = d3.scaleLinear()
    .range([0, getDimensions('.visCanvas').height])
    .domain([1912, 2022])

export const utzonEvents = getEventsData(utzonData)
export const gehryEvents = getEventsData(gehryData)

function getEventsData(data) {
    const events = []
    events.push(data.birth, data.death, data.pritzker)

    data.primeProject.events.forEach(d => {
        events.push({ "year": d.year, "description": d.description })
    })

    if (data.secondaryProject) {
        data.secondaryProject.events.forEach(d => {
            events.push({ "year": d.year, "description": d.description })
        })
    }

    data.otherEvents.forEach(d => {
        events.push({ "year": d.year, "description": d.description })
    })

    return events
}


layYearMarks('.visCanvas .left .yearMarks', scale);
layYearMarks('.visCanvas .right .yearMarks', scale);

renderWar('.visCanvas .left .wwi', 1914, 1918, scale)
renderWar('.visCanvas .right .wwi', 1914, 1918, scale)
renderWar('.visCanvas .left .wwii', 1937, 1945, scale)
renderWar('.visCanvas .right .wwii', 1937, 1945, scale)

// renderCareerMark('.early.career', 1952)
// renderCareerMark('.mid.career', 1967)
// renderCareerMark('.late.career', 1985)
// renderCareerMark('.legacy.career', 2000)

const utzon = new PersonLifetime(utzonData, '.visCanvas .utzon', scale)
const gehry = new PersonLifetime(gehryData, '.visCanvas .gehry', scale)

utzon.drawEvents('prime')
utzon.drawEvents('other')
gehry.drawEvents('prime')
gehry.drawEvents('secondary')
gehry.drawEvents('other')


