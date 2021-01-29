import React from 'react';
import './main.less';

import Background from '../Component/background/main';
import Logo from '../Component/logo/main';
import Fiftieth from '../Component/fiftieth/main';
import Back from '../Component/back/main';

import Home from './../Home/main';
import Select from './../Select/main';
import Drag from './../Drag/main';

import Click from 'lesca-click';
import Loading from 'lesca-react-loading';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class index extends React.Component {
	constructor(props) {
		super(props);

		const root = this;

		this.state = { loading: true, home: true, select: true, drag: true };

		this.drag_index = 1;
		this.img = location.hostname === 'localhost' ? require('./fakeimage').img : '';

		Click.init();

		this.tr = {
			init() {
				this.ctx.init();
			},
			in() {
				let c = location.hostname === 'localhost' ? 'drag' : 'home';
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

	select_destory() {
		this.setState({ select: false });
	}

	bg_upup() {
		this.refs.bg.upup();
	}

	select_next(e) {
		this.drag_index = e;
		this.setState({ drag: true }, () => {
			this.refs.drag.in();
			this.refs.bg.down();

			// setTimeout(() => {
			// 	this.setState({ select: false });
			// }, 1);
		});
	}

	append_select() {
		if (this.state.select) return <Select ref='select' destory={this.select_destory.bind(this)} next={this.select_next.bind(this)} />;
	}

	back_prev() {
		this.refs.bg.up();
		this.refs.select.back();
		this.setState({ home: true }, () => {
			this.refs.home.in();
		});
	}

	append_back() {
		if (this.state.select) return <Back back={this.back_prev.bind(this)} />;
	}

	append_loading() {
		if (this.state.loading) return <Loading />;
	}

	drag_capture(e) {
		this.img = e;
	}

	drag_end() {
		this.setState({ drag: false });
	}

	append_drag() {
		if (this.state.drag) return <Drag ref='drag' index={this.drag_index} capture={this.drag_capture.bind(this)} end={this.drag_end.bind(this)} />;
	}

	render() {
		return (
			<div ref='main' id='index'>
				<Background ref='bg' />
				<div ref='ctx' className='ctx'>
					{this.append_home()}
					{this.append_select()}
					{this.append_drag()}
				</div>
				{this.append_back()}
				{this.append_loading()}
				<Logo />
				<Fiftieth />
			</div>
		);
	}
}
