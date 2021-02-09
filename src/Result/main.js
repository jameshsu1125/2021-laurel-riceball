import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import Balloon from './../Component/balloon/main';
import Balloons from './../Component/lantern/main';
import Halo from '../Component/halo/main';
import Get from 'lesca-url-parameters';
import Popup from './../Component/popup/main';
import Gtag from 'lesca-gtag';

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.target.init();
				this.again.init();
				this.share.init();
			},
			in() {
				root.refs.main.style.display = 'block';

				root.refs.balloon.in();
				root.refs.balloons.in();
				root.refs.halo.in();
				root.refs.popup.in();

				this.target.in();
				this.again.in();
				this.share.in();
			},
			back() {
				$(root.refs.main).animate({ opacity: 0 }, 1000, 'easeOutQuart', () => {
					root.props.destory('result');
				});
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
						root.txt_check({ target: root.refs.input });
						let txt = root.refs.balloon.tr.canvas.txt;
						if (txt === '') {
							alert('請輸入祈願對象');
							root.refs.input.focus();
							return;
						} else {
							root.props.add_loading();

							Gtag.event('結果頁', '分享');
							let fb_share_cagegory = ['花生天燈', '芝麻天燈', '鮮肉天燈', '流沙天燈', '抹茶天燈'];
							if (fbq) fbq('trackCustom', `天燈分享`, { type: fb_share_cagegory[root.props.index] });

							let data = {
								base64_1: root.props.image,
								base64_2: root.refs.balloon.tr.canvas.catch(),
								to_name: root.refs.input.value,
								type: root.props.index,
							};

							require('./../_config')
								.share(data)
								.then(
									(e) => {
										setTimeout(() => {
											root.props.destory_loading();
										}, 5000);
										let data = {
											ev_id: encodeURIComponent(escape(e.ev_id || '')),
										};
										let u = require('./../_config').api_path + `fbshare?ev_id=${e.ev_id}&data=${btoa(JSON.stringify(data))}`;
										let quote = [
											`${root.refs.input.value}，2021元宵節，願你身體健康有活力，從一碗芝麻湯圓開始。`,
											`${root.refs.input.value}，2021元宵節，願你好事花生一整年，從一碗花生湯圓開始。`,
											`${root.refs.input.value}，2021元宵節，願你的愛情常保鮮，從一碗鮮肉湯圓開始。`,
											`${root.refs.input.value}，2021元宵節，願你一年滿盈黃金財，從吃一碗流沙湯圓開始。`,
											`${root.refs.input.value}，2021元宵節，願你的努力回甘，從吃一碗抹茶湯圓開始。`,
										];

										root.props.FB.share({
											url: u,
											redirect_uri: Get.root() + `success.html?data=${btoa(JSON.stringify(data))}`,
											quote: quote[root.props.index - 1],
											hashtag: '宜吃桂冠湯圓新願圓',
										});
									},
									(e) => {
										alert(e.msg);
										window.location.replace(Hash.root());
									}
								);
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
						Gtag.event('結果頁', '再做一盞');
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

	back() {
		this.tr.back();
	}

	in() {
		$(this.refs.main).waitForImages({
			finished: () => this.tr.in(),
			each: (e) => {},
			waitForAll: true,
		});
		EnterFrame.go = true;
		Gtag.pv('結果頁');
		if (fbq) fbq('trackCustom', '結果頁', { path: '結果頁' });
		setTimeout(() => {
			Click.ex_down = (e) => {
				if (e.target.className != 'ninput') {
					$(this.refs.input).blur();
					this.txt_check({ target: this.refs.input });
				}
			};
		}, 1500);
	}

	txt_check(e) {
		let w = e.target.value,
			len = 0,
			char_len = 0,
			is = true;
		for (var i = 0; i < w.length; i++) {
			if (w.charCodeAt(i) > 255) {
				len += 2;
			} else {
				len += 1;
			}
			if (len >= 5 && is) {
				char_len = i + 1;
				is = false;
			}
		}

		if (len >= 5) {
			e.target.value = w.substring(0, char_len);
		}

		this.refs.balloon.update(e.target.value);
	}

	removeBlur(e) {
		$(this.refs.form).removeClass('onBlur');
		this.txt_check(e);
	}

	addBlur(e) {
		if (e.target.value.length == 0) $(this.refs.form).addClass('onBlur');
	}

	render() {
		return (
			<div ref='main' id='result'>
				<div className='container'>
					<Halo ref='halo' />
					<Balloons ref='balloons' />
					<Balloon ref='balloon' image={this.props.image} index={this.props.index} />
					<div ref='target' className='target'>
						<div ref='txt' className='txt'></div>
						<div ref='form' className='form onBlur'>
							<input className='ninput' onFocus={this.removeBlur.bind(this)} ref='input' onBlur={this.addBlur.bind(this)} type='text'></input>
						</div>
					</div>
					<Popup ref='popup' root_name={'結果頁'} ticket={this.props.ticket} />
					<div ref='again' className='btn-again'></div>
					<div ref='share' className='btn-share'></div>
				</div>
			</div>
		);
	}
}
