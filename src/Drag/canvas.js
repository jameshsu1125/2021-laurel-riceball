import React from 'react';
import $ from 'jquery';
require('jquery-easing');

export default class canvas extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			is: true,
			init() {
				this.canvas.init();
				this.line.init();
			},
			draw() {
				var px = 0,
					py = 0;

				Click.ex_down = (e) => {
					if (e.target.className != 'canvas') return;
					px = e.offsetX || e.targetTouches[0].clientX;
					py = e.offsetY || e.targetTouches[0].clientY;

					let oy = 0;
					if (e.targetTouches) oy = (window.innerHeight - 750) / 2;

					this.canvas.press(px, py - oy);
					this.line.show();
				};

				Click.ex_up = (e) => {
					this.line.hide();
				};

				this.move = (e) => {
					if (!this.is) return;
					if (Click.is_press && px != 0 && py != 0) {
						px = e.offsetX || e.targetTouches[0].clientX;
						py = e.offsetY || e.targetTouches[0].clientY;
						let oy = 0;
						if (e.targetTouches) oy = (window.innerHeight - 750) / 2;
						this.canvas.move(px, py - oy);
					}
				};

				root.refs.canvas.addEventListener('touchmove', (e) => this.move(e));
				root.refs.canvas.addEventListener('mousemove', (e) => this.move(e));
			},
			line: {
				o: 0,
				time: 300,
				init() {
					this.c = $(root.refs.line);
					this.tran();
				},
				show() {
					$(this).animate(
						{ o: 1 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutQuart',
						}
					);
				},
				hide() {
					$(this).animate(
						{ o: 0 },
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
			canvas: {
				init: function () {
					this.dom = root.refs.canvas;
					this.ctx = this.dom.getContext('2d');
				},
				press: function (x, y) {
					this.ctx.beginPath();
					this.ctx.moveTo(x, y);
					this.ctx.lineWidth = 6;
				},
				move: function (x, y) {
					this.ctx.lineTo(x, y);
					this.ctx.stroke();
				},
				clear: function () {
					this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
				},
				catch: function () {
					this.img = this.dom.toDataURL('image/png', 1.0);
					root.tr.out();
					root.props.Event.clear();
				},
			},
		};
	}

	reset() {
		this.tr.canvas.clear();
	}

	componentDidMount() {
		this.tr.init();
	}

	start() {
		this.tr.draw();
	}

	render() {
		return (
			<>
				<canvas className='canvas' ref='canvas' width={750} height={750}></canvas>
				<div ref='line' className='line'></div>
			</>
		);
	}
}
