import getDimensions from './getDimensions.js'

export default function drawVis(chapter, utzonData, gehryData, startEnd = null) {
    const parentSelector = "." + chapter

    document.querySelector(parentSelector).innerHTML = `
        <div class="grid__colspan_5 visNar utzon"></div>
        <div class="grid__colspan_2 grid__colpush_5 visCanvas"></div>
        <div class="grid__colspan_5 visNar gehry"></div>
    `

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

    const firstNarration = allNarations
        .find(el => el.getAttribute('data-year') == d3.min(years))

    const lastNarration = allNarations
        .find(el => el.getAttribute('data-year') == d3.max(years))

    const paddingTop = getDimensions(firstNarration).height / 2 + narrationGap,
        paddingBottom = getDimensions(lastNarration).height / 2 + narrationGap,
        totalWidth = getDimensions(parentSelector + ' .visCanvas').width,
        totalHeight = visHeight + paddingTop + paddingBottom

    utzonNarrations.forEach(el => {
        el.classList.add('narrationWrapperLeft');
        const year = +el.getAttribute('data-year')
        const dist = scale(year) - getDimensions(el).height / 2 + paddingTop
        el.style.setProperty('top', `${dist}px`)
    })

    gehryNarrations.forEach(el => {
        const year = +el.getAttribute('data-year')
        const dist = scale(year) - getDimensions(el).height / 2 + paddingTop
        el.style.setProperty('transform', `translateY(${dist}px)`)
    })

    const visCanvas = d3.select(parentSelector + ' .visCanvas').append('svg')
        .attr('width', '100%')
        .attr('height', totalHeight)
        .append('g')

    const utzonLife = visCanvas.append('g').attr('class', 'utzon')
        .style('transform', `translateX(${narrationGap}px)`)

    const gehryLife = visCanvas.append('g').attr('class', 'gehry')
        .style('transform', `translateX(${totalWidth - narrationGap}px)`)

    if (startEnd === 'start') {
        utzonLife.append('path')
            .attr('d', `M0,${scale(d3.min(utzonYears)) + paddingTop} V${totalHeight}`)
            .attr('stroke-width', '1')

        gehryLife.append('path')
            .attr('d', `M0,${scale(d3.min(gehryYears)) + paddingTop} V${totalHeight}`)
            .attr('stroke-width', '1')

    } else if (startEnd === 'end') {
        utzonLife.append('path')
            .attr('d', `M0,0 V${scale(d3.max(utzonYears)) + paddingTop}`)
            .attr('stroke-width', '1')

        gehryLife.append('path')
            .attr('d', `M0,0 V${totalHeight}`)
            .attr('stroke-width', '1')
    } else {
        utzonLife.append('path')
            .attr('d', `M0,0 V${totalHeight}`)
            .attr('stroke-width', '1')

        gehryLife.append('path')
            .attr('d', `M0,0 V${totalHeight}`)
            .attr('stroke-width', '1')
    }


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

function mapNarratives(selector, narratives) {
    const getSize = (n) => {
        if (n < 100) {
            return 'narrationWrapperS'
        } else if (n > 550) {
            return 'narrationWrapperL'
        } else {
            return 'narrationWrapperM'
        }
    }

    narratives.forEach(d => {
        const dataYear = document.createAttribute('data-year')
        dataYear.value = d.year

        const narrationWrapper = document.createElement('div')
        narrationWrapper.className = 'narrationWrapper'
        narrationWrapper.classList.add(getSize(d.content.length))

        narrationWrapper.setAttributeNode(dataYear)
        narrationWrapper.innerHTML = d.content

        document.querySelector(selector).append(narrationWrapper);
    })
}