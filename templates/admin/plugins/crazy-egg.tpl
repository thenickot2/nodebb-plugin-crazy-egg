<h1><i class="fa fa-bar-chart-o"></i> Crazy Egg</h1>

<div class="alert alert-info">
	<p>
		To begin with Crazy Egg, create an account <a href="https://www.crazyegg.com"><strong>here</strong></a>.
	</p>
	<p>
		Once you have an account, visit <a href="https://www.crazyegg.com/instructions">https://www.crazyegg.com/instructions</a>. Observe the code snippet under "I can add JavaScript to my pages", specifically the line beginning with "a.src". Copy the string formatted as "//script.crazyegg.com/pages/scripts/0000/0000.js" without the quotes.
	</p>
	<p>
		Restart NodeBB to start using Crazy Egg.
	</p>
</div>

<form role="form" class="crazy-egg">
	<fieldset>
		<div class="form-group">
			<label for="src">Tracking Script Source</label>
			<input type="text" class="form-control" id="src" name="src" placeholder="//script.crazyegg.com/pages/scripts/0000/0000.js" />
		</div>

		<button class="btn btn-lg btn-primary" id="save" type="button">Save</button>
	</fieldset>
</form>

<script type="text/javascript">
	require(['settings'], function(Settings) {
		Settings.load('crazy-egg', $('.crazy-egg'));

		$('#save').on('click', function() {
			Settings.save('crazy-egg', $('.crazy-egg'), function() {
				app.alert({
					type: 'success',
					alert_id: 'crazy-egg-saved',
					title: 'Settings Saved'
				});
			});
		});
	});
</script>