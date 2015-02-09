/*

	Looking at the source code, eh?  Let me know what you think.
	I'm trying something new by having fewer functions depend on
	global variables and constants.  I think it makes things a
	little easier to read.  Agree?


*/
window.brain = new (function Brain(Math) {
	// Some private variables
	var EMAIL = 'root@graham-robertson.ca';
	var GIFS_DIR = 'media/backdrops/';
	var AVATAR_DIR = 'media/profiles/';
	var GIF_FILES = [
		'pizza.gif',
		'chicken.gif',
		'bacon.gif',
		'banana.gif',
		'coffee.gif',
		'future.gif',
		'makeitrain.gif',
		'panda.gif',
		'patrick.gif',
		'sausages.gif',
		'internet.gif',
		'scream.gif',
		'rugrats.gif',
		'homer.gif'
	];
	var AVATAR_FILES = [
		'smug.jpg',
		'cat.jpg',
		'style.jpg',
		'anger.jpg',
		'danger.jpg',
		'hat.jpg'
	];

	// returns a number between 0 and max
	var get_rand_num = this.get_rand_num = function(max) {
		return Math.round(Math.random() * max);
	}

	var get_num_in_range = this.get_num_in_range = function(min, max) {
		return get_rand_num(max - min) + min;
	};

	var get_rand_item = this.get_rand_item = function(list) {
		return list[get_rand_num(list.length - 1)];
	};

	function get_rand_photo(dir, list) {
		return dir + get_rand_item(list);
	};

	this.get_new_gif = function() {
		return get_rand_photo(GIFS_DIR, GIF_FILES);
	};

	this.get_new_avatar = function() {
		return get_rand_photo(AVATAR_DIR, AVATAR_FILES);
	};

	this.get_offset = function(a, b) {
		return (a - b) / 2;
	};

	this.get_email = function() {
		return EMAIL;
	};
})(window.Math);