import React from 'react';
import './page.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class page extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.c = $(root.refs.main);
				this.c.css('visibility', 'hidden');

				this.title.init();
				this.carving.init();
				this.riceball.init();
			},
			in() {
				this.c.css('visibility', 'visible');
				this.title.in();
				this.carving.in();
				this.riceball.in();
			},
			show() {
				this.c.css('visibility', 'visible');
				this.title.show();
				this.carving.show();
				this.riceball.show();
			},
			hide() {
				this.c.css('visibility', 'hidden');
				this.title.hide();
				this.carving.hide();
				this.riceball.hide();
			},
			fadein(direct) {
				this.c.css('visibility', 'visible');
				this.title.fadein(direct);
				this.carving.fadein(direct);
				this.riceball.fadein(direct);
			},
			fadeout(direct) {
				this.title.fadeout(direct);
				this.carving.fadeout(direct);
				this.riceball.fadeout(direct);
			},
			offset(dx) {
				this.title.offset(dx);
				this.carving.offset(dx);
			},
			selected() {
				this.riceball.selected();
			},
			title: {
				l: 100,
				o: 0,
				time: 800,
				delay: 0,
				init() {
					this.c = $(root.refs.title);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ l: 0, o: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
				},
				fadein(direct) {
					if (direct === 'next') this.l = 300;
					else this.l = -300;
					this.o = 0;
					this.tran();

					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, l: 0 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
				},
				fadeout(direct) {
					this.o = 1;
					this.tran();

					$(this)
						.delay(this.delay)
						.animate(
							{ o: 0, l: direct == 'next' ? -500 : 500 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									root.tr.hide();
								},
								easing: 'easeOutQuart',
							}
						);
				},
				offset(dx) {
					this.l = dx * -1;
					this.tran();
				},
				show() {
					this.l = 0;
					this.o = 1;
					this.tran();
				},
				hide() {
					this.l = 0;
					this.o = 0;
					this.tran();
				},
				tran() {
					this.c.css({
						left: this.l + 'px',
						opacity: this.o,
					});
				},
			},
			carving: {
				l: 100,
				o: 0,
				time: 700,
				delay: 100,
				init() {
					this.c = $(root.refs.carving);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, l: 0 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
				},
				offset(dx) {
					this.l = dx * -0.5;
					this.tran();
				},
				fadein(direct) {
					if (direct === 'next') this.l = 1000;
					else this.l = -1000;
					this.o = 0;
					this.tran();

					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, l: 0 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
				},
				fadeout(direct) {
					this.o = 1;
					this.tran();

					$(this)
						.delay(this.delay)
						.animate(
							{ o: 0, l: direct == 'next' ? -500 : 500 },
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
				show() {
					this.l = 0;
					this.o = 1;
					this.tran();
				},
				hide() {
					this.l = 0;
					this.o = 0;
					this.tran();
				},
				tran() {
					this.c.css({
						left: this.l + 'px',
						opacity: this.o,
					});
				},
			},
			riceball: {
				s: 1,
				o: 0,
				l: 0,
				time: 700,
				delay: 300,
				t: 0,
				init() {
					this.c = $(root.refs.riceball);
					this.tran();
				},
				in() {
					this.s = 1.2;
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, s: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
				},
				fadein(direct) {
					if (direct === 'next') this.l = 1000;
					else this.l = -1000;
					this.o = 0;
					this.s = 1;
					this.tran();

					$(this)
						.delay(300)
						.animate(
							{ o: 1, l: 0 },
							{
								duration: 500,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
				},
				fadeout(direct) {
					this.l = 0;
					this.o = 1;
					this.s = 1;
					this.tran();

					$(this)
						.delay(200)
						.animate(
							{ o: 0, l: direct == 'next' ? -100 : 100 },
							{
								duration: 700,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutQuart',
							}
						);
				},
				show() {
					this.l = 0;
					this.o = 1;
					this.tran();
				},
				hide() {
					this.l = 0;
					this.o = 0;
					this.tran();
				},
				selected() {
					this.c.css('z-index', 2);
					$(this).animate(
						{ s: 3, t: 190 },
						{
							duration: 2000,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								root.props.end(root.props.index);
							},
							easing: 'easeInOutQuart',
						}
					);
				},
				tran() {
					this.c.css({
						transform: `scale(${this.s})`,
						'-webkit-transform': `scale(${this.s})`,
						'-moz-transform': `scale(${this.s})`,
						'-o-transform': `scale(${this.s})`,
						'-ms-transform': `scale(${this.s})`,
						left: this.l + 'px',
						opacity: this.o,
						top: this.t + 'px',
					});
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	selected() {
		this.tr.selected();
	}

	offset(dx) {
		this.tr.offset(dx);
	}

	hide() {
		this.tr.hide();
	}

	show() {
		this.tr.show();
	}

	fadeout(direct) {
		this.tr.fadeout(direct);
	}

	fadein(direct) {
		this.tr.fadein(direct);
	}

	in() {
		this.tr.in();
	}

	render() {
		return (
			<div ref='main' className='page'>
				<div className='container'>
					<div ref='title' className='title'></div>
					<div ref='carving' className='carving'>
						<div className='key'></div>
						<div className='name'></div>
						<div className='description'></div>
					</div>
					<div ref='riceball' className='riceball'></div>
				</div>
			</div>
		);
	}
}
