import getDimensions from './utils/getDimensions.js'
import createRefLinks from "./utils/createRefLinks.js";
import { utzonNarratives } from "../data/utzon.js";
import { gehryNarratives } from "../data/gehry.js";
import mapNarratives from "./utils/mapNarratives.js";




// then, adjust their y position 
// this will differ from chapter to chapter. 
// So I think we should create a separate function 

function mapChapter1() {

    mapNarratives('.chapter1 .utzon', utzonNarratives)
    mapNarratives('.chapter1 .gehry', gehryNarratives, false)
    const narrations = document.querySelectorAll('.chapter1 .narrationWrapper')

    let totalHeight = 0, years = []

    narrations.forEach(el => {
        totalHeight += getDimensions(el).height
        years.push(+el.getAttribute('data-year'))
    })

    const scale = d3.scaleLinear()
        .range([0, totalHeight])
        .domain(d3.extent(years))


    console.log(scale(1935))

    // We need to have a 'scale' function
    // The entire height should be the sum of all the narrativeWrappers heights
    // the range should be the smallest year and the largest year.
}

mapChapter1();

createRefLinks('.references')