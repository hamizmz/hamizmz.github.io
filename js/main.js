window.website = new (function Website(document, brain, scroller) {
	var _avatar_timer = null;
	var _backdrop_timer = null;

	var _tip = document.getElementById('tip');
	var _backdrop = document.getElementById('backdrop');
	var _avatar = document.getElementById('avatar');
	var _email_anchor = document.getElementById('email');
	var _contact_me = document.getElementById('email_two');
	var _back_to_top = document.getElementById('top_btn');

	this.physics = null;

	function __main__() {
		set_emails();
		render_images();
		prepare_events();

		setup_physics();
	};

	function prepare_events() {
		_back_to_top.addEventListener('click', scroll_to_top, false);
		_avatar.addEventListener('click', render_avatar, false);
		_backdrop.addEventListener('click', render_backdrop, false);
		_backdrop.addEventListener('load', adjust_backdrop, false)
		window.addEventListener('resize', adjust_backdrop, false);

		start_avatar_timer();
		start_backdrop_timer();
		start_show_tip_timer();
	};

	function adjust_backdrop() {
		var h = window.innerHeight / 2;
		var img_h = _backdrop.height;

		var offset = Math.round(brain.get_offset(h, img_h));

		if (offset > 0)
			offset = 0;

		_backdrop.style.top = offset + 'px';
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

	function start_show_tip_timer() {
		setTimeout(show_tip, brain.get_num_in_range(4000, 6000));
	};

	function start_hide_tip_timer() {
		setTimeout(hide_tip, brain.get_num_in_range(6000, 10000));
	};

	function show_tip() {
		_tip.className = 'Active';
		start_hide_tip_timer();
	};

	function hide_tip() {
		_tip.className = '';
		start_show_tip_timer();
	};

	function render_images() {
		render_avatar.call(this);
		render_backdrop.call(this);
	};

	function set_emails() {
		var el = _email_anchor;
		var email = brain.get_email();

		set_email(el, email);
		render_email(el, email);

		set_email(_contact_me, email);
	};

	function set_email(el, em) {
		el.setAttribute(
			'href',
			'mailto:' + em
		);
		el.setAttribute(
			'title',
			'Graham, I think you are super amazing...'
		);
	};

	function render_email(el, em) {
		// em = em.replace('@', ' at ').replace('.ca', ' dot ca');
		el.innerHTML = em;
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