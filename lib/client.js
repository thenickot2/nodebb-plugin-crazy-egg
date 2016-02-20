$(document).ready(function() {
  var runCrazyEgg = function(crazyEggSrc) {
    var element = document.getElementById('crazyegg-script');
    if (element) {
      element.parentNode.removeChild(element);
    }
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'crazyegg-script';
    script.async = true;config.id
    script.src = document.location.protocol+crazyEggSrc+"?"+Math.floor(new Date().getTime()/3600000);
    head.appendChild(script);
  }
  
	$.get(RELATIVE_PATH + '/api/plugins/crazy-egg').success(function(config) {
		runCrazyEgg(config.src);

		// Page pushing
		$(window).on('action:ajaxify.end', function(ev, data) {
			runCrazyEgg(config.src);
		});
	}).fail(function() {
		if (window.console) {
			console.warn('[plugins/crazy-egg] Your Crazy Egg Script Source could not be retrieved. Please double-check that it is set in the plugin\'s settings.');
		}
	});
});
