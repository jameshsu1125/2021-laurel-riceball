import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');

export default class halo extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.halo.init();
				return this;
			},
			in() {
				this.halo.in();
			},
			halo: {
				init() {
					this.c = $(root.refs.halo);
				},
				in() {
					const self = this;
					this.c.children('div').each(function (i) {
						new self.flash($(this), i);
					});
				},
				flash(tar, index) {
					this.tar = tar;
					this.time = 5000;
					this.deg = 0;
					this.radius = 100 + 10 * index;
					this.p = { o: 0, y: 100 * (index + 1), x: 100 + 10 * index, r: 0 };
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
							this.deg += 0.05 * index;
							this.p.x = Math.cos((Math.PI / 180) * this.deg) * this.radius;
							this.p.y = Math.sin((Math.PI / 180) * this.deg * 2) * this.radius;
							this.p.r = Math.sin((Math.PI / 180) * this.deg) * this.radius * 0.1;
							this.p.o = Math.random() * 0.2 + 0.8;
							this.tran();
						});
					};
					this.tran();
					$(this.p).animate(
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
			<div ref='halo' id='halo'>
				<div></div>
				<div></div>
			</div>
		);
	}
}
