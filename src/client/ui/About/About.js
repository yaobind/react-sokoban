import React from 'react'

import './About.css'
import M from "../../common/MarkDown";

export class About extends React.Component {

    render() {
        return (
            <article className={"About"}>
                <M>
                    {`
## About

### React Sokoban

This is an example app of the [Sokoban](https://en.wikipedia.org/wiki/Sokoban) game made with the React.js library.

### Motivations

The purpose of this app was to learn some new practices with React.js while making an app easy enough to be done through the weekend.

I'm currently writing a blog post about the learning acquired while coding. I'll post the link to the article soon.

### Author
This game was made by [ArmandDu](https://blog.armanddu.com/about).`
                    }
                </M>

            </article>
        )
    }
}

export default About;
