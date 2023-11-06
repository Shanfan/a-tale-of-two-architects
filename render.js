import getDimensions from './utils/getDimensions.js'
import createRefLinks from "./utils/createRefLinks.js";
import { utzonChapter1, utzonChapter2 } from "../data/utzon.js";
import { gehryChapter1, gehryChapter2 } from "../data/gehry.js";
import mapNarratives from "./utils/mapNarratives.js";

// render function should run on window change, 
// so that all the positioning gets recalculated 

function mapChapter1() {

    // Layout the narrations, so that we can calculate their total height
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
        el.style.setProperty('top', `${dist}px`)

    })

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

    const triUpPath = "M0,0 l10,13.041 l-20,0 l10,-13.041Z"
    const triDownPath = "M0,0l-10,-13.041l20,0l-10,13.041Z"

    utzonLife.append('circle')
        .attr('r', 4)
        .attr('cx', 0)
        .attr('cy', `${scale(1952)}`)

    const utzonEdu = utzonLife.append('g').attr('class', 'education')
        .style('transform', `translateY(${- getDimensions(utzonNarrations[1]).height}px)`)

    utzonEdu.append('path')
        .attr('d', triUpPath)
        .style('transform', `translateY(${scale(1937)}px)`)

    utzonEdu.append('path')
        .attr('d', triDownPath)
        .style('transform', `translateY(${scale(1942)}px)`)

    const gehryEdu = gehryLife.append('g').attr('class', 'education')
        .style('transform', `translateY(${- getDimensions(gehryNarrations[1]).height}px)`)

    gehryEdu.append('path')
        .attr('d', triUpPath)
        .style('transform', `translateY(${scale(1947)}px)`)

    gehryEdu.append('path')
        .attr('d', triDownPath)
        .style('transform', `translateY(${scale(1954)}px)`)
}

function drawVis(chapter, utzonData, gehryData) {
    const parentSelector = "." + chapter

    mapNarratives(parentSelector + ' .utzon', utzonData)
    mapNarratives(parentSelector + ' .gehry', gehryData)

    const gehryNarrations = document.querySelectorAll(parentSelector + ' .gehry .narrationWrapper')
    const utzonNarrations = document.querySelectorAll(parentSelector + ' .utzon .narrationWrapper')
    const allNarations = Array.from(document.querySelectorAll(parentSelector + ' .narrationWrapper'))

    const narrationGap = 15
    let visHeight = 0, utzonYears = [], gehryYears = []

    utzonNarrations.forEach(el => {
        visHeight += getDimensions(el).height
        utzonYears.push(+el.getAttribute('data-year'))
    })

    gehryNarrations.forEach(el => {
        visHeight += getDimensions(el).height
        gehryYears.push(+el.getAttribute('data-year'))
    })

    const years = utzonYears.concat(gehryYears)

    const scale = d3.scaleLinear()
        .range([0, visHeight])
        .domain(d3.extent(years))

    utzonNarrations.forEach(el => {
        el.classList.add('narrationWrapperLeft');
        const year = +el.getAttribute('data-year')
        const dist = scale(year) - getDimensions(el).height / 2
        el.style.setProperty('top', `${dist}px`)
    })

    gehryNarrations.forEach(el => {
        const year = +el.getAttribute('data-year')
        const dist = scale(year) - getDimensions(el).height / 2
        el.style.setProperty('transform', `translateY(${dist}px)`)
    })

    const firstNarration = allNarations
        .find(el => el.getAttribute('data-year') == d3.min(years))

    const lastNarration = allNarations
        .find(el => el.getAttribute('data-year') == d3.max(years))


    const paddingTop = getDimensions(firstNarration).height / 2 + narrationGap,
        paddingBottom = getDimensions(lastNarration).height / 2 + narrationGap,
        totalWidth = getDimensions(parentSelector + ' .visCanvas').width,
        totalHeight = visHeight + paddingTop + paddingBottom

    document.querySelectorAll(parentSelector + ' .visNar').forEach(el => el.style.setProperty('transform', `translateY(${paddingTop}px)`))

    const visCanvas = d3.select(parentSelector + ' .visCanvas').append('svg')
        .attr('width', '100%')
        .attr('height', totalHeight)
        .append('g')

    const utzonLife = visCanvas.append('g').attr('class', 'utzon')
        .style('transform', `translateX(${narrationGap}px)`)

    utzonLife.append('path')
        .attr('d', `M0,0 V${totalHeight}`)
        .attr('stroke-width', '1')

    utzonLife.append('g').attr('class', 'yearMarks')
        .style('transform', `translateY(${paddingTop}px)`)
        .selectAll('text')
        .data(utzonYears)
        .join('text')
        .text(d => d)
        .attr('x', 8)
        .attr('y', d => scale(d))

    utzonLife.append('g').attr('class', 'milestones')
        .style('transform', `translateY(${paddingTop}px)`)
        .selectAll('circle')
        .data(utzonYears)
        .join('circle')
        .attr('r', 4)
        .attr('cx', 0)
        .attr('cy', d => scale(d))

    const gehryLife = visCanvas.append('g').attr('class', 'gehry')
        .style('transform', `translateX(${totalWidth - narrationGap}px)`)

    gehryLife.append('path')
        .attr('d', `M0,0 V${totalHeight}`)
        .attr('stroke-width', '1')

    gehryLife.append('g').attr('class', 'yearMarks')
        .style('transform', `translateY(${paddingTop}px)`)
        .selectAll('text')
        .data(gehryYears)
        .join('text')
        .text(d => d)
        .attr('x', -8)
        .attr('y', d => scale(d))
        .attr('text-anchor', 'end')

    gehryLife.append('g').attr('class', 'milestones')
        .style('transform', `translateY(${paddingTop}px)`)
        .selectAll('circle')
        .data(gehryYears)
        .join('circle')
        .attr('r', 4)
        .attr('cx', 0)
        .attr('cy', d => scale(d))
}

mapChapter1();

drawVis("chapter2", utzonChapter2, gehryChapter2);
createRefLinks('.references')