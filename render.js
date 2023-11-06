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
    const paddingTop = getDimensions(narrations[0]).height / 2
    const narrationGap = 15
    const totalWidth = getDimensions('.chapter1 .visCanvas').width
    let totalHeight = paddingTop + narrationGap * narrations.length, years = []

    narrations.forEach(el => {
        totalHeight += getDimensions(el).height
        years.push(+el.getAttribute('data-year'))
    })

    const scale = d3.scaleLinear()
        .range([0, totalHeight])
        .domain(d3.extent(years))

    const visCanvas = d3.select('.chapter1 .visCanvas').append('svg')
        .attr('width', '100%')
        .attr('height', totalHeight)
        .append('g')
        .style('transform', `translateY(${paddingTop}px)`)


    const utzonLife = visCanvas.append('g').attr('class', 'utzon')
        .style('transform', `translateX(${narrationGap}px)`)


    utzonLife.append('path')
        .attr('d', `M0,${scale(1918)} V${totalHeight - paddingTop}`)
        .attr('stroke-width', '1')

    utzonLife.append('circle')
        .attr('r', 12)
        .attr('cx', 0)
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('cy', scale(1918))

    const gehryLife = visCanvas.append('g').attr('class', 'gehry')
        .style('transform', `translateX(${totalWidth - narrationGap}px)`)

    console.log(totalWidth)

    gehryLife.append('path')
        .attr('d', `M0,${scale(1929)} V${totalHeight - paddingTop}`)
        .attr('stroke-width', '1')

    gehryLife.append('circle')
        .attr('r', 12)
        .attr('cx', 0)
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('cy', scale(1929))

}

mapChapter1();

createRefLinks('.references')