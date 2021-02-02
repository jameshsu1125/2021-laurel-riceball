import React from 'react';
import './success.less';

import Halo from './../Component/halo/main';
import Lantern from './../Component/lantern/main';
import Balloon from './../Component/balloon/main';
import Popup from './../Component/popup/main';
import Gtag from 'lesca-gtag';
import Hash from 'lesca-url-parameters';

import $ from 'jquery';
require('jquery-easing');

export default class success extends React.Component {
	constructor(props) {
		super(props);

		const root = this;
		this.tr = {
			init() {
				this.btn.init();
				root.refs.balloon.update(root.props.data.to);
			},
			in() {
				root.refs.main.style.display = 'block';

				root.refs.balloon.in();
				root.refs.balloons.in();
				root.refs.halo.in();
				root.refs.popup.in();

				root.refs.balloon.visible_puipui(root.props.data.puipui);

				this.btn.in();
			},
			btn: {
				o: 0,
				t: 100,
				delay: 1800,
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
					Click.add('.btn', () => {
						setTimeout(() => {
							window.location.href = Hash.root();
						}, 300);
						Gtag.event('UGC頁', '自己做一個');
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
		Gtag.pv('UGC頁');
	}

	render() {
		return (
			<div ref='main' className='success'>
				<div className='container'>
					<Halo ref='halo' />
					<Lantern ref='balloons' />
					<Balloon ref='balloon' image={this.props.data.image || ''} index={this.props.data.i} />
					<Popup ref='popup' root_name={'UGC頁'} ticket={this.props.ticket} />
					<div ref='btn' className='btn'></div>
				</div>
			</div>
		);
	}
}
