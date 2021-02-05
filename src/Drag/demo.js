import React from 'react';
import './demo.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class demo extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.txt.init();
				this.hand.init();
			},
			in() {
				this.txt.in();
				this.hand.in();
			},
			out() {
				$(root.refs.main)
					.delay(1000)
					.animate({ opacity: 0 }, 1000, 'easeOutQuart', () => {
						root.props.end();
					});
			},
			hand: {
				o: 0,
				delay: 2000,
				time: 1000,
				t: 0,
				l: 0,
				init() {
					this.c = $(root.refs.hand);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, t: 18, l: 50 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									root.tr.out();
								},
								easing: 'easeOutQuart',
							}
						);
				},
				draw() {
					$(this).animate(
						{ t: 18, l: 50 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
							},
							easing: 'easeOutQuart',
						}
					);
				},
				tran() {
					this.c.css({
						opacity: this.o,
						left: this.l + 'px',
						top: this.t + 'px',
					});
				},
			},
			txt: {
				o: 0,
				delay: 2000,
				time: 1000,
				init() {
					this.c = $(root.refs.txt);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1 },
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

	render() {
		return (
			<div ref='main' id='demo'>
				<div ref='txt' className='txt'></div>
				<div ref='hand' className='hand'></div>
			</div>
		);
	}
}
