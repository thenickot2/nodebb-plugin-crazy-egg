var	winston = module.parent.require('winston'),
	Meta = module.parent.require('./meta'),

	CrazyEgg = {
		settings: {}
	};

CrazyEgg.init = function(data, callback) {
	function render(req, res, next) {
		res.render('admin/plugins/crazy-egg', {});
	}

	data.router.get('/admin/plugins/crazy-egg', data.middleware.admin.buildHeader, render);
	data.router.get('/api/admin/plugins/crazy-egg', render);
	data.router.get('/api/plugins/crazy-egg', function(req, res) {
		if (CrazyEgg.settings) {
			res.status(200).json(CrazyEgg.settings);
		} else {
			res.send(501);
		}
	});

	// Load asset ID from config
	CrazyEgg.loadSettings();

	callback();
};

CrazyEgg.loadSettings = function() {
	Meta.settings.get('crazy-egg', function(err, settings) {
    var valid = settings.src
      && settings.src.length > 0
      && settings.src.indexOf('//script.crazyegg.com/pages/scripts/') === 0;
		if (!err && valid) {
			CrazyEgg.settings = settings;
		} else {
			winston.error('A Crazy Egg src (e.g. //script.crazyegg.com/pages/scripts/0000/0000.js) was not specified. Please complete setup in the administration panel.');
		}
	});
};

CrazyEgg.onConfigChange = function(hash) {
	if (hash === 'settings:crazy-egg') {
		CrazyEgg.loadSettings();
	}
};

CrazyEgg.routeMenu = function(custom_header, callback) {
	custom_header.plugins.push({
		"route": '/plugins/crazy-egg',
		"icon": 'fa-bar-chart-o',
		"name": 'Crazy Egg'
	});

	callback(null, custom_header);
};

CrazyEgg.getNotices = function(notices, callback) {
  var valid = CrazyEgg.settings.src !== undefined 
    && CrazyEgg.settings.src.length > 0
    && CrazyEgg.settings.src.indexOf('//script.crazyegg.com/pages/scripts/') === 0;
	notices.push({
		done: valid,
		doneText: 'Crazy Egg OK',
		notDoneText: 'Crazy Egg needs setup'
	});

	callback(null, notices);
}

module.exports = CrazyEgg;
