export default function createRefLinks(selector) {

    function createLinks(content, href) {
        const link = document.createElement('a')
        link.href = href
        link.target = "_blank"
        link.innerHTML = content

        return link
    }

    references.forEach(d => {
        const link = createLinks(d.title, d.href)
        const list = document.createElement('li')
        list.append(link)
        document.querySelector(selector).appendChild(list)
    })
}

const references = [
    {
        'title': 'I&rsquo;m Frank Gehry, and This Is How I See the World - Los Angeles Times (1992)',
        'href': 'https://www.latimes.com/archives/la-xpm-1998-oct-25-tm-35829-story.html'
    },
    {
        'title': 'Frank Gehry, 1990 TED Talk, My Days as A Young Rebel',
        'href': 'https://www.ted.com/talks/frank_gehry_my_days_as_a_young_rebel'
    },
    {
        'title': 'The Software Behind Frank Gehry’s Geometrically Complex Architecture - Priceonomics',
        'href': 'https://priceonomics.com/the-software-behind-frank-gehrys-geometrically/'
    },
    {
        'title': 'Gehry Residence / Gehry Partners | ArchDaily',
        'href': 'https://www.archdaily.com/67321/gehry-residence-frank-gehry'
    },
    {
        'title': 'Walt Disney Concert Hall - Wikipedia',
        'href': 'https://en.wikipedia.org/wiki/Walt_Disney_Concert_Hall'
    },
    {
        'title': 'List of Works by Frank Gehry - Wikipedia',
        'href': 'https://en.wikipedia.org/wiki/List_of_works_by_Frank_Gehry'
    },
    {
        'title': 'Sydney Opera House - Wikipedia',
        'href': 'https://en.wikipedia.org/wiki/Sydney_Opera_House'
    },
    {
        'title': 'The Bilbao Effect : How the Design of a Museum Transformed The Economy of The City',
        'href': 'https://www.snaptrude.com/blog/the-bilbao-effect-how-the-design-of-a-museum-transformed-the-economy-of-the-city'
    },
    {
        'title': 'Sydney Opera House | Our Story',
        'href': 'https://www.sydneyoperahouse.com/our-story/'
    },
    {
        'title': 'Utzon’s Hellebæk Residence in Denmark by Jørn Utzon',
        'href': 'https://archeyes.com/utzons-house-in-hellebaek-denmark-jorn-utzon/'
    },
    {
        'title': 'Look inside Jørn Utzon&rsquo;s Can Lis Family House from the 70s in Mallorca',
        'href': 'https://www.designboom.com/architecture/jorn-utzon-can-lis-family-home-mallorca-08-02-2019/'
    },
    {
        'title': 'Can Feliz, Mallorca - Jørn Utzon | Arquitectura Viva',
        'href': 'https://arquitecturaviva.com/works/can-feliz-9'
    },
    {
        'title': 'AD Classics: Bagsværd Church / Jørn Utzon | ArchDaily',
        'href': 'https://www.archdaily.com/160390/ad-classics-bagsvaerd-church-jorn-utzon'
    },
    {
        'title': 'The Utzon Center: Jørn Utzon&rsquo;s Architectural Legacy in Aalborg',
        'href': 'https://archeyes.com/utzon-center-aalborg-jorn-utzon/'
    },
    {
        'title': "15 Iconic Projects by Jørn Utzon",
        'href': 'https://www.re-thinkingthefuture.com/know-your-architects/a360-15-iconic-projects-by-jorn-utzon-architect-of-sydney-opera-house/'
    },
    {
        'title': 'Architecture Classics: Kuwait National Assembly Building / Jørn Utzon | ArchDaily',
        'href': 'https://www.archdaily.com/568821/ad-classics-kuwait-national-assembly-building-jorn-utzon'
    }
]