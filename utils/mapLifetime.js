const starPath = "M5.114,5.114l8.177,3.738c0.536,0.246 1.119,0.373 1.709,0.373c0.59,-0 1.173,-0.127 1.709,-0.373l8.177,-3.738l-3.738,8.177c-0.246,0.536 -0.373,1.119 -0.373,1.709c0,0.59 0.127,1.173 0.373,1.709l3.738,8.177l-8.177,-3.738c-0.536,-0.246 -1.119,-0.373 -1.709,-0.373c-0.59,0 -1.173,0.127 -1.709,0.373l-8.177,3.738l3.738,-8.177c0.246,-0.536 0.373,-1.119 0.373,-1.709c-0,-0.59 -0.127,-1.173 -0.373,-1.709l-3.738,-8.177Z"
const triUpPath = "M15,0l10,13.041l-20,-0l10,-13.041Z"
const triDownPath = "M15,30l-10,-13.041l20,0l-10,13.041Z"
const diamondPath = "M15,5.101l-9.899,9.899l9.899,9.899l9.899,-9.899l-9.899,-9.899Z"

export class PersonLifetime {
    constructor(data, selector, scale) {
        this.person = d3.select(selector);
        this.data = data;
        this.scale = scale;
        this.events = [];
        this.drawLifetime();
        this.drawEducation();
        this.drawPrizker();
    }

    drawLifetime() {
        const lifeTime = this.person.append('g').attr('class', 'life');
        const yBirth = this.scale(this.data.birth.year)
        const yDeath = this.data.death.year ? this.scale(this.data.death.year) : this.scale(2025)

        lifeTime.append('circle')
            .attr('r', 6)
            .attr('cx', 15)
            .attr('fill', 'none')
            .attr('stroke-width', 2)
            .attr('cy', yBirth)

        lifeTime.append('path')
            .attr('d', `M15 ${yBirth} V${yDeath}`)

        if (this.data.death.year) {
            lifeTime.append('path')
                .attr('stroke-width', 2)
                .attr('d', `M2 ${yDeath - 1} H28`)
        }
    }

    drawEducation() {
        const education = this.person.append('g').attr('class', 'education');
        const start = this.scale(this.data.education.start)
        const end = this.scale(this.data.education.end)

        education.append('path')
            .attr('d', triUpPath)
            .style('transform', `translateY(${start}px)`)

        education.append('path')
            .attr('d', triDownPath)
            .style('transform', `translateY(${end}px)`)

    }

    drawPrizker() {
        const y = this.scale(this.data.pritzker.year)
        this.person.append('path')
            .attr('class', 'pritzker')
            .attr('d', starPath)
            .style('transform', `translateY(${y}px)`)
    }

    drawPrimeProject() {
        const primeProject = this.person.append('g').attr('class', 'primeProject')
        const projectName = this.data.primeProject.name
        const mileStones = this.data.primeProject.events
        const yAccessor = d => this.scale(d)

        primeProject.selectAll('path')
            .data(mileStones)
            .join('path')
            .attr('d', diamondPath)
            .style('transform', d => `translateY(${yAccessor(d.year)}px)`)
    }

    mapEvent(year, eventName) {
        this.events.push({ year: year, name: eventName })
    }




}