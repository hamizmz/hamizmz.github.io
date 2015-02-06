window.website = new (function Website(document, brain, scroller) {
	var _avatar_timer = null;
	var _backdrop_timer = null;

	var _backdrop = document.getElementById('backdrop');
	var _avatar = document.getElementById('avatar');
	var _email_anchor = document.getElementById('email');
	var _back_to_top = document.getElementById('top_btn');

	this.physics = null;

	function __main__() {
		set_email.call(this);
		render_images.call(this);
		prepare_events.call(this);

		setup_physics.call(this);
	};

	function prepare_events() {
		_back_to_top.addEventListener('click', scroll_to_top, false);
		_avatar.addEventListener('click', render_avatar, false);
		_backdrop.addEventListener('click', render_backdrop, false);

		start_avatar_timer();
		start_backdrop_timer();
	};

	function scroll_to_top() {
		scroller.scroll_to(0);
	};

	function start_avatar_timer() {
		_avatar_timer = setInterval(render_avatar, brain.get_num_in_range(12000, 16000));
	};

	function start_backdrop_timer() {
		_backdrop_timer = setInterval(render_backdrop, brain.get_num_in_range(8000, 10000));
	};

	function render_images() {
		render_avatar.call(this);
		render_backdrop.call(this);
	};

	function set_email() {
		var e = _email_anchor;

		e.setAttribute(
			'href',
			'mailto:' + brain.get_email()
		);
		e.setAttribute(
			'title',
			'Graham, I think you are super amazing...'
		);
	};

	function render_avatar() {
		_avatar.src = brain.get_new_avatar();
	};

	function render_backdrop() {
		_backdrop.src = brain.get_new_gif();
	};

	function setup_physics() {
		// This does nothing yet... COMING SOON!
	};

	// API
	this.render_new_avatar = render_avatar;
	this.render_new_backdrop = render_backdrop;
	this.scroll_to_top = scroll_to_top;

	__main__.call(this);
})(window.document, window.brain, window.scroller);