import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import Loader from 'lesca-react-loading';

export default class ticket extends React.Component {
	constructor(props) {
		super(props);
		this.state = { submit: true, loader: false };

		const root = this;
		this.tr = {
			init() {
				this.ctx.init();
				this.logo.init();
				this.moon.init();
				this.close.init();
				this.agree.init();
				this.submit.init();
			},
			in() {
				this.logo.in();
				this.moon.in();
				this.close.in();
			},
			out() {
				$(root.refs.main).animate({ opacity: 0 }, 500, 'easeOutQuart', () => {
					root.props.destory();
				});
			},
			evt() {
				this.agree.evt();
				this.submit.evt();
				Click.add('.submited-btn', () => {
					window.open('https://google.com');
				});
			},
			flip() {
				this.moon.flip();
			},
			submit: {
				init() {
					this.c = $(root.refs.submit);
				},
				evt() {
					Click.add('.submit', () => {
						this.check();
					});
				},
				check() {
					let name = root.refs.name.value,
						tel = root.refs.tel.value,
						email = root.refs.email.value,
						agree = root.tr.agree.checked;

					if (name === '') {
						alert('請留下您的姓名');
						return;
					} else if (tel === '') {
						alert('請留下您的電話號碼');
						return;
					} else if (tel.length < 10) {
						alert('電話號碼格式有誤');
						return;
					} else if (email === '') {
						alert('請留下您的eMail');
						return;
					} else if (email.indexOf('@') < 0) {
						alert('eMail格式有誤');
						return;
					} else if (!agree) {
						alert('請同意活動辦法及隱私權保護聲明');
						return;
					}

					let data = { name: name, tel: tel, email: email };

					root.setState({ loader: true });

					require('./../../_config')
						.ticket(data)
						.then((e) => {
							root.setState({ loader: false });
							root.tr.flip();
						});
				},
			},
			agree: {
				checked: false,
				init() {
					this.c = $(root.refs.check);
					this.h = this.c.height();
				},
				evt() {
					Click.add('.check', () => {
						this.checked = !this.checked;
						this.sync();
					});
				},
				sync() {
					if (this.checked) {
						this.c.css({
							'background-position-y': 0 - this.h + 'px',
						});
					} else {
						this.c.css({
							'background-position-y': '0',
						});
					}
				},
			},
			close: {
				s: 1.3,
				o: 0,
				time: 800,
				delay: 1400,
				init() {
					this.c = $(root.refs.close);
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
								complete: () => {
									this.tran();
									this.evt();
								},
								easing: 'easeOutElastic',
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
				evt() {
					Click.add('.close', () => {
						root.tr.out();
					});
					Click.add('.background', () => {
						root.tr.out();
					});
				},
			},
			moon: {
				o: 0,
				delay: 0,
				time: 800,
				s: 1.4,
				d: 0,
				init() {
					this.c = $(root.refs.moon);
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
								complete: () => {
									this.tran();
									this.evt();
								},
								easing: 'easeOutBack',
							}
						);
				},
				flip() {
					$(this)
						.animate(
							{ d: 90 },
							{
								duration: 500,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									root.setState({ submit: false }, () => {});
								},
								easing: 'easeInQuart',
							}
						)
						.animate(
							{ d: 0 },
							{
								duration: 500,
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
						transform: `scale(${this.s}) rotateY(${this.d}deg)`,
						'-webkit-transform': `scale(${this.s}) rotateY(${this.d}deg)`,
						'-moz-transform': `scale(${this.s}) rotateY(${this.d}deg)`,
						'-o-transform': `scale(${this.s}) rotateY(${this.d}deg)`,
						'-ms-transform': `scale(${this.s}) rotateY(${this.d}deg)`,
						opacity: this.o,
					});
				},
				evt() {
					root.tr.evt();
				},
			},
			logo: {
				o: 0,
				delay: 100,
				time: 1000,
				t: -100,
				init() {
					this.c = $(root.refs.logo);
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
								easing: 'easeOutQuart',
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
			ctx: {
				s: 1,
				init() {
					this.c = $(root.refs.ctx);
					this.resize();
					$(window).resize(() => this.resize());
				},
				resize() {
					let mh = 1333,
						h = window.innerHeight,
						s = h / mh;

					this.s = s > 1 ? 1 : s;
					this.tran();
				},
				tran() {
					this.c.css({
						transform: `scale(${this.s})`,
						'-webkit-transform': `scale(${this.s})`,
						'-moz-transform': `scale(${this.s})`,
						'-o-transform': `scale(${this.s})`,
						'-ms-transform': `scale(${this.s})`,
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

	append_content() {
		if (this.state.submit) {
			return (
				<>
					<div className='puipui'></div>
					<div className='form'>
						<input ref='name' className='name' type='text' />
						<input ref='tel' className='tel' type='tel' maxLength={10} />
						<input ref='email' className='email' type='email' />
					</div>
					<div className='term'></div>
					<div ref='check' className='check'></div>
					<div ref='submit' className='submit'></div>
				</>
			);
		} else {
			return (
				<>
					<div className='puipui'></div>
					<div className='submited-txt'></div>
					<div className='submited-btn'></div>
				</>
			);
		}
	}

	append_loader() {
		if (this.state.loader) return <Loader />;
	}

	render() {
		return (
			<div ref='main' id='ticket'>
				<div className='background'></div>
				<div ref='ctx' className='container'>
					<div ref='moon' className='moon'>
						{this.append_content()}
					</div>
					<div ref='logo' className='logo'></div>
					<div ref='close' className='close'></div>
				</div>
				{this.append_loader()}
			</div>
		);
	}
}
