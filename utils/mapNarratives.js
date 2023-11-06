const getSize = (n, isLeft) => {
    if (n < 100) {
        return isLeft ? 'grid__colspan_4 grid__colpush_2' : 'grid__colspan_4'
    } else if (n > 550) {
        return 'grid__colspan_6'
    } else {
        return isLeft ? 'grid__colspan_5 grid__colpush_1' : 'grid__colspan_5'
    }
}

export default function mapNarratives(selector, narratives, isLeft = true) {

    narratives.forEach(d => {

        const dataYear = document.createAttribute('data-year')
        dataYear.value = d.year

        const sizeWrapper = document.createElement('div')
        sizeWrapper.classList = getSize(d.content.length, isLeft)

        const narrationWrapper = document.createElement('div')
        narrationWrapper.className = 'narrationWrapper'
        narrationWrapper.setAttributeNode(dataYear)

        narrationWrapper.innerHTML = d.content
        sizeWrapper.append(narrationWrapper)

        document.querySelector(selector).append(sizeWrapper);
    })

}



