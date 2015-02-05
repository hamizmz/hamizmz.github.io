var physics = new (function Physics() {
	/*

		Just a wee physics engine.

	*/

	var Vector = this.Vector = function Vector(_x, _y, _z) {
		this.x = _x || 0.0;
		this.y = _y || 0.0;
		this.z = _z || 0.0;
	};
	Vector.prototype = new (function() {
		this.add = function(v) {
			this.x += v.x;
			this.y += v.y;
			this.z += v.z;
		};

		this.sub = function(v) {
			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;
		};

		this.scale = function(f) {
			this.x *= f;
			this.y *= f;
			this.z *= f;
		};

		this.dot = function(v) {
			return this.x * v.x + this.y * v.y + this.z * v.z;
		};

		this.cross = function(v) {
			return this.x * v.y - this.y * v.x - this.z * v.z;
		};

		this.mag = function() {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		};

		this.magSq = function() {
			return this.x * this.x + this.y * this.y + this.z * this.z;
		};

		this.dist = function(v) {
			var dx = v.x - this.x;
			var dy = v.y - this.y;
			var dz = v.z - this.z;
			return Math.sqrt(dx * dx + dy * dy + dz * dz);
		};

		this.distSq = function(v) {
			var dx = v.x - this.x;
			var dy = v.y - this.y;
			var dz = v.z - this.z;
			return dx * dx + dy * dy + dz * dz;
		};

		this.norm = function() {
			var m = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
			this.x /= m;
			this.y /= m;
			this.z /= m;
		};

		this.limit = function(l) {
			var mSq = this.x * this.x + this.y * this.y + this.z * this.z;
			if (mSq > l * l) {
				var m = Math.sqrt(mSq);
				this.x /= m;
				this.y /= m;
				this.z /= m;
				this.x *= l;
				this.y *= l;
				this.z *= l;
			}
		};

		this.copy = function(v) {
			this.x = v.x;
			this.y = v.y;
			this.z = v.z;
		};

		this.clone = function() {
			return new Vector(this.x, this.y, this.z);
		};

		this.clear = function() {
			this.x = 0.0;
			this.y = 0.0;
			this.z = 0.0;
		};
	})();
	Vector.add = function(v1, v2) {
		return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
	};
	Vector.sub = function(v1, v2) {
		return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
	};
	Vector.project = function(v1, v2) {
		return v1.clone().scale((v1.dot(v2)) / v1.magSq());
	};

	var Particle = this.Particle = function Particle(_display) {
		this.display = _display;
		this.laws = [];

		this.position = new Vector();
		this.old = {
			position: new Vector()
		};
		this.velocity = new Vector();
		this.acceleration = new Vector();

		this.fixed = false;
		this.width = 1;
		this.height = 1;
	};
	Particle.prototype.abide = function(index) {
		for (var i = 0, len = this.laws.length; i < len; i++)
			this.laws[i].enforce(this, index);
	};
	Particle.prototype.moveTo = function(pos) {
		this.pos.copy(pos);
		this.old.pos.copy(pos);
	};

	this.Law = function Law() {
		this.enabled = true;

		this.enforce = function() {
			//
		};
	};
	
	this.Universe = function Universe(_renderFN) {
		this.particles = [];
		this.laws = [];

		var _clock = 0;

		var integrate = function(el, dtSq) {
			el.old.position.copy(el.position);
			el.acceleration.scale(dtSq);
			el.velocity.add(el.acceleration);
			el.position.add(el.velocity);
		};
		
		this.step = function() {
			if (!_clock)
				_clock = (new Date()).getTime();

			var time = (new Date()).getTime();
			var delta = (time - _clock) * 0.001;
			var deltaSq = delta * delta;

			for (var i = 0, len = this.particles.length; i < len; i++) {
				var el = this.particles[i];

				for (var j = 0, len1 = this.laws.length; j < len1; j++)
					this.laws[j].enforce(el, i);
				
				el.abide(i);
				
				integrate(el, deltaSq);
				this.render(el, i);

				_clock = time;
			}
		};
		
		this.render = _renderFN;
	};
})();