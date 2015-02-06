window.scroller = new (function Scroller() {
	var _timer = null;
	var _target = 0;
	var _current = 0;

	var INTERVAL = 25;

	function setup_timer(offset, callback, interval) {
		_current = offset;
		_timer = setInterval(callback, interval);
	};

	function callback() {
		var current = _current = tween(_current, _target);
		window.scroll(0, current);

		if (current === _target) {
			clearInterval(_timer);
			_timer = null;
		}
	};

	function tween(current, target) {
		return current + Math.floor((target - current) * 0.25);
	};

	this.scroll_to = function(y_pos) {
		_target = y_pos;

		if (!_timer)
			setup_timer(window.pageYOffset, callback, INTERVAL);
	};
})();