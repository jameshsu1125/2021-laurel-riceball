module.exports = {
	begin_component: 'home',
	show_puipui: require('lesca-url-parameters').default.get('puipui') == 'no' ? false : true,
	ticket: function (data) {
		console.log(data);
		return new Promise((res, rej) => {
			setTimeout(() => {
				res('ok');
			}, 1000);
		});
	},
	share: function (data) {
		console.log(data);
		return new Promise((res, rej) => {
			setTimeout(() => {
				res('ok');
			}, 1000);
		});
	},
};
