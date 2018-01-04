export default [
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
