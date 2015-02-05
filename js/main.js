window.website = new (function Website(document, brain) {
	var _backdrop = document.getElementById('backdrop');
	var _avatar = document.getElementById('avatar');
	var _email_anchor = document.getElementById('email');

	function __main__() {
		set_email.call(this);
		render_images.call(this);
		setup_physics.call(this);
	};

	function render_images() {
		render_avatar.call(this);
		render_backdrop.call(this);
	};

	function set_email() {
		var e = _email_anchor

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

	};

	__main__.call(this);
})(window.document, window.brain);