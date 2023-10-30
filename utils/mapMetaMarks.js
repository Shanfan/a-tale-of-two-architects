export function layYearMarks(selector, scale) {
    for (let i = 1915; i < 2025; i += 5) {
        d3.select(selector).append('div').text(i)
            .style('top', scale(i) + 'px')
    }
}

export function renderWar(selector, start, end, scale) {
    d3.select(selector)
        .style('top', scale(start) + 'px')
        .style('height', scale(end) - scale(start) + 'px')
}

function renderCareerMark(selector, year) {
    d3.select(selector).style('top', scale(year) + "px")
}
