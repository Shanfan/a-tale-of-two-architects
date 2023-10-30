import { PersonLifetime } from './utils/mapLifetime.js'
import { layYearMarks, renderWar } from './utils/mapMetaMarks.js'
import utzonData from './data/utzon.json' assert {type: "json"}
import gehryData from './data/gehry.json' assert {type: "json"}

const canvas = document.querySelector('.visCanvas')
const dimension = canvas.getBoundingClientRect()

const scale = d3.scaleLinear()
    .range([0, dimension.height])
    .domain([1912, 2022])

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

gehry.drawPrimeProject()
utzon.drawPrimeProject()


