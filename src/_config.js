const $ = require('jquery');

module.exports = {
	begin_component: 'select',
	show_puipui: false,
	//api_path: 'https://demo.sp88.com.tw/james/laurel_202102/',
	api_path: location.hostname === 'localhost' || location.hostname == 'jameshsu1125.github.io' ? 'https://demo.sp88.com.tw/james/laurel_202102/' : 'https://laurel-riceball.com.tw/',
	ticket: function (data) {
		return new Promise((res, rej) => {
			let api = `api/save_info`;
			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: this.api_path + api,
				data: data,
				success: function (e) {
					if (e.res && e.msg === 'ok') {
						res(e);
					} else {
						rej(e);
					}
				},
			});
		});
	},
	share: function (data) {
		return new Promise((res, rej) => {
			let api = 'api/save_event';
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: this.api_path + api,
				data: data,
				success: function (e) {
					if (e.res) {
						res(e);
					} else {
						rej(e);
					}
				},
			});
		});
	},
	get: function (data) {
		return new Promise((res, rej) => {
			let api = `api/get_event?ev_id=${data.ev_id}}`;
			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: this.api_path + api,
				data: data,
				success: function (e) {
					if (e.res) {
						res(e);
					} else {
						rej(e);
					}
				},
			});
		});
	},
};
