import React from 'react';
import './main.less';

import Page from './page';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.nun = 5;

		this.tr = {
			init() {
				this.slice.init();
				this.submit.init();
				this.ar.init();
				this.al.init();
			},
			in() {
				$(root.refs.main).css('display', 'block');
				this.slice.in();
				this.submit.in();
				this.ar.in();
				this.al.in();
			},
			back() {
				$(root.refs.main).animate({ opacity: 0 }, 1000, 'easeOutQuart', () => {
					root.props.destory();
				});
			},
			al: {
				o: 0,
				l: 40,
				delay: 800,
				init() {
					this.c = $(root.refs.al);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, l: 20 },
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
						left: this.l + 'px',
					});
				},
			},
			ar: {
				o: 0,
				r: 40,
				delay: 900,
				init() {
					this.c = $(root.refs.ar);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, r: 20 },
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
						right: this.r + 'px',
					});
				},
			},
			submit: {
				o: 0,
				t: 500,
				delay: 1200,
				init() {
					this.c = $(root.refs.submit);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, t: 400 },
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
						opacity: this.o,
						'margin-top': this.t + 'px',
					});
				},
				evt() {
					Click.add('.select-submit', () => {
						Click.remove('.select-submit');
						root.refs['page' + (root.tr.slice.index + 1)].selected();
					});
				},
			},
			slice: {
				index: 0,
				is: true,
				l: 0,
				time: 800,
				offset_x: 150,
				init() {
					this.c = $(root.refs.slice);
				},
				in() {
					root.refs.page1.in();
					this.evt();
				},
				evt() {
					Click.add('.select-left-arrow', () => this.prev());
					Click.add('.select-right-arrow', () => this.next());

					var px = 0,
						dx = 0;

					Click.ex_down = (e) => {
						px = e.pageX || e.changedTouches[0].clientX;
						dx = 0;
					};

					Click.ex_up = (e) => {
						if (dx != 0 && px != 0) this.panfrom();
					};

					this.move = (e) => {
						if (!this.is) return;
						if (Click.is_press && px != 0) {
							let p = e.pageX || e.changedTouches[0].clientX;
							dx = px - p;
							this.offset(dx);
							if (dx > this.offset_x) {
								this.next();
								px = 0;
							} else if (dx < this.offset_x * -1) {
								this.prev();
								px = 0;
							}
						}
					};

					root.refs.slider.addEventListener('touchmove', (e) => this.move(e));
					root.refs.slider.addEventListener('mousemove', (e) => this.move(e));
				},
				destory() {
					Click.remove('.select-left-arrow');
					Click.remove('.select-right-arrow');
					root.refs.slider.removeEventListener('touchmove', (e) => this.move(e));
					root.refs.slider.removeEventListener('mousemove', (e) => this.move(e));
					Click.ex_down = () => {};
					Click.ex_up = () => {};
				},
				offset(dx) {
					this.l = 0 - (this.index + dx / 750) * 100;
					this.tran();

					root.refs['page' + (this.index + 1)].offset(dx);
				},
				next() {
					if (!this.is) return;
					this.fadeout('next');
					this.index++;
					if (this.index >= root.nun + 1) this.index = 0;
					this.panto('next');
				},
				prev() {
					if (!this.is) return;
					this.fadeout('prev');
					this.index--;
					if (this.index < -1) this.index = root.nun - 1;
					this.panto('prev');
				},
				panto(direct) {
					this.is = false;

					this.fadein(direct);
					$(this).animate(
						{ l: 0 - this.index * 100 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.is = true;
								this.tran();
								this.set();
							},
							easing: 'easeOutQuart',
						}
					);
				},
				panfrom() {
					this.is = false;
					$(this).animate(
						{ l: 0 - this.index * 100 },
						{
							duration: 400,
							step: () => this.tran(),
							complete: () => {
								this.is = true;
								this.tran();
							},
							easing: 'easeOutBack',
						}
					);
					root.refs['page' + (this.index + 1)].offset(0);
				},
				set() {
					let oindex = this.index;
					if (this.index == 5) {
						this.index = 0;
						this.l = 0 - this.index * 100;
						this.tran();
						root.refs['page' + (this.index + 1)].show();
						root.refs['page' + (oindex + 1)].hide();
					} else if (this.index == -1) {
						this.index = 4;
						this.l = 0 - this.index * 100;
						this.tran();
						root.refs['page' + (this.index + 1)].show();
						root.refs['page' + (oindex + 1)].hide();
					}
				},
				fadein(direct) {
					let t = root.refs['page' + (this.index + 1)];
					t.fadein(direct);
				},
				fadeout(direct) {
					let t = root.refs['page' + (this.index + 1)];
					t.fadeout(direct);
				},
				tran() {
					this.c.css({
						left: this.l + '%',
					});
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => {},
			waitForAll: true,
		});
	}

	componentWillUnmount() {
		this.tr.slice.destory();
	}

	in() {
		this.tr.in();
	}

	back() {
		this.tr.back();
	}

	selected(e) {
		this.props.next(e);
		this.tr.back();
	}

	append_page() {
		let op = [];
		for (let i = 0; i < this.nun + 2; i++) {
			op.push(<Page ref={'page' + i} key={i} index={i} end={this.selected.bind(this)} />);
		}
		return op;
	}

	render() {
		return (
			<div ref='main' id='select'>
				<div className='paging'>
					<div ref='slice' className='slice'>
						{this.append_page()}
					</div>
					<div ref='slider' className='select-slider'></div>
					<div ref='submit' className='select-submit'></div>
					<div className='select-arrows'>
						<div ref='al' class='select-left-arrow'></div>
						<div ref='ar' class='select-right-arrow'></div>
					</div>
				</div>
			</div>
		);
	}
}
