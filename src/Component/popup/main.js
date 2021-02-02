import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');

import Gtag from 'lesca-gtag';

export default class popup extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.popup.init();
			},
			in() {
				this.popup.in();
			},
			popup: {
				o: 0,
				s: 0,
				delay: 3000,
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
								complete: () => {
									this.tran();
									this.evt();
								},
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
				evt() {
					Click.add('.ticket', () => {
						root.props.ticket();
						Gtag.event(root.props.root_name, '點我看最萌圓動力');
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

	render() {
		return (
			<div ref='popup' id='popup'>
				<div className='ticket'></div>
				<div className='ticket'></div>
			</div>
		);
	}
}
