module.exports = {
	show_puipui: require('lesca-url-parameters').default.get('puipui') == 'no' ? false : true,
	begin_component: 'home',
	ticket: function (data) {
		console.log(data);
		return new Promise((res, rej) => {
			setTimeout(() => {
				res('ok');
			}, 1000);
		});
	},
};
