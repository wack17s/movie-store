import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

// Renders application's header
export default class nvm extends Component {
	render() {
		return (
			<div className="header">
				<a href="/">
					<Header size="medium">Movies</Header>
				</a>
			</div>
		);
	}
}
