const starPath = "M5.114,-9.872l8.177,3.738c0.536,0.245 1.119,0.372 1.709,0.372c0.59,0 1.173,-0.127 1.709,-0.372l8.177,-3.738l-3.738,8.177c-0.246,0.536 -0.373,1.119 -0.373,1.709c0,0.59 0.127,1.172 0.373,1.709l3.738,8.176l-8.177,-3.738c-0.536,-0.245 -1.119,-0.372 -1.709,-0.372c-0.59,0 -1.173,0.127 -1.709,0.372l-8.177,3.738l3.738,-8.176c0.246,-0.537 0.373,-1.119 0.373,-1.709c-0,-0.59 -0.127,-1.173 -0.373,-1.709l-3.738,-8.177Z"
const triUpPath = "M15,0l10,13.041l-20,-0l10,-13.041Z"
const triDownPath = "M15,-0l-10,-13.041l20,0l-10,13.041Z"
const diamondPath = "M15,-9.899l-9.899,9.899l9.899,9.899l9.899,-9.899l-9.899,-9.899Z"
const roundPath = (cx, cy, r) => `M${cx - r}, ${cy} 
                                  a${r}, ${r} 0 1, 0 ${r * 2}, 0
                                  a${r}, ${r} 0 1, 0 ${-r * 2}, 0`

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
            .attr('r', 12)
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

    drawEvents(eventType) {
        let mileStones, shape
        const eventGroup = this.person.append('g').attr('class', eventType)
        const yAccessor = d => this.scale(d)

        switch (eventType) {
            case 'prime':
                mileStones = this.data.primeProject.events
                shape = diamondPath
                break;
            case 'secondary':
                mileStones = this.data.secondaryProject.events
                shape = diamondPath
                break;
            default:
            case 'other':
                mileStones = this.data.otherEvents
                shape = roundPath(15, 0, 4)

        }

        eventGroup.selectAll('path')
            .data(mileStones)
            .join('path')
            .attr('d', shape)
            .style('transform', d => `translateY(${yAccessor(d.year)}px)`)
    }


}