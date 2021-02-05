import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');

export default class loading extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.ctx.init();
			},
			ctx: {
				s: 1,
				init() {
					this.c = $(root.refs.ctx);
					this.resize();
					$(window).resize(() => this.resize());
				},
				remove() {
					$(window).off('resize');
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
	}

	componentWillUnmount() {
		this.tr.ctx.remove();
	}

	append_ico() {
		let op = [];
		for (let i = 0; i < 8; i++) {
			op.push(<div key={i}></div>);
		}
		return op;
	}

	render() {
		return (
			<div id='loading'>
				<div ref='ctx' className='c'>
					<div className='ico'>{this.append_ico()}</div>
					<div className='txt'></div>
				</div>
			</div>
		);
	}
}
