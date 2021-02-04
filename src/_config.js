const $ = require('jquery');

module.exports = {
	begin_component: 'home',
	show_puipui: require('lesca-url-parameters').default.get('puipui') == 'no' ? false : true,
	api_path: 'http://demo2.sp88.com.tw/james/laurel_202102/',
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
