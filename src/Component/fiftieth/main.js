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
			init() {
				this.c = $(root.refs.main);
				this.er = parseInt(this.c.css('right'));
				this.r = -110;
				this.tran();
			},
			in() {
				$(this)
					.delay(100)
					.animate(
						{ r: this.er },
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
					right: this.r + 'px',
				});
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
		return <div ref='main' id='fiftieth'></div>;
	}
}
