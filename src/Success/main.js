import React from 'react';
import './main.less';

import Background from '../Component/background/main';
import Logo from '../Component/logo/main';
import Fiftieth from '../Component/fiftieth/main';

import Click from 'lesca-click';
import EnterFrame from 'lesca-enterframe';
import Loading from 'lesca-react-loading';
import Success from './success';
import Hash from 'lesca-url-parameters';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;

		this.data = JSON.parse(unescape(decodeURIComponent(atob(Hash.get('data').split('#')[0].split('%3D').join('')))));

		this.state = { loading: true, success: true };
		console.log(this.data);
		// ? this.image = '';
		//console.log(this.data);

		//script
		Click.init();
		EnterFrame.init();

		this.tr = {
			init() {
				this.ctx.init();
			},
			in() {
				let is_ticket = root.state.ticket;
				let c = location.hostname === 'localhost' ? 'success' : 'success';
				let o = { ...root.state };
				delete o[c];
				for (let i in o) o[i] = false;

				root.setState(o, () => {
					root.refs[c].in();
					root.refs.bg.up();

					if (is_ticket) root.setState({ ticket: true });
				});
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

	ticket_destory() {
		this.setState({ ticket: false });
	}

	append_loading() {
		if (this.state.loading) return <Loading />;
	}

	append_success() {
		if (this.state.success) return <Success ref='success' data={this.data} />;
	}

	render() {
		return (
			<div ref='main' id='success'>
				<Background ref='bg' />
				<div ref='ctx' className='ctx'>
					{this.append_success()}
				</div>
				{this.append_loading()}
				<Fiftieth />
				<Logo />
			</div>
		);
	}
}
