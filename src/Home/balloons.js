import React from 'react';
import $ from 'jquery';
require('jquery-easing');

export default class balloons extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.balloons.init();
				return this;
			},
			in() {},
			balloons: {
				init() {
					this.c = $(root.refs.balloons);
					this.tran();
				},
				tran() {
					let self = this;
					this.c.children('div').each(function (i) {
						new self.swing($(this), i);
					});
				},
				swing: function (tar, index) {
					this.tar = tar;
					this.time = 5000;
					this.deg = 0;
					this.radius = 5 * index;
					this.delay = 20 * index;
					this.p = { o: 0, y: 100 * (index + 1), x: 5 * index, r: 0 };
					this.tran = () => {
						this.tar.css({
							opacity: this.p.o,
							top: this.p.y + 'px',
							left: this.p.x + 'px',
						});
					};
					this.swing = () => {
						EnterFrame.go = true;
						EnterFrame.add(() => {
							this.deg += 0.1 + 0.02 * index;
							this.p.x = Math.cos((Math.PI / 180) * this.deg) * this.radius;
							this.p.y = Math.sin((Math.PI / 180) * this.deg * 2) * this.radius;
							this.p.r = Math.sin((Math.PI / 180) * this.deg) * this.radius * 0.1;
							this.tran();
						});
					};
					this.tran();
					$(this.p)
						.delay(this.delay)
						.animate(
							{ o: 1, y: 0 },
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
			<div ref='balloons' className='balloon'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	}
}
