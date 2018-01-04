import React from 'react'
import PropTypes from 'prop-types'

import ReactMarkdown from 'react-markdown'
import './Markdown.css'

export class MarkDown extends React.Component {

    static propTypes = {
        children: PropTypes.string
    };

    static defaultProps = {
        children: () => ""
    };

    renderLink = (props) => {
        const target = /^(http.?):\/\//i.test(props.href) ? "_blank" : null;

        return <a href={props.href} rel='nofollow noreferrer noopener' target={target}>{props.children}</a>;

    };


    render() {
        const { children } = this.props;

        return <ReactMarkdown
            renderers={{
                link: this.renderLink
            }}
            className={'M'} source={children}/>
    }
}

export default MarkDown;