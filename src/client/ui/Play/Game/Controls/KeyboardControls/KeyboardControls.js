import React from 'react'
import PropTypes from 'prop-types'
import KeyHandler, {KEYPRESS} from 'react-key-handler';

/**
 * KeyboardControls
 *
 * controls players with a keypress.
 *
 * warning: this is a basic component, only one player at a time can be bound to the keyboard and the layout is fixed
 * I was a bit lazy to make it better an reusable
 */

export class KeyboardControls extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        controls: PropTypes.shape({
            "up": PropTypes.func,
            "down": PropTypes.func,
            "left": PropTypes.func,
            "right": PropTypes.func,
            reset: PropTypes.func,
            menu: PropTypes.func
        }).isRequired,

        players: PropTypes.array.isRequired
    };

    handleControl = action => (e) => {
        const { controls, players: [player1] } = this.props;

        e.preventDefault();

        if (controls[action]) {
            controls[action](player1);
        }
    };

    render() {

        const { children } = this.props;
        const handle = this.handleControl;

        return (
            <div className={"Keyboard-controls"}>
                <KeyHandler keyEventName={KEYPRESS} keyValue={"z"} onKeyHandle={handle("up")}/>
                <KeyHandler keyEventName={KEYPRESS} keyValue={"s"} onKeyHandle={handle("down")}/>
                <KeyHandler keyEventName={KEYPRESS} keyValue={"q"} onKeyHandle={handle("left")}/>
                <KeyHandler keyEventName={KEYPRESS} keyValue={"d"} onKeyHandle={handle("right")}/>
                <KeyHandler keyEventName={KEYPRESS} keyValue={"ArrowUp"} onKeyHandle={handle("up")}/>
                <KeyHandler keyEventName={KEYPRESS} keyValue={"ArrowDown"} onKeyHandle={handle("down")}/>
                <KeyHandler keyEventName={KEYPRESS} keyValue={"ArrowLeft"} onKeyHandle={handle("left")}/>
                <KeyHandler keyEventName={KEYPRESS} keyValue={"ArrowRight"} onKeyHandle={handle("right")}/>
                <KeyHandler keyEventName={KEYPRESS} keyValue={"r"} onKeyHandle={handle("reset")}/>
                <KeyHandler keyEventName={KEYPRESS} keyValue={"m"} onKeyHandle={handle("menu")}/>
                {children}
            </div>
        )
    }
}

export default KeyboardControls;