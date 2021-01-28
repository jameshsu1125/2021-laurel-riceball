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
			o: 0,
			time: 1000,
			init() {
				this.c = $(root.refs.main);
				this.tran();
			},
			in() {
				Click.add('#back', () => {
					Click.remove('#back');
					this.out();
					root.props.back();
				});
				$(this).animate(
					{ o: 1 },
					{
						duration: this.time,
						step: () => this.tran(),
						complete: () => this.tran(),
						easing: 'easeOutQuart',
					}
				);
			},
			out() {
				$(this).animate(
					{ o: 0 },
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
					opacity: this.o,
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

	componentWillUnmount() {
		Click.remove('#back');
	}

	render() {
		return <div ref='main' id='back'></div>;
	}
}
