import 'whatwg-fetch'

import file from './levelFiles/Intro.txt'
import makeLevel from './makeLevel'

const rules = [
    //list of rules
    {
        type: 'mapEntity',
        map: {
            '#': 'wall',
            '@': 'player',
            '$': 'box',
            '.': 'target',
            '*': ['target', 'box']
        }
    },
    {
        target: "target",
        type: "entityCheck",
        props: { //props can never be removed or changed
            through: true,
            trigger: true
        }
    },
    {
        target: "box",
        type: "entityCheck",
        props: {
            push: true
        }
    },
    {
        target: "player",
        type: "entityCheck",
        defaultProps: { //default props can be overwritten
            direction: "south",
            strength: 1,
        },
        props: {
            player: true
        }
    }
];

const levelCreator = makeLevel("intro");


export const getLevels = (min, max) => fetch(file)
    .then(result => result.text())
    .then(fileContent => fileContent
        .split("\n\n")
        .slice(min || 0, max)
        .map((level) => {
            const [content, titleAndDescription ] = level.split("; ");
            const [ title, description ] = titleAndDescription.split(":");
            return levelCreator(rules, title.trim(), description.trim())(content);
        }).filter(level => !!level && level.name && level.entities && level.entities.length)
    );