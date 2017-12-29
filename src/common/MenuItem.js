/**
 * Created by armanddu on 31/01/17.
 */
import React from 'react'
import { Link } from 'react-router'

export class MenuItem extends React.Component {
	static propTypes = {
		to: React.PropTypes.string.isRequired,
		className: React.PropTypes.string,
		children: React.PropTypes.any
	};

	static defaultStyles = {
		content: {
			// backgroundColor: 'white',
			// lineHeight: 'inherit',

			display: 'inline-block',
			width: '100%',
			height: '100%',
			textDecoration: 'none'
		},
		text: {
		}
	};

	render() {
		const { className, to, children, ...props} = this.props;
		return (
			<div className={`${className}`}>
				<Link
					{...props}
					style={MenuItem.defaultStyles.content}
					to={to}>
					<p
						style={MenuItem.defaultStyles.text}>
						{children}
					</p>
				</Link>
			</div>

		)
	}
}

export default MenuItem;
