import React from 'react';
import './main.less';

import Balloon from './balloon';
import Balloons from './balloons';

import EnterFrame from 'lesca-enterframe';
import Halo from './halo';
import Gtag from 'lesca-gtag';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class main extends React.Component {
	constructor(props) {
		super(props);

		EnterFrame.init();

		const root = this;
		this.tr = {
			init() {
				this.txt.init();
				this.btn.init();
			},
			in() {
				$(root.refs.main).css('display', 'block');
				this.txt.in();
				this.btn.in();
			},
			out() {
				EnterFrame.stop();
				root.props.upup();
				let index = 0;
				let n = [100, 200, 800, 700, 1000];
				$(root.refs.container)
					.children('div')
					.each(function (i) {
						$(this).animate(
							{
								top: `-=${n[i]}px`,
								opacity: 0,
							},
							1200 + 300 * i,
							'easeInCubic',
							() => {
								if (index == 4) root.props.next();
								index++;
							}
						);
					});
			},
			btn: {
				o: 0,
				t: 100,
				delay: 3800,
				time: 1000,
				init() {
					this.c = $(root.refs.btn);
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
				evt() {
					Click.add('.home-btn', () => {
						Click.remove('.home-btn');
						root.tr.out();
						Gtag.event('首頁', '製作湯圓天燈');
					});
				},
			},
			txt: {
				y: 100,
				o: 0,
				init() {
					this.c = $(root.refs.txt);
					this.tran();
				},
				in() {
					this.c.children('div').each(function (i) {
						$(this)
							.delay(2200 + 400 * i)
							.animate({ top: '0px', opacity: 1 }, 2000, 'easeOutQuart');
					});
				},
				tran() {
					this.c.children('div').css({
						top: this.y + 'px',
						opacity: this.o,
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

	in() {
		this.tr.in();
		this.refs.halo.in();
		this.refs.balloons.in();
		this.refs.balloon.in();
		Gtag.pv('首頁');

		if (fbq) fbq('trackCustom', '首頁', { path: '首頁' });
	}

	componentWillUnmount() {
		Click.remove('.home-btn');
		EnterFrame.stop();
	}

	render() {
		return (
			<div ref='main' id='home'>
				<div ref='container' className='container'>
					<Halo ref='halo' />
					<Balloons ref='balloons' />
					<Balloon ref='balloon' />
					<div ref='txt' className='txt'>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div ref='btn' className='home-btn'></div>
				</div>
			</div>
		);
	}
}
