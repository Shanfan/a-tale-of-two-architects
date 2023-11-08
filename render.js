import { utzonChapter1, utzonChapter2, utzonChapter3, utzonChapter4, utzonChapter5 } from "/data/utzon.js";
import { gehryChapter1, gehryChapter2, gehryChapter3, gehryChapter4, gehryChapter5 } from "/data/gehry.js";
import createRefLinks from "./utils/createRefLinks.js";
import drawVis from "./utils/mapNarratives.js";

drawVis("chapter1", utzonChapter1, gehryChapter1, 'start');
drawVis("chapter2", utzonChapter2, gehryChapter2);
drawVis("chapter3", utzonChapter3, gehryChapter3);
drawVis("chapter4", utzonChapter4, gehryChapter4);
drawVis("chapter5", utzonChapter5, gehryChapter5, 'end');

createRefLinks('.references')

window.addEventListener('resize', () => {
    drawVis("chapter1", utzonChapter1, gehryChapter1, 'start');
    drawVis("chapter2", utzonChapter2, gehryChapter2);
    drawVis("chapter3", utzonChapter3, gehryChapter3);
    drawVis("chapter4", utzonChapter4, gehryChapter4);
    drawVis("chapter5", utzonChapter5, gehryChapter5, 'end');
})