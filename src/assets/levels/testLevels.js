const rules = [
    //list of rules
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
            strength: 1
        },
        props: {
            player: true
        }
    }
];

const levels =  [
    {
        name: "level 0",
        id: "0",
        category: "test zone",
        description: "test level",
        width: 10,
        height: 10,
        rules: [
            ...rules
        ],
        entities: [
            //list of entities
            {x: 4, y: 4, type: "wall"},
            {x: 4, y: 5, type: "wall"},
            {x: 5, y: 5, type: "wall"},
            {x: 5, y: 6, type: "wall"},
            {x: 9, y: 9, type: "wall"},
            {x: 11, y: 9, type: "wall"},
            {x: 5, y: 4, type: "target"},
            {x: 4, y: 6, type: "target"},
            {x: 8, y: 8, type: "box"},
            {x: 7, y: 8, type: "box"},
            {x: 7, y: 9, type: "player", name: "player 1"},
            {x: 4, y: 9, type: "player", name: "player 2"},
        ]
    },
    {
        name: "level 1",
        id: "1",
        category: "test zone",
        description: "test level",
        width: 10,
        height: 10,
        rules: [
            ...rules
        ],
        entities: [
            //list of entities
            {x: 4, y: 3, type: "wall"},
            {x: 4, y: 5, type: "wall"},
            {x: 3, y: 4, type: "wall"},
            {x: 5, y: 4, type: "wall"},
            {x: 4, y: 4, type: "player"},
        ]
    },
    {
        name: "level 42",
        id: "2",
        category: "test zone",
        description: "a weird place",
        width: 11,
        height: 11,
        rules: [
            {
                target: "wall",
                type: "entityCheck",
                props: { //props can never be removed or changed
                    through: true,
                    trigger: true
                }
            },
            {
                target: "target",
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
                    strength: 1
                }
            }
        ],
        entities: [
            //list of entities
            {x: 3, y: 3, type: "box"},
            {x: 3, y: 4, type: "box"},
            {x: 3, y: 5, type: "box"},
            {x: 3, y: 6, type: "box"},
            {x: 3, y: 7, type: "box"},
            {x: 7, y: 3, type: "box"},
            {x: 7, y: 4, type: "box"},
            {x: 7, y: 5, type: "box"},
            {x: 7, y: 6, type: "box"},
            {x: 7, y: 7, type: "box"},
            {x: 4, y: 3, type: "wall"},
            {x: 6, y: 3, type: "wall"},
            {x: 4, y: 7, type: "wall"},
            {x: 6, y: 7, type: "wall"},
            {x: 2, y: 4, type: "target"},
            {x: 2, y: 6, type: "target"},
            {x: 8, y: 4, type: "target"},
            {x: 8, y: 6, type: "target"},
            {x: 5, y: 5, type: "player"},
        ]
    }

];

export const getLevels = (min = 0, max) => new Promise((resolve) => resolve(levels.slice(min, max)));