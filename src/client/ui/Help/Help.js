import React from 'react'

import './Help.css'
import M from "../../common/MarkDown";

export class Help extends React.Component {

    render() {
        return (
            <article className={"Help"}>
                <M>
                    {`
## Help

### Objective

To win a level, you must move all the boxes to the storage locations.

You can move vertically and horizontally. You cannot go through walls or boxes.

You can push only one box at a time but not pull them.

you are stuck, you can use the reset button.

### Swipe Controls (experimental)
You can control the player by **swiping in the maze**.

### Keyboard Controls
You can control the player by using the keyboard.

**Arrow keys**: move the player

**ZQSD** (thanks french keyboards): move the player

### Shortcuts

**'r'**: restart the game

**'m'**: quit the current game`}
                </M>

            </article>
        )
    }
}

export default Help;