import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class main extends React.Component {
	constructor(props) {
		super(props);

		const root = this;
		this.tr = {
			init() {},
			in() {
				this.evt();
			},
			evt() {
				Click.add('.home-btn', () => {
					console.log('a');
				});
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			waitForAll: true,
		});
	}

	componentDidUpdate() {
		//script
	}

	componentWillUnmount() {
		//script
	}

	render() {
		return (
			<div ref='main' id='home'>
				<div className='container'>
					<div className='halo'>
						<div></div>
						<div></div>
					</div>
					<div className='balloon'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div className='txt'>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div className='home-btn'></div>
				</div>
			</div>
		);
	}
}
