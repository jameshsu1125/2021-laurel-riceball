import React from 'react';
import './main.less';

import Background from '../Component/background/main';
import Logo from '../Component/logo/main';
import Fiftieth from '../Component/fiftieth/main';

import Home from './../Home/main';

import Click from 'lesca-click';

export default class index extends React.Component {
	constructor(props) {
		super(props);
		this.state = { home: true };

		Click.init();
	}

	componentDidMount() {
		//script
	}

	componentDidUpdate() {
		//script
	}

	componentWillUnmount() {
		//script
	}

	append_home() {
		if (this.state.home) return <Home />;
	}

	render() {
		return (
			<div id='index'>
				<Background />
				{this.append_home()}
				<Logo />
				<Fiftieth />
			</div>
		);
	}
}
