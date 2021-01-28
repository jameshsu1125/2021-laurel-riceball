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
			time: 500,
			init() {
				this.c = $(root.refs.main);
				this.el = parseInt(this.c.css('left'));
				this.l = -120;
				this.tran();
			},
			in() {
				$(this).animate(
					{ l: this.el },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => {
							this.tran();
							this.evt();
						},
						easing: 'easeOutQuart',
					}
				);
			},
			tran() {
				this.c.css({
					left: this.l + 'px',
				});
			},
			evt() {
				Click.add('#logo', () => {});
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			each: (e) => {},
			waitForAll: true,
		});
	}

	render() {
		return <div ref='main' id='logo'></div>;
	}
}
