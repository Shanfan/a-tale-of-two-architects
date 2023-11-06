import getDimensions from './utils/getDimensions.js'
import createRefLinks from "./utils/createRefLinks.js";
import { utzonChapter1, utzonChapter2 } from "../data/utzon.js";
import { gehryChapter1, gehryChapter2 } from "../data/gehry.js";
import mapNarratives from "./utils/mapNarratives.js";


// render function should run on window change, 
// so that all the positioning gets recalculated 


function mapChapter1() {

    // todo: mapNarratives can get written to include both utzon & gehry
    mapNarratives('.chapter1 .utzon', utzonChapter1)
    mapNarratives('.chapter1 .gehry', gehryChapter1)


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

    // Draw SVG life line & circle
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

    gehryLife.append('path')
        .attr('d', `M0,${scale(1929)} V${totalHeight - paddingTop}`)
        .attr('stroke-width', '1')

    gehryLife.append('circle')
        .attr('r', 12)
        .attr('cx', 0)
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('cy', scale(1929))

    // translateY for each narrationWrapper
    const gehryNarrations = document.querySelectorAll('.chapter1 .gehry .narrationWrapper')
    gehryNarrations.forEach(el => {
        const year = +el.getAttribute('data-year')
        const dist = scale(year) - getDimensions(el).height / 2 + paddingTop
        el.style.setProperty('transform', `translateY(${dist}px)`)
    })


    const utzonNarrations = document.querySelectorAll('.chapter1 .utzon .narrationWrapper')
    utzonNarrations.forEach(el => {
        el.classList.add('narrationWrapperLeft');
        const year = +el.getAttribute('data-year')
        const dist = scale(year) - getDimensions(el).height / 2 + paddingTop

        el.style.setProperty('transform', `translateY(${dist}px)`)
    })

}

mapChapter1();

createRefLinks('.references')