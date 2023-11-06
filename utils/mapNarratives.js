export default function mapNarratives(selector, narratives) {
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



