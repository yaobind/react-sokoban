import 'whatwg-fetch'

import file from './levelFiles/Original.txt'
import makeLevel from "./makeLevel";

import rules from './rules/basicRules'

const levelCreator = makeLevel("original");


export const getLevels = (min, max) => fetch(file)
    .then(result => result.text())
    .then(fileContent => fileContent
        .split("\n\n")
        .slice(min || 0, max)
        .map((level) => {
            const [content, title ] = level.split("; ");
            return {
                ...levelCreator(rules, `level ${title}`, "")(content),
                order: Number(title)};
        }).filter(level => !!level && level.name && level.entities && level.entities.length)
    );