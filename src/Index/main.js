import React from 'react';
import './main.less';

import Background from '../Component/background/main';
import Logo from '../Component/logo/main';
import Fiftieth from '../Component/fiftieth/main';

import Home from './../Home/main';
import Select from './../Select/main';

import Click from 'lesca-click';
import $ from 'jquery';
require('jquery-easing');

export default class index extends React.Component {
	constructor(props) {
		super(props);

		const root = this;

		this.state = { home: false, select: true };

		Click.init();

		this.tr = {
			init() {
				this.ctx.init();
			},
			ctx: {
				s: 1,
				init() {
					this.c = $(root.refs.ctx);
					this.resize();
					$(window).resize(() => this.resize());
				},
				resize() {
					let mh = 1333,
						h = window.innerHeight,
						s = h / mh;

					this.s = s > 1 ? 1 : s;
					this.tran();
				},
				tran() {
					this.c.css({
						transform: `scale(${this.s})`,
						'-webkit-transform': `scale(${this.s})`,
						'-moz-transform': `scale(${this.s})`,
						'-o-transform': `scale(${this.s})`,
						'-ms-transform': `scale(${this.s})`,
					});
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
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

	append_select() {
		if (this.state.select) return <Select />;
	}

	render() {
		return (
			<div id='index'>
				<Background />
				<div ref='ctx' className='ctx'>
					{this.append_home()}
					{this.append_select()}
				</div>
				<Logo />
				<Fiftieth />
			</div>
		);
	}
}
