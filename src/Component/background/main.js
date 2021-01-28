import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');
export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			t: 0,
			time: 5000,
			init() {
				this.c = $(root.refs.bg);
			},
			up() {
				$(this).animate(
					{ t: -10 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => this.tran(),
						easing: 'easeOutQuart',
					}
				);
			},
			upup() {
				$(this).animate(
					{ t: -20 },
					{
						duration: 4000,
						step: () => this.tran(),
						complete: () => this.tran(),
						easing: 'easeInOutCubic',
					}
				);
			},
			down() {
				$(this).animate(
					{ t: 0 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => this.tran(),
						easing: 'easeOutQuart',
					}
				);
			},
			tran() {
				this.c.css({
					top: this.t + '%',
				});
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	up() {
		this.tr.up();
	}

	upup() {
		this.tr.upup();
	}

	down() {
		this.tr.down();
	}

	render() {
		return (
			<div id='background'>
				<div ref='bg'></div>
			</div>
		);
	}
}
