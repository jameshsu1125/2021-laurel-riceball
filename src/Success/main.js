import React from 'react';
import './main.less';

import Background from '../Component/background/main';
import Logo from '../Component/logo/main';
import Fiftieth from '../Component/fiftieth/main';
import Ticket from './../Component/ticket/main';

import Click from 'lesca-click';
import EnterFrame from 'lesca-enterframe';
import Loading from 'lesca-react-loading';
import Success from './success';
import Hash from 'lesca-url-parameters';
import Gtag from 'lesca-gtag';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;

		this.data = JSON.parse(unescape(decodeURIComponent(atob(Hash.get('data').split('#')[0].split('%3D').join('')))));
		this.state = { loading: true, success: false, ticket: false };

		Click.init();
		EnterFrame.init();
		Gtag.install('G-8XXTGCKBGT');

		this.tr = {
			init() {
				this.ctx.init();
			},
			in(e) {
				let c = location.hostname === 'localhost' ? 'success' : 'success';
				let o = { ...root.state };
				delete o[c];
				for (let i in o) o[i] = false;

				root.setState(o, () => {
					root.refs[c].in();
					root.refs.bg.up();
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

		require('./../_config')
			.get(this.data)
			.then(
				(e) => {
					this.image = e.base64_1;
					this.data = Object.assign(this.data, e);
					//console.log(this.data);
					this.setState({ loading: true, success: true, ticket: true }, () => {
						$(this.refs.main).waitForImages({
							finished: () => this.tr.in(),
							waitForAll: true,
						});
					});
				},
				(e) => {
					alert(e.msg);
					window.location.replace(Hash.root());
				}
			);
	}

	append_loading() {
		if (this.state.loading) return <Loading />;
	}

	append_success() {
		if (this.state.success) return <Success ref='success' ticket={this.get_ticket.bind(this)} data={this.data} />;
	}

	get_ticket() {
		this.setState({ ticket: true }, () => {
			this.refs.ticket.in();
		});
	}

	destory_ticket() {
		this.setState({ ticket: false });
	}

	append_ticket() {
		if (this.state.ticket) return <Ticket ref='ticket' destory={this.destory_ticket.bind(this)} />;
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
				{this.append_ticket()}
			</div>
		);
	}
}
