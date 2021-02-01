import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');

import Hash from 'lesca-url-parameters';
import canvasTxt from 'canvas-txt';

export default class balloon extends React.Component {
	constructor(props) {
		super(props);

		const root = this;
		this.tr = {
			init() {
				this.balloon.init();
				this.canvas.init();
				const { show_puipui } = require('./../../_config');
				if (!show_puipui) root.refs.puipui.style.display = 'none';
				return this;
			},
			in() {
				this.balloon.in();
			},
			canvas: {
				txt: '',
				init() {
					this.c = root.refs.canvas;
					this.ctx = this.c.getContext('2d');
					this.ctx.transform(1.0, 0.0, -0.5, 1.2, 0, 0);
					this.draw();
				},
				update(t) {
					this.txt = t;
					this.draw();
				},
				draw() {
					this.ctx.clearRect(0, 0, 200, 200);
					canvasTxt.font = 'LiSong Pro';
					canvasTxt.fontSize = 26;
					canvasTxt.drawText(this.ctx, this.txt, 0, 0, 182, 100);
				},
				catch() {
					return this.c.toDataURL('"image/png"', 0.5);
				},
			},
			balloon: {
				x: 10,
				y: 500,
				r: 5,
				s: Hash.file() === 'success.html' ? 1.15 : 1,
				o: 1,
				delay: 0,
				deg: 0,
				time: 4000,
				radius: 10,
				init() {
					this.c = $(root.refs.balloon);
					if (Hash.file() === 'success.html') this.c.css('margin-top', '-428px');
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, y: 0, r: 0 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => {
									this.tran();
									this.swing();
								},
								easing: 'easeOutQuart',
							}
						);
				},
				swing: function () {
					EnterFrame.go = true;
					EnterFrame.play();
					EnterFrame.add(() => {
						this.deg += 0.4;
						this.x = Math.cos((Math.PI / 180) * this.deg) * this.radius;
						this.y = Math.sin((Math.PI / 180) * this.deg * 2) * this.radius;
						this.r = Math.sin((Math.PI / 180) * this.deg) * this.radius * 0.1;

						this.tran();
					});
				},
				tran() {
					this.c.css({
						transform: `scale(${this.s}) rotate(${this.r}deg)`,
						'-webkit-transform': `scale(${this.s}) rotate(${this.r}deg)`,
						'-moz-transform': `scale(${this.s}) rotate(${this.r}deg)`,
						'-o-transform': `scale(${this.s}) rotate(${this.r}deg)`,
						'-ms-transform': `scale(${this.s}) rotate(${this.r}deg)`,
						opacity: this.o,
						top: this.y + 'px',
						left: this.x + 'px',
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

	update(txt) {
		this.tr.canvas.update(txt);
	}

	visible_puipui(e) {
		if (e) this.refs.puipui.style.display = 'block';
		else this.refs.puipui.style.display = 'none';
	}

	render() {
		return (
			<div ref='balloon' id='main_balloon'>
				<div className={'ball b' + this.props.index}></div>
				<div className='draw' style={{ backgroundImage: `url(${this.props.image || require('./../../Index/fakeimage').img})` }}></div>
				<div ref='puipui' className={'puipui p' + this.props.index}></div>
				<div className='canvas_txt'>
					<canvas ref='canvas' width='130' height='120'></canvas>
				</div>
			</div>
		);
	}
}
