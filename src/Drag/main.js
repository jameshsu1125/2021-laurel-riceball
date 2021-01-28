import React from 'react';
import './main.less';
import Canvas from './canvas';

import Demo from './demo';

import $ from 'jquery';
require('jquery-easing');

export default class main extends React.Component {
	constructor(props) {
		super(props);

		this.state = { demo: true };
		const root = this;
		this.tr = {
			init() {
				this.title.init();
				this.reset.init();
				this.submit.init();
				this.blur.init();
			},
			in() {
				this.title.in();
				this.blur.in();
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
				tran() {
					this.c.css({
						opacity: this.o,
						top: this.t + 'px',
					});
				},
				evt() {
					Click.add('.btn-reset', () => {
						root.refs.canvas.reset();
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
				tran() {
					this.c.css({
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

	in() {
		this.tr.in();
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
			<div id='drag'>
				<div className='container'>
					<div className={`riceball type-${this.props.index}`}></div>
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
