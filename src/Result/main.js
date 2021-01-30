import React from 'react';
import './main.less';

import $, { timers } from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import Balloon from './balloon';
import Balloons from './balloons';
import Halo from './halo';

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.target.init();
				this.popup.init();
				this.again.init();
				this.share.init();
			},
			in() {
				root.refs.main.style.display = 'block';
				root.refs.balloon.in();
				root.refs.balloons.in();
				root.refs.halo.in();

				this.target.in();
				this.popup.in();
				this.again.in();
				this.share.in();
			},
			share: {
				o: 0,
				t: 100,
				delay: 3300,
				time: 1000,
				init() {
					this.c = $(root.refs.share);
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
					Click.add('.btn-share', () => {
						if (root.refs.balloon.state.txt === '') {
							alert('請輸入祈願對象');
							root.refs.input.focus();
							return;
						} else {
							//root.props.FB
							let data = btoa(JSON.stringify({ who: root.refs.balloon.state.txt }));
							root.props.FB.share({
								url: 'https://www.google.com',
								redirect_uri: window.location.href + `?data=${data}`,
							});
						}
					});
				},
			},
			again: {
				o: 0,
				t: 100,
				delay: 3000,
				time: 1000,
				init() {
					this.c = $(root.refs.again);
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
					$(this).animate(
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
					Click.add('.btn-again', () => {
						setTimeout(() => {
							window.location.reload();
						}, 300);
					});
				},
			},
			popup: {
				o: 0,
				s: 0,
				delay: 5000,
				time: 800,
				init() {
					this.c = $(root.refs.popup);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, s: 1 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeOutBack',
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
					});
				},
			},
			target: {
				o: 0,
				delay: 3000,
				time: 1000,
				init() {
					this.c = $(root.refs.target);
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
	}

	in() {
		this.tr.in();
		EnterFrame.go = true;
	}

	txt_change(e) {
		this.refs.balloon.update(e.target.value);
	}

	render() {
		return (
			<div ref='main' id='result'>
				<div className='container'>
					<Halo ref='halo' />
					<Balloons ref='balloons' />
					<Balloon ref='balloon' image={this.props.image} />
					<div ref='target' className='target'>
						<div ref='txt' className='txt'></div>
						<div ref='form' className='form'>
							<input ref='input' onChange={this.txt_change.bind(this)} type='text' maxLength='4'></input>
						</div>
					</div>
					<div ref='popup' className='popup'></div>
					<div ref='again' className='btn-again'></div>
					<div ref='share' className='btn-share'></div>
				</div>
			</div>
		);
	}
}
