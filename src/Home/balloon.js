import React from 'react';

import $ from 'jquery';
require('jquery-easing');

export default class balloon extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.balloon.init();
				return this;
			},
			in() {
				this.balloon.in();
			},
			balloon: {
				x: 20,
				y: 500,
				r: 5,
				s: 1,
				o: 0,
				delay: 0,
				deg: 0,
				time: 4000,
				radius: 20,
				init() {
					this.c = $(root.refs.balloon);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, y: 0, r: 0 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									this.swing();
								},
								easing: 'easeOutQuart',
							}
						);
				},
				swing: function () {
					EnterFrame.go = true;
					EnterFrame.add(() => {
						this.deg += 0.4;
						this.x = Math.cos((Math.PI / 180) * this.deg) * this.radius;
						this.y = Math.sin((Math.PI / 180) * this.deg * 2) * this.radius;
						this.r = Math.sin((Math.PI / 180) * this.deg) * this.radius * 0.1;

						this.tran();
					});
				},
				tran() {
					this.c.css({
						transform: `scale(${this.s}) rotate(${this.r}deg)`,
						'-webkit-transform': `scale(${this.s}) rotate(${this.r}deg)`,
						'-moz-transform': `scale(${this.s}) rotate(${this.r}deg)`,
						'-o-transform': `scale(${this.s}) rotate(${this.r}deg)`,
						'-ms-transform': `scale(${this.s}) rotate(${this.r}deg)`,
						opacity: this.o,
						top: this.y + 'px',
						left: this.x + 'px',
					});
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	in() {
		this.tr.in();
	}

	render() {
		return (
			<div ref='balloon' className='main_balloon'>
				<div className='puipui'></div>
			</div>
		);
	}
}
