import React from 'react';
import './main.less';

import Background from '../Component/background/main';
import Logo from '../Component/logo/main';
import Fiftieth from '../Component/fiftieth/main';
import Back from '../Component/back/main';

import Home from './../Home/main';
import Select from './../Select/main';
import Drag from './../Drag/main';
import Result from './../Result/main';
import Ticket from './../Component/ticket/main';

import Click from 'lesca-click';
import Loading from './../Component/loading/main';
import FB from 'lesca-facebook-share';
import Gtag from 'lesca-gtag';
import Http2https from 'lesca-http2https';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class index extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: true, home: true, select: true, drag: true, result: true, ticket: true };

		const root = this;
		FB.install('171368189560011', {});
		Gtag.install('G-8XXTGCKBGT');
		Click.init();
		Http2https.go();

		this.drag_index = 1;
		this.img = location.hostname === 'localhost' ? require('./fake_image').img : '';

		this.tr = {
			init() {
				this.ctx.init();
			},
			in() {
				let c = location.hostname === 'localhost' ? require('./../_config').begin_component : 'home';
				let o = { ...root.state };
				delete o[c];
				for (let i in o) o[i] = false;
				root.setState(o, () => {
					root.refs[c].in();
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

	home_next() {
		this.setState({ home: false, select: true }, () => {
			this.refs.select.in();
		});
	}

	append_home() {
		if (this.state.home) return <Home ref='home' next={this.home_next.bind(this)} upup={this.bg_upup.bind(this)} />;
	}

	destory(key) {
		let o = {};
		o[key] = false;
		this.setState(o);
	}

	bg_upup() {
		this.refs.bg.upup();
	}

	select_next(e) {
		this.drag_index = e;
		this.setState({ drag: true }, () => {
			this.refs.drag.in();
			this.refs.bg.down();
		});
	}

	append_select() {
		if (this.state.select) return <Select ref='select' destory={this.destory.bind(this)} next={this.select_next.bind(this)} />;
	}

	back_prev() {
		this.refs.bg.up();
		if (this.refs.select) this.refs.select.back();
		if (this.refs.drag) this.refs.drag.back();
		if (this.refs.result) this.refs.result.back();
		this.setState({ home: true }, () => {
			this.refs.home.in();
		});
	}

	append_back() {
		if (this.state.select || this.state.drag) return <Back back={this.back_prev.bind(this)} />;
	}

	append_loading() {
		if (this.state.loading) return <Loading text={'檔案下載中...'} />;
	}

	drag_capture(e) {
		this.img = e;
		this.setState({ result: true }, () => {
			setTimeout(() => this.refs.result.in(), 1000);
		});
	}

	drag_end() {
		this.setState({ drag: false });
	}

	append_drag() {
		if (this.state.drag) return <Drag ref='drag' destory={this.destory.bind(this)} index={this.drag_index} capture={this.drag_capture.bind(this)} end={this.drag_end.bind(this)} />;
	}

	result_ticket() {
		this.setState({ ticket: true }, () => {
			this.refs.ticket.in();
		});
	}

	add_loading() {
		this.setState({ loading: true });
	}

	destory_loading() {
		this.setState({ loading: false });
	}

	append_result() {
		if (this.state.result)
			return (
				<Result
					ref='result'
					ticket={this.result_ticket.bind(this)}
					destory={this.destory.bind(this)}
					image={this.img}
					FB={FB}
					index={this.drag_index}
					add_loading={this.add_loading.bind(this)}
					destory_loading={this.destory_loading.bind(this)}
				/>
			);
	}

	ticket_destory() {
		this.setState({ ticket: false });
	}

	append_ticket() {
		if (this.state.ticket) return <Ticket ref='ticket' destory={this.ticket_destory.bind(this)} />;
	}

	render() {
		return (
			<div ref='main' id='index'>
				<Background ref='bg' />
				<div ref='ctx' className='ctx'>
					{this.append_home()}
					{this.append_select()}
					{this.append_drag()}
					{this.append_result()}
				</div>
				{this.append_back()}
				<Logo />
				<Fiftieth />
				{this.append_ticket()}
				{this.append_loading()}
			</div>
		);
	}
}
