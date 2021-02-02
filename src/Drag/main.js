import React from 'react';
import './main.less';
import Canvas from './canvas';

import Demo from './demo';
import Gtag from 'lesca-gtag';

import $ from 'jquery';
require('jquery-easing');

export default class main extends React.Component {
	constructor(props) {
		super(props);

		this.state = { demo: true };
		const root = this;
		this.tr = {
			init() {
				this.container.init();
				this.title.init();
				this.reset.init();
				this.submit.init();
				this.blur.init();
			},
			in() {
				$(root.refs.main).css('display', 'block');
				this.title.in();
				this.blur.in();
			},
			out() {
				this.title.out();
				this.reset.out();
				this.submit.out();
				this.blur.out();
				this.container.out();
			},
			back() {
				$(root.refs.main).animate({ opacity: 0 }, 1000, 'easeOutQuart', () => {
					root.props.destory('drag');
				});
			},
			container: {
				s: 1,
				o: 1,
				t: 0,
				time: 1200,
				init() {
					this.c = $(root.refs.container);
				},
				out() {
					$(this).animate(
						{ s: 1, o: 0, t: 0 - window.innerHeight },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								root.props.end();
							},
							easing: 'easeInQuart',
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
						opacity: this.o,
						'margin-top': this.t + 'px',
					});
				},
			},
			blur: {
				o: 0,
				delay: 0,
				time: 1000,
				init() {
					this.c = $(root.refs.blur);
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
								easing: 'easeInOutQuart',
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
							easing: 'easeInOutQuart',
						}
					);
				},
				tran() {
					this.c.css({
						opacity: this.o,
					});
				},
			},
			submit: {
				o: 0,
				t: 100,
				delay: 300,
				time: 1000,
				init() {
					this.c = $(root.refs.submit);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, t: 0 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									this.evt();
								},
								easing: 'easeInOutQuart',
							}
						);
				},
				out() {
					$(this)
						.delay(200)
						.animate(
							{ o: 0, t: 100 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									this.evt();
								},
								easing: 'easeInOutQuart',
							}
						);
				},
				tran() {
					this.c.css({
						opacity: this.o,
						top: this.t + 'px',
					});
				},
				evt() {
					Click.add('.btn-submit', () => {
						if (root.refs.canvas.check()) {
							Click.remove('.btn-submit');
							Click.remove('.btn-reset');
							root.tr.out();
							let e = root.refs.canvas.capture();
							root.props.capture(e);
							Gtag.event('手寫頁', '升起天燈');
						} else {
							alert('是不是應該寫點什麼?');
						}
					});
				},
			},
			reset: {
				o: 0,
				t: 100,
				delay: 0,
				time: 1000,
				init() {
					this.c = $(root.refs.reset);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, t: 0 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									this.evt();
								},
								easing: 'easeInOutQuart',
							}
						);
				},
				out() {
					$(this)
						.delay(200)
						.animate(
							{ o: 0, t: 100 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									this.evt();
								},
								easing: 'easeInOutQuart',
							}
						);
				},
				tran() {
					this.c.css({
						opacity: this.o,
						top: this.t + 'px',
					});
				},
				evt() {
					Click.add('.btn-reset', () => {
						root.refs.canvas.reset();
						Gtag.event('手寫頁', '重寫');
					});
				},
			},
			title: {
				o: 0,
				t: 100,
				time: 2000,
				init() {
					this.c = $(root.refs.title);
					this.tran();
				},
				in() {
					$(this).animate(
						{ o: 1, t: 0 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeInOutQuart',
						}
					);
				},
				out() {
					$(this).animate(
						{ o: 0 },
						{
							duration: 1000,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeInOutQuart',
						}
					);
				},
				tran() {
					this.c.css({
						opacity: this.o,
						top: this.t + 'px',
					});
				},
			},
		};
	}

	back() {
		this.tr.back();
	}

	componentWillUnmount() {
		Click.remove('.btn-reset');
		Click.remove('.btn-submit');
	}

	componentDidMount() {
		this.tr.init();
	}

	in() {
		this.tr.in();
		Gtag.pv('手寫頁');
	}

	demo_end() {
		this.setState({ demo: false }, () => {
			this.refs.canvas.start();
			this.tr.reset.in();
			this.tr.submit.in();
		});
	}

	append_demo() {
		if (this.state.demo) return <Demo end={this.demo_end.bind(this)} />;
	}

	render() {
		return (
			<div ref='main' id='drag'>
				<div ref='container' className='container'>
					<div ref='riceball' className={`riceball type-${this.props.index}`}></div>
					<div ref='blur' className='blur'></div>
					<Canvas ref='canvas' />
					{this.append_demo()}
					<div ref='title' className='title'></div>
					<div ref='reset' className='btn-reset'></div>
					<div ref='submit' className='btn-submit'></div>
				</div>
			</div>
		);
	}
}
