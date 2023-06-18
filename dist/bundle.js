(() => {
	'use strict';
	var t = {
		n: (e) => {
			var r = e && e.__esModule ? () => e.default : () => e;
			return t.d(r, { a: r }), r;
		},
		d: (e, r) => {
			for (var n in r) t.o(r, n) && !t.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: r[n] });
		},
		o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
	};
	require('dotenv/config');
	const e = require('http');
	var r = t.n(e);
	const n = require('compression');
	var o = t.n(n);
	const a = require('cors');
	var i = t.n(a);
	const u = require('express');
	var c = t.n(u);
	const s = require('express-session');
	var l = t.n(s);
	const f = require('morgan');
	var h = t.n(f);
	const p = require('passport');
	var v = t.n(p);
	const d = require('path');
	var y = t.n(d);
	const m = require('multer');
	var g = t.n(m);
	const w = require('mongoose');
	var b = t.n(w);
	const x = require('mongoose-autopopulate');
	var L = t.n(x);
	const E = require('mongoose-slug-generator');
	var j = t.n(E);
	const O = require('mongoose-paginate-v2');
	var k = t.n(O),
		_ = b().Schema(
			{
				title: { type: String, require: !0 },
				slug: { type: String, slug: ['title'], unique: !0 },
				artists: [{ type: b().Schema.Types.ObjectId, ref: 'Artist', autopopulate: !0 }],
				genre: { type: b().Schema.Types.ObjectId, ref: 'Genre', autopopulate: !0 },
				album: {
					type: b().Schema.Types.ObjectId,
					ref: 'Album',
					autopopulate: { select: '_id title image -artist' },
				},
				fileId: { type: String, require: !0 },
				thumbnail: { type: String },
				trackSrc: { type: String },
				downloadUrl: { type: String },
				listen: { type: Number, default: 0 },
				uploader: { type: b().Schema.Types.ObjectId, ref: 'User' },
				fileName: { type: String },
				duration: { type: Number, require: !0 },
			},
			{ strictPopulate: !1, timestamps: !0, toJSON: { virtuals: !0 }, toObject: { virtuals: !0 } }
		);
	_.virtual('alternativeThumbnail').get(function () {
		try {
			return this.album.image;
		} catch (t) {
			return this.artists.length > 0 ? this.artists.at(0).avatar : '/images/default-thumbnail.png';
		}
	}),
		_.plugin(L()),
		_.plugin(k());
	const S = b().model('Tracks', _);
	var P = b().Schema(
		{
			track: { type: String, require: !0, ref: 'track' },
			userId: { type: String, require: !0, ref: 'user' },
			content: { type: String, require: !0 },
			postAt: { type: Date, default: new Date().toLocaleDateString(), require: !0 },
		},
		{ timestamps: !0 }
	);
	const T = b().model('Comment', P);
	var N = b().Schema({ name: { type: String, require: !0 }, slug: { type: String, slug: ['name'], unique: !0 } });
	b().plugin(j());
	const G = b().model('Genre', N),
		I = require('http-errors');
	var A = t.n(I);
	const F = require('googleapis'),
		C = require('stream');
	function q(t) {
		return (
			(q =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			q(t)
		);
	}
	function R() {
		R = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == q(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function U(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	function Y(t) {
		return function () {
			var e = this,
				r = arguments;
			return new Promise(function (n, o) {
				var a = t.apply(e, r);
				function i(t) {
					U(a, n, o, i, u, 'next', t);
				}
				function u(t) {
					U(a, n, o, i, u, 'throw', t);
				}
				i(void 0);
			});
		};
	}
	var D = process.env.CLIENT_ID,
		$ = process.env.CLIENT_SECRET,
		z = process.env.REDIRECT_URI,
		B = process.env.REFRESH_TOKEN,
		M = new F.google.auth.OAuth2(D, $, z);
	M.setCredentials({ refresh_token: B }),
		M.on('tokens', function (t) {
			return console.log('token >> ', t);
		});
	var K = F.google.drive({ version: 'v3', auth: M }),
		H = (function () {
			var t = Y(
				R().mark(function t(e) {
					return R().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(t.next = 3),
											K.permissions.create({
												fileId: e,
												requestBody: { role: 'reader', type: 'anyone' },
											})
										);
									case 3:
										return t.abrupt(
											'return',
											K.files.get({ fileId: e, fields: 'webViewLink,webContentLink' })
										);
									case 6:
										(t.prev = 6), (t.t0 = t.catch(0)), console.log(t.t0);
									case 9:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 6]]
					);
				})
			);
			return function (e) {
				return t.apply(this, arguments);
			};
		})(),
		J = (function () {
			var t = Y(
				R().mark(function t(e, r) {
					var n, o;
					return R().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(n = new C.Stream.PassThrough()).end(e.buffer),
											(t.next = 5),
											K.files.create({
												requestBody: { name: e.originalname, parents: [process.env.MUSIC_DIR] },
												media: { body: n },
												fields: 'id',
											})
										);
									case 5:
										return (o = t.sent), (t.next = 8), H(o.data.id);
									case 8:
										return t.abrupt('return', o);
									case 11:
										(t.prev = 11), (t.t0 = t.catch(0)), console.log(t.t0);
									case 14:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 11]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		V = (function () {
			var t = Y(
				R().mark(function t(e, r) {
					var n;
					return R().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (t.prev = 0), (t.next = 3), K.files.delete(e.body.fileId);
									case 3:
										(n = t.sent), r.status(204).json(n), (t.next = 10);
										break;
									case 7:
										(t.prev = 7), (t.t0 = t.catch(0)), console.log(t.t0.message);
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})();
	function Q(t) {
		return (
			(Q =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			Q(t)
		);
	}
	function W(t, e) {
		return (
			(function (t) {
				if (Array.isArray(t)) return t;
			})(t) ||
			(function (t, e) {
				var r = null == t ? null : ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
				if (null != r) {
					var n,
						o,
						a,
						i,
						u = [],
						c = !0,
						s = !1;
					try {
						if (((a = (r = r.call(t)).next), 0 === e)) {
							if (Object(r) !== r) return;
							c = !1;
						} else for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== e); c = !0);
					} catch (t) {
						(s = !0), (o = t);
					} finally {
						try {
							if (!c && null != r.return && ((i = r.return()), Object(i) !== i)) return;
						} finally {
							if (s) throw o;
						}
					}
					return u;
				}
			})(t, e) ||
			(function (t, e) {
				if (!t) return;
				if ('string' == typeof t) return X(t, e);
				var r = Object.prototype.toString.call(t).slice(8, -1);
				'Object' === r && t.constructor && (r = t.constructor.name);
				if ('Map' === r || 'Set' === r) return Array.from(t);
				if ('Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return X(t, e);
			})(t, e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
				);
			})()
		);
	}
	function X(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
		return n;
	}
	function Z() {
		Z = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == Q(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function tt(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	function et(t) {
		return function () {
			var e = this,
				r = arguments;
			return new Promise(function (n, o) {
				var a = t.apply(e, r);
				function i(t) {
					tt(a, n, o, i, u, 'next', t);
				}
				function u(t) {
					tt(a, n, o, i, u, 'throw', t);
				}
				i(void 0);
			});
		};
	}
	var rt = (function () {
			var t = et(
				Z().mark(function t(e, r) {
					var n, o, a;
					return Z().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(n = +e.query.limit || -1),
											(o = +e.query.skip || 0),
											(t.next = 5),
											S.find().sort({ listen: -1 }).skip(o).limit(n).exec()
										);
									case 5:
										if (1 !== (a = t.sent).length) {
											t.next = 8;
											break;
										}
										return t.abrupt('return', r.status(200).json(a[0]));
									case 8:
										return t.abrupt('return', r.status(200).json(a));
									case 11:
										(t.prev = 11),
											(t.t0 = t.catch(0)),
											console.log(t.t0),
											r.status(404).json({ status: 404, message: 'Cannot find tracks!' });
									case 15:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 11]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		nt = (function () {
			var t = et(
				Z().mark(function t(e, r) {
					var n;
					return Z().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(t.next = 3),
											S.find({ uploader: e.auth })
												.limit(+e.query.limit)
												.sort({ createdAt: -1 })
												.exec()
										);
									case 3:
										return (n = t.sent), t.abrupt('return', r.status(200).json(n));
									case 7:
										return (
											(t.prev = 7),
											(t.t0 = t.catch(0)),
											t.abrupt(
												'return',
												r
													.status(404)
													.json({ message: 'Cannot find tracks that uploaded by user' })
											)
										);
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		ot = (function () {
			var t = et(
				Z().mark(function t(e, r) {
					var n, o;
					return Z().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											'undefined' == (n = e.params.genre) &&
												G.findOne().then(function (t) {
													console.log(t), (n = t._id);
												}),
											(t.next = 5),
											S.find({ genre: n }).limit(10).exec()
										);
									case 5:
										return (o = t.sent), t.abrupt('return', r.status(200).json(o));
									case 9:
										return (
											(t.prev = 9),
											(t.t0 = t.catch(0)),
											console.log(t.t0.message),
											t.abrupt(
												'return',
												r
													.status(200)
													.json({ status: 404, message: 'Cannot find related tracks' })
											)
										);
									case 13:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 9]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		at = (function () {
			var t = et(
				Z().mark(function t(e, r) {
					var n, o;
					return Z().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(t.next = 3),
											S.findOne({ _id: e.params.id })
												.populate({ path: 'artists', select: '_id name avatar' })
												.populate({ path: 'album', select: '_id title image' })
												.select('-uploader -updatedAt -fileId')
												.exec()
										);
									case 3:
										return (
											(n = t.sent), (t.next = 6), T.find({ _id: n._id }).populate('user').exec()
										);
									case 6:
										return (
											(o = t.sent),
											t.abrupt('return', r.status(200).json({ track: n, comments: o }))
										);
									case 10:
										(t.prev = 10),
											(t.t0 = t.catch(0)),
											r.status(404).json({ message: 'Bài hát không tồn tại' });
									case 13:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 10]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		it = (function () {
			var t = et(
				Z().mark(function t(e, r) {
					var n, o, a;
					return Z().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										if (((t.prev = 0), (n = W(e.files, 1)), (o = n[0]), e.auth)) {
											t.next = 4;
											break;
										}
										throw A().Forbidden('You have to login to upload track!');
									case 4:
										return (t.next = 6), J(o);
									case 6:
										return (
											(e.body.file = t.sent),
											(e.body.uploader = e.auth),
											(t.next = 10),
											new S(e.body).save()
										);
									case 10:
										return (a = t.sent), t.abrupt('return', r.status(201).json(a));
									case 14:
										return (
											(t.prev = 14),
											(t.t0 = t.catch(0)),
											console.log('[ERROR] :>>>', t.t0.message),
											t.abrupt(
												'return',
												r
													.status(t.t0.status || 500)
													.json({ status: t.t0.status, message: t.t0.message })
											)
										);
									case 18:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 14]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		ut = (function () {
			var t = et(
				Z().mark(function t(e, r) {
					var n;
					return Z().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(t.next = 3),
											S.updateOne({ _id: e.params.id }, e.body, { new: !0, upsert: !0 }).exec()
										);
									case 3:
										return (n = t.sent), t.abrupt('return', r.status(200).json(n));
									case 7:
										return (
											(t.prev = 7),
											(t.t0 = t.catch(0)),
											console.log(t.t0),
											t.abrupt('return', r.status(500).json({ message: 'Cannot update track!' }))
										);
									case 11:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		ct = (function () {
			var t = et(
				Z().mark(function t(e, r) {
					var n, o, a;
					return Z().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (t.prev = 0), (t.next = 3), S.findOne({ _id: e.params.id }).exec();
									case 3:
										return (n = t.sent), (o = n.fileId), (t.next = 7), V(o);
									case 7:
										return (t.next = 9), S.deleteOne({ _id: e.params.id }).exec();
									case 9:
										return (a = t.sent), t.abrupt('return', r.status(204).json(a));
									case 13:
										return (
											(t.prev = 13),
											(t.t0 = t.catch(0)),
											t.abrupt('return', r.status(500).json({ message: 'Cannot remove track' }))
										);
									case 16:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 13]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})();
	const st = require('jsonwebtoken');
	var lt = t.n(st);
	const ft = require('bcrypt');
	var ht,
		pt = t.n(ft);
	function vt(t) {
		return (
			(vt =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			vt(t)
		);
	}
	function dt() {
		dt = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == vt(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function yt(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	function mt(t, e, r) {
		return (
			(e = (function (t) {
				var e = (function (t, e) {
					if ('object' !== vt(t) || null === t) return t;
					var r = t[Symbol.toPrimitive];
					if (void 0 !== r) {
						var n = r.call(t, e || 'default');
						if ('object' !== vt(n)) return n;
						throw new TypeError('@@toPrimitive must return a primitive value.');
					}
					return ('string' === e ? String : Number)(t);
				})(t, 'string');
				return 'symbol' === vt(e) ? e : String(e);
			})(e)) in t
				? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
				: (t[e] = r),
			t
		);
	}
	var gt = b().Schema(
		{
			email:
				((ht = { type: String, require: !0, trim: !0 }),
				mt(ht, 'trim', !0),
				mt(ht, 'unique', !0),
				mt(ht, 'validate', {
					validator: function (t) {
						return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(t);
					},
					message: function (t) {
						return ''.concat(t.value, ' is not a valid email address!');
					},
				}),
				ht),
			password: { type: String, minLength: 6, maxLength: 16, trim: !0 },
			username: { type: String, require: !0, trim: !0 },
			avatar: { type: String },
			role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
		},
		{ timestamps: !0 }
	);
	(gt.methods.authenticate = function (t) {
		return pt().compareSync(t, this.password);
	}),
		(gt.methods.encryptPassword = function (t) {
			if (t) return pt().hashSync(t, pt().genSaltSync(10));
		}),
		(gt.statics.findOrCreate = (function () {
			var t,
				e =
					((t = dt().mark(function t(e, r) {
						var n, o;
						return dt().wrap(
							function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (n = this), (t.next = 3), n.findOne(e);
										case 3:
											if ((o = t.sent)) {
												t.next = 8;
												break;
											}
											return (t.next = 7), n.create(e);
										case 7:
											return t.abrupt('return', t.sent);
										case 8:
											return t.abrupt('return', o);
										case 9:
										case 'end':
											return t.stop();
									}
							},
							t,
							this
						);
					})),
					function () {
						var e = this,
							r = arguments;
						return new Promise(function (n, o) {
							var a = t.apply(e, r);
							function i(t) {
								yt(a, n, o, i, u, 'next', t);
							}
							function u(t) {
								yt(a, n, o, i, u, 'throw', t);
							}
							i(void 0);
						});
					});
			return function (t, r) {
				return e.apply(this, arguments);
			};
		})()),
		gt.pre('save', function (t) {
			var e;
			((this.password = this.encryptPassword(this.password)), this.avatar) ||
				(this.avatar =
					'https://ui-avatars.com/api/?name=' +
					(null === (e = this.username) || void 0 === e ? void 0 : e.charAt(0)));
			t();
		});
	const wt = b().model('Users', gt);
	function bt(t) {
		return (
			(bt =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			bt(t)
		);
	}
	function xt() {
		xt = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == bt(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function Lt(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	function Et(t) {
		return function () {
			var e = this,
				r = arguments;
			return new Promise(function (n, o) {
				var a = t.apply(e, r);
				function i(t) {
					Lt(a, n, o, i, u, 'next', t);
				}
				function u(t) {
					Lt(a, n, o, i, u, 'throw', t);
				}
				i(void 0);
			});
		};
	}
	var jt = (function () {
			var t = Et(
				xt().mark(function t(e, r, n) {
					var o, a, i, u, c;
					return xt().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										if (
											((t.prev = 0),
											(o = e.headers.authorization
												? e.headers.authorization.replace('Bearer', '').trim()
												: null))
										) {
											t.next = 4;
											break;
										}
										throw A().Unauthorized('Access token must be provided!');
									case 4:
										return (
											(a = lt().verify(o, process.env.SECRET_KEY)),
											(i = a.credential),
											(t.next = 7),
											wt.findOne({ _id: i }).select('role')
										);
									case 7:
										(u = t.sent),
											(c = u.role),
											console.log(o),
											console.log(i),
											(e.role = c),
											(e.auth = i),
											n(),
											(t.next = 19);
										break;
									case 16:
										return (
											(t.prev = 16),
											(t.t0 = t.catch(0)),
											t.abrupt(
												'return',
												r.status(401).json({ status: 401, message: t.t0.message })
											)
										);
									case 19:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 16]]
					);
				})
			);
			return function (e, r, n) {
				return t.apply(this, arguments);
			};
		})(),
		Ot = (function () {
			var t = Et(
				xt().mark(function t(e, r, n) {
					return xt().wrap(function (t) {
						for (;;)
							switch ((t.prev = t.next)) {
								case 0:
									if ('ADMIN' === e.role) {
										t.next = 2;
										break;
									}
									return t.abrupt(
										'return',
										r.status(401).json({ message: 'Unauthorized error! You are not admin!' })
									);
								case 2:
									n();
								case 3:
								case 'end':
									return t.stop();
							}
					}, t);
				})
			);
			return function (e, r, n) {
				return t.apply(this, arguments);
			};
		})(),
		kt = c().Router(),
		_t = g()({
			fileFilter: function (t, e, r) {
				!(function (t, e) {
					/wav|mp3|flac/.test(y().extname(t.originalname).toLowerCase())
						? e(null, !0)
						: e('File không đúng định dạng!');
				})(e, r);
			},
		});
	kt.get('/tracks', rt),
		kt.get('/tracks/user-uploaded', jt, nt),
		kt.get('/tracks/related/:genre', ot),
		kt.get('/tracks/:id', at),
		kt.post('/tracks', jt, _t.any(), it),
		kt.patch('/tracks/:id', jt, ut),
		kt.delete('/tracks/:id', jt, ct);
	const St = kt,
		Pt = require('nodemailer');
	const Tt = t
		.n(Pt)()
		.createTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			port: 465,
			auth: { user: process.env.AUTH_EMAIL, pass: process.env.AUTH_PASSWORD },
		});
	var Nt = b().Schema(
		{
			creator: { type: b().Schema.Types.ObjectId, ref: 'Users', autopopulate: { select: '_id username avatar' } },
			artists: { type: [{ type: b().Schema.Types.ObjectId, ref: 'Artist', autopopulate: !0 }], default: [] },
			albums: { type: [{ type: b().Schema.Types.ObjectId, ref: 'Album', autopopulate: !0 }], default: [] },
			tracks: { type: [{ type: b().Schema.Types.ObjectId, ref: 'Tracks', autopopulate: !0 }], default: [] },
		},
		{ timestamps: !0, strictPopulate: !1 }
	);
	Nt.plugin(L());
	const Gt = b().model('Collections', Nt);
	function It(t) {
		return (
			(It =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			It(t)
		);
	}
	function At() {
		At = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == It(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function Ft(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	function Ct(t) {
		return function () {
			var e = this,
				r = arguments;
			return new Promise(function (n, o) {
				var a = t.apply(e, r);
				function i(t) {
					Ft(a, n, o, i, u, 'next', t);
				}
				function u(t) {
					Ft(a, n, o, i, u, 'throw', t);
				}
				i(void 0);
			});
		};
	}
	var qt = (function () {
			var t = Ct(
				At().mark(function t(e, r) {
					var n;
					return At().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0), (t.next = 3), wt.find().select('_id username avatar').exec()
										);
									case 3:
										return (n = t.sent), t.abrupt('return', r.status(200).json(n));
									case 7:
										return (
											(t.prev = 7),
											(t.t0 = t.catch(0)),
											t.abrupt(
												'return',
												r.status(404).json({ statusCode: 404, message: t.t0.message })
											)
										);
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Rt = (function () {
			var t = Ct(
				At().mark(function t(e, r) {
					var n;
					return At().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(t.next = 3),
											wt.findOne({ _id: e.auth }).select('-password -role').exec()
										);
									case 3:
										return (n = t.sent), t.abrupt('return', r.status(200).json(n));
									case 7:
										return (
											(t.prev = 7),
											(t.t0 = t.catch(0)),
											t.abrupt('return', r.json({ status: t.t0.status, message: t.t0.message }))
										);
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Ut = (function () {
			var t = Ct(
				At().mark(function t(e, r) {
					var n, o, a;
					return At().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (t.prev = 0), (t.next = 3), wt.findOne({ email: e.body.email }).exec();
									case 3:
										if ((n = t.sent)) {
											t.next = 6;
											break;
										}
										return t.abrupt(
											'return',
											r.status(404).json({ message: 'Email does not exist!' })
										);
									case 6:
										return (
											(o = Date.now().toString().substr(7, 6)),
											(a = lt().sign({ verifyCode: o, email: n.email }, process.env.SECRET_KEY, {
												expiresIn: '5m',
											})),
											(t.next = 10),
											Tt.sendMail(
												{
													from: { name: 'Bass Station', address: process.env.AUTH_EMAIL },
													to: n.email,
													subject: 'Sử dụng mã xác thực này để đổi mật khẩu!',
													html: '<p>Mã xác thực: <b>'.concat(o, '</b></p>'),
												},
												function (t, e) {
													if (t) return r.status(500).json(t);
												}
											)
										);
									case 10:
										return t.abrupt('return', r.status(201).json({ token: a }));
									case 13:
										return (
											(t.prev = 13),
											(t.t0 = t.catch(0)),
											console.log(t.t0),
											t.abrupt('return', r.status(500).json(t.t0))
										);
									case 17:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 13]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Yt = (function () {
			var t = Ct(
				At().mark(function t(e, r) {
					var n, o, a, i, u, c;
					return At().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(n = e.headers.authorization.split(' ').at(1)),
											(o = lt().verify(n, process.env.SECRET_KEY, { algorithms: 'RS256' })),
											(a = o.verifyCode),
											(i = o.email),
											(t.next = 5),
											wt.findOne({ email: i }).exec()
										);
									case 5:
										if (((u = t.sent), a === e.body.verifyCode && null !== u)) {
											t.next = 8;
											break;
										}
										throw A().Forbidden('Verify code is invalid!');
									case 8:
										return (
											(c = pt().hashSync(e.body.password, (0, ft.genSaltSync)(10))),
											(t.next = 11),
											wt.findOneAndUpdate({ email: i }, { password: c }, { new: !0 })
										);
									case 11:
										if (t.sent) {
											t.next = 14;
											break;
										}
										throw A().InternalServerError('Failed to reset password');
									case 14:
										return t.abrupt(
											'return',
											r.status(201).json({ message: 'Reset password successfully!' })
										);
									case 17:
										return (
											(t.prev = 17),
											(t.t0 = t.catch(0)),
											console.log(t.t0.message),
											t.abrupt(
												'return',
												r.status(200).json({ status: t.t0.status, message: t.t0.message })
											)
										);
									case 21:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 17]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Dt = (function () {
			var t = Ct(
				At().mark(function t(e, r) {
					var n, o;
					return At().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(n = lt().verify(e.query.token, process.env.SECRET_KEY, {
												algorithms: 'RS256',
											})),
											(t.next = 4),
											new wt(n).save()
										);
									case 4:
										return (
											(o = t.sent),
											(t.next = 7),
											new Gt({ creator: o._id, albums: [], tracks: [], artists: [] }).save()
										);
									case 7:
										return t.abrupt(
											'return',
											r
												.status(201)
												.json({ id: o._id, email: o.email, username: o.username, role: o.role })
										);
									case 10:
										return (
											(t.prev = 10),
											(t.t0 = t.catch(0)),
											console.log(t.t0.message),
											t.abrupt('return', r.status(401).json({ message: t.t0.message }))
										);
									case 14:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 10]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		$t = (function () {
			var t = Ct(
				At().mark(function t(e, r) {
					var n;
					return At().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											console.log(e.body),
											(t.next = 4),
											wt.updateOne({ _id: e.auth }, e.body, { new: !0 })
										);
									case 4:
										return (n = t.sent), console.log(n), t.abrupt('return', r.status(201).json(n));
									case 9:
										return (
											(t.prev = 9),
											(t.t0 = t.catch(0)),
											console.log(t.t0),
											t.abrupt('return', r.status(500).json(t.t0))
										);
									case 13:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 9]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})();
	function zt(t) {
		return (
			(zt =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			zt(t)
		);
	}
	function Bt() {
		Bt = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == zt(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function Mt(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	function Kt(t) {
		return function () {
			var e = this,
				r = arguments;
			return new Promise(function (n, o) {
				var a = t.apply(e, r);
				function i(t) {
					Mt(a, n, o, i, u, 'next', t);
				}
				function u(t) {
					Mt(a, n, o, i, u, 'throw', t);
				}
				i(void 0);
			});
		};
	}
	var Ht = (function () {
			var t = Kt(
				Bt().mark(function t(e, r) {
					var n, o, a;
					return Bt().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(o = e.user),
											(a = lt().sign({ credential: o._id }, process.env.SECRET_KEY, {
												expiresIn: '15m',
											})),
											t.abrupt(
												'return',
												r.json({
													accessToken: a,
													authenticated: !0,
													uid: null === (n = e.user) || void 0 === n ? void 0 : n._id,
													user: e.user,
												})
											)
										);
									case 6:
										return (
											(t.prev = 6),
											(t.t0 = t.catch(0)),
											t.abrupt(
												'return',
												r.status(200).json({ message: t.t0.message, status: t.t0.status })
											)
										);
									case 9:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 6]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Jt = (function () {
			var t = Kt(
				Bt().mark(function t(e, r) {
					var n, o, a, i, u, c;
					return Bt().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										if (
											((t.prev = 0),
											(n = e.headers.authorization
												? e.headers.authorization.replace('Bearer', '').trim()
												: null))
										) {
											t.next = 4;
											break;
										}
										throw A().BadRequest('Access token must be provided!');
									case 4:
										return (
											(t.next = 6),
											fetch(process.env.GOOGLE_APIS_URL, {
												headers: { Authorization: 'Bearer '.concat(n) },
											})
										);
									case 6:
										return (t.next = 8), t.sent.json();
									case 8:
										if ((o = t.sent)) {
											t.next = 11;
											break;
										}
										throw A().NotFound('Account does not exist');
									case 11:
										return (t.next = 13), wt.findOne({ email: o.email });
									case 13:
										if ((a = t.sent)) {
											t.next = 22;
											break;
										}
										return (
											(t.next = 17),
											new wt({ email: o.email, avatar: o.picture, username: o.name }).save()
										);
									case 17:
										return (
											(i = t.sent),
											(t.next = 20),
											new Gt({ creator: i._id, albums: [], tracks: [], artists: [] }).save()
										);
									case 20:
										return (
											(u = lt().sign(
												{ credential: null == i ? void 0 : i._id },
												process.env.SECRET_KEY,
												{ expiresIn: '15m' }
											)),
											t.abrupt(
												'return',
												r
													.status(200)
													.json({
														accessToken: u,
														authenticated: !0,
														uid: null == i ? void 0 : i._id,
														user: i,
													})
											)
										);
									case 22:
										return (
											(c = lt().sign(
												{ credential: null == a ? void 0 : a._id },
												process.env.SECRET_KEY,
												{ expiresIn: '15m' }
											)),
											t.abrupt(
												'return',
												r
													.status(200)
													.json({
														accessToken: c,
														authenticated: !0,
														uid: null == a ? void 0 : a._id,
														user: a,
													})
											)
										);
									case 26:
										return (
											(t.prev = 26),
											(t.t0 = t.catch(0)),
											t.abrupt(
												'return',
												r
													.status(t.t0.status || 500)
													.json({ message: t.t0.message, status: t.t0.status })
											)
										);
									case 29:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 26]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Vt = (function () {
			var t = Kt(
				Bt().mark(function t(e, r) {
					var n, o;
					return Bt().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (t.prev = 0), (t.next = 3), wt.findOne({ _id: e.params.userId }).exec();
									case 3:
										if ((n = t.sent)) {
											t.next = 6;
											break;
										}
										throw A().BadRequest('Cannot find user');
									case 6:
										return (
											(o = lt().sign({ credential: n._id }, process.env.SECRET_KEY, {
												expiresIn: '15m',
											})),
											console.log(o),
											t.abrupt('return', r.status(200).json(o))
										);
									case 11:
										return (
											(t.prev = 11),
											(t.t0 = t.catch(0)),
											console.log(t.t0.message),
											t.abrupt(
												'return',
												r.status(400).json({ error: t.t0.status, message: t.t0.message })
											)
										);
									case 15:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 11]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Qt = (function () {
			var t = Kt(
				Bt().mark(function t(e, r) {
					var n, o;
					return Bt().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (t.prev = 0), (t.next = 3), wt.findOne({ email: e.body.email }).exec();
									case 3:
										if (!t.sent) {
											t.next = 6;
											break;
										}
										throw A().BadRequest('Account already existed!');
									case 6:
										return (
											(n = lt().sign(e.body, process.env.SECRET_KEY, { expiresIn: '5m' })),
											(o = e.protocol + '://' + e.get('host') + '/activate-account'),
											console.log(e.get('host')),
											(t.next = 11),
											Tt.sendMail(
												{
													from: process.env.AUTH_EMAIL,
													to: e.body.email,
													subject: 'Activate your account',
													html: "\n\t\t\t\t\t<h3>On clicking this link, you are goin' to activate account!</h3>\n\t\t\t\t\t<p><a href="
														.concat(o, '?token=')
														.concat(
															n,
															'>Active Link</a></p>\n\t\t\t\t\t<i>Thanks for register to be one of our member!</i>'
														),
												},
												function (t, e) {
													return t
														? r.status(500).json({ message: t })
														: r
																.status(202)
																.json({ message: 'Email sent: '.concat(e.response) });
												}
											)
										);
									case 11:
										t.next = 16;
										break;
									case 13:
										return (
											(t.prev = 13),
											(t.t0 = t.catch(0)),
											t.abrupt(
												'return',
												r.status(200).json({ message: t.t0.message, status: t.t0.status })
											)
										);
									case 16:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 13]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Wt = (function () {
			var t = Kt(
				Bt().mark(function t(e, r) {
					return Bt().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										(t.prev = 0),
											e.logout(function (t) {
												if (t) throw t;
											}),
											r.clearCookie('access_token', { path: '/' }),
											r.clearCookie('uid', { path: '/' }),
											r.clearCookie('connect.sid', { path: '/' }),
											r.json({ accessToken: null, user: null, uid: null, authenticated: !1 }),
											(t.next = 11);
										break;
									case 8:
										return (
											(t.prev = 8),
											(t.t0 = t.catch(0)),
											t.abrupt(
												'return',
												r.status(500).json({ message: t.t0.message, status: 500 })
											)
										);
									case 11:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 8]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})();
	const Xt = 'production'.toLowerCase().includes('production')
		? { frontendURL: process.env.FRONTEND_URL, mongoURI: process.env.DATABASE_URI }
		: { frontendURL: process.env.LOCAL_FRONTEND_URL, mongoURI: process.env.LOCAL_DATABASE_URI };
	var Zt = c().Router();
	Zt.get('/auth/google/login', Jt),
		Zt.get('/users', qt),
		Zt.get('/user', jt, Rt),
		Zt.get('/refresh-token/:userId', Vt),
		Zt.post(
			'/auth/login-with-email',
			v().authenticate('local', { failureRedirect: Xt.frontendURL + '/login' }),
			Ht
		),
		Zt.post('/register', Qt),
		Zt.get('/activate-account', Dt),
		Zt.post('/forgot-password', Ut),
		Zt.post('/reset-password', Yt),
		Zt.patch('/user', jt, $t),
		Zt.post('/logout', Wt);
	const te = Zt;
	var ee = b().Schema(
		{
			name: { type: String, require: !0 },
			avatar: { type: String, default: 'default.png', require: !0 },
			wallpaper: { type: String, default: 'default.png', require: !0 },
			desc: { type: String },
		},
		{ strictPopulate: !1, toJSON: { virtuals: !0 } }
	);
	ee.plugin(j());
	const re = b().model('Artist', ee);
	var ne = b().Schema(
		{
			title: { type: String, require: !0 },
			releaseDate: { type: Date, default: new Date().toLocaleDateString(), require: !0 },
			artist: {
				type: b().Types.ObjectId,
				ref: 'Artist',
				require: !0,
				autopopulate: { select: '_id name avatar' },
			},
			image: { type: String, default: '' },
		},
		{ strictPopulate: !1, timestamps: !0 }
	);
	ne.plugin(L());
	const oe = b().model('Album', ne);
	function ae(t) {
		return (
			(ae =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			ae(t)
		);
	}
	function ie(t, e) {
		return (
			(function (t) {
				if (Array.isArray(t)) return t;
			})(t) ||
			(function (t, e) {
				var r = null == t ? null : ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
				if (null != r) {
					var n,
						o,
						a,
						i,
						u = [],
						c = !0,
						s = !1;
					try {
						if (((a = (r = r.call(t)).next), 0 === e)) {
							if (Object(r) !== r) return;
							c = !1;
						} else for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== e); c = !0);
					} catch (t) {
						(s = !0), (o = t);
					} finally {
						try {
							if (!c && null != r.return && ((i = r.return()), Object(i) !== i)) return;
						} finally {
							if (s) throw o;
						}
					}
					return u;
				}
			})(t, e) ||
			(function (t, e) {
				if (!t) return;
				if ('string' == typeof t) return ue(t, e);
				var r = Object.prototype.toString.call(t).slice(8, -1);
				'Object' === r && t.constructor && (r = t.constructor.name);
				if ('Map' === r || 'Set' === r) return Array.from(t);
				if ('Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ue(t, e);
			})(t, e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
				);
			})()
		);
	}
	function ue(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
		return n;
	}
	function ce() {
		ce = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == ae(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function se(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	function le(t) {
		return function () {
			var e = this,
				r = arguments;
			return new Promise(function (n, o) {
				var a = t.apply(e, r);
				function i(t) {
					se(a, n, o, i, u, 'next', t);
				}
				function u(t) {
					se(a, n, o, i, u, 'throw', t);
				}
				i(void 0);
			});
		};
	}
	var fe = (function () {
			var t = le(
				ce().mark(function t(e, r) {
					var n, o, a;
					return ce().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(n = +e.query.skip || 0),
											(o = +e.query.limit || 10),
											(t.next = 5),
											re.find().skip(n).limit(o).exec()
										);
									case 5:
										return (a = t.sent), t.abrupt('return', r.status(200).json(a));
									case 9:
										return (
											(t.prev = 9),
											(t.t0 = t.catch(0)),
											t.abrupt(
												'return',
												r.status(404).json({ message: 'Cannot find the artist!' })
											)
										);
									case 12:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 9]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		he = (function () {
			var t = le(
				ce().mark(function t(e, r) {
					var n, o, a, i, u, c, s, l, f, h;
					return ce().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(n = re.findOne({ _id: e.params.id }).exec()),
											(o = Gt.find({ artists: e.params.id }).select('_id').count()),
											(a = S.find({ artists: e.params.id }).sort({ listen: -1 }).exec()),
											(i = oe.find({ artist: e.params.id }).exec()),
											(t.next = 7),
											Promise.all([n, o, a, i])
										);
									case 7:
										return (
											(u = t.sent),
											(c = ie(u, 4)),
											(s = c[0]),
											(l = c[1]),
											(f = c[2]),
											(h = c[3]),
											t.abrupt(
												'return',
												r.status(200).json({ artist: s, tracks: f, albums: h, followers: l })
											)
										);
									case 16:
										(t.prev = 16),
											(t.t0 = t.catch(0)),
											r.status(404).json({ message: 'Cannot find the artist!' });
									case 19:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 16]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		pe = (function () {
			var t = le(
				ce().mark(function t(e, r) {
					var n;
					return ce().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (t.prev = 0), (t.next = 3), new re(e.body).save();
									case 3:
										return (n = t.sent), t.abrupt('return', r.status(201).json(n));
									case 7:
										(t.prev = 7),
											(t.t0 = t.catch(0)),
											r.status(500).json({ message: 'Error! Cannot create artist!' });
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		ve = (function () {
			var t = le(
				ce().mark(function t(e, r) {
					var n;
					return ce().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										if (((t.prev = 0), !e.body.follower)) {
											t.next = 9;
											break;
										}
										return (
											(t.next = 4),
											re
												.updateOne(
													{ _id: e.params.id },
													{ $push: { followers: e.body.follower } },
													{ new: !0, upsert: !0 }
												)
												.exec()
										);
									case 4:
										if (((n = t.sent), 'unfollow' != e.query.action)) {
											t.next = 9;
											break;
										}
										return (
											(t.next = 8),
											re
												.findByIdAndUpdate(
													{ _id: e.params.id },
													{ $pull: { followers: e.body.follower } },
													{ new: !0, upsert: !0 }
												)
												.exec()
										);
									case 8:
										n = t.sent;
									case 9:
										return (
											(t.next = 11),
											re.findByIdAndUpdate({ _id: e.params.id }, e.body, { new: !0 }).exec()
										);
									case 11:
										return (n = t.sent), t.abrupt('return', r.status(201).json(n));
									case 15:
										(t.prev = 15),
											(t.t0 = t.catch(0)),
											r
												.status(500)
												.json({ message: 'Error! Cannot update artist!', error: t.t0.message });
									case 18:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 15]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		de = (function () {
			var t = le(
				ce().mark(function t(e, r) {
					var n;
					return ce().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (t.prev = 0), (t.next = 3), re.deleteOne({ _id: e.params.id }).exec();
									case 3:
										(n = t.sent), r.status(204).json(n), (t.next = 10);
										break;
									case 7:
										(t.prev = 7),
											(t.t0 = t.catch(0)),
											r.status(500).json({ message: 'Error! Cannot delete artist!' });
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		ye = c().Router();
	ye.get('/artists', fe),
		ye.get('/artists/:id', he),
		ye.post('/artists', jt, Ot, pe),
		ye.patch('/artists/:id', jt, Ot, ve),
		ye.delete('/artists/:id', jt, Ot, de);
	const me = ye;
	function ge(t) {
		return (
			(ge =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			ge(t)
		);
	}
	function we() {
		we = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == ge(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function be(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	function xe(t) {
		return function () {
			var e = this,
				r = arguments;
			return new Promise(function (n, o) {
				var a = t.apply(e, r);
				function i(t) {
					be(a, n, o, i, u, 'next', t);
				}
				function u(t) {
					be(a, n, o, i, u, 'throw', t);
				}
				i(void 0);
			});
		};
	}
	var Le = (function () {
			var t = xe(
				we().mark(function t(e, r) {
					var n;
					return we().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (t.prev = 0), (t.next = 3), G.find();
									case 3:
										(n = t.sent), r.status(200).json(n), (t.next = 10);
										break;
									case 7:
										(t.prev = 7),
											(t.t0 = t.catch(0)),
											r.status(500).json({ message: 'Genres do not exist!' });
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Ee = (function () {
			var t = xe(
				we().mark(function t(e, r) {
					var n, o;
					return we().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (t.prev = 0), (t.next = 3), G.findOne({ _id: e.params.id }).exec();
									case 3:
										return (
											(n = t.sent), (t.next = 6), S.find({ genre: n }).populate('genre').exec()
										);
									case 6:
										(o = t.sent), r.status(200).json({ genre: n, tracks: o }), (t.next = 13);
										break;
									case 10:
										(t.prev = 10),
											(t.t0 = t.catch(0)),
											r.status(500).json({ message: 'Genre does not exist!' });
									case 13:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 10]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		je = (function () {
			var t = xe(
				we().mark(function t(e, r) {
					var n;
					return we().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (t.prev = 0), (t.next = 3), new G(e.body).save();
									case 3:
										(n = t.sent), r.status(201).json(n), (t.next = 10);
										break;
									case 7:
										(t.prev = 7),
											(t.t0 = t.catch(0)),
											r.status(500).json({ message: 'Error! Cannot create new genre!' });
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Oe = (function () {
			var t = xe(
				we().mark(function t(e, r) {
					var n;
					return we().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(t.next = 3),
											G.findOneAndUpdate({ _id: e.params.id }, e.body, { new: !0 })
										);
									case 3:
										(n = t.sent), r.status(201).json(n), (t.next = 10);
										break;
									case 7:
										(t.prev = 7),
											(t.t0 = t.catch(0)),
											r.status(500).json({ message: 'Error! Cannot update this genre!' });
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		ke = (function () {
			var t = xe(
				we().mark(function t(e, r) {
					var n;
					return we().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0), (t.next = 3), G.findOneAndDelete({ _id: e.params.id }).exec()
										);
									case 3:
										(n = t.sent), r.status(204).json(n), (t.next = 10);
										break;
									case 7:
										(t.prev = 7),
											(t.t0 = t.catch(0)),
											r.status(500).json({ message: 'Error! Cannot delete this genre!' });
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		_e = c().Router();
	_e.get('/genres', Le),
		_e.get('/genres/:id', Ee),
		_e.post('/genres', jt, je),
		_e.patch('/genres/:id', Oe),
		_e.delete('/genres/:id', jt, ke);
	const Se = _e;
	var Pe = b().Schema(
		{
			title: { type: String, require: !0, min: 4 },
			creator: {
				type: b().Schema.Types.ObjectId,
				require: !0,
				ref: 'Users',
				autopopulate: { select: '_id username' },
			},
			slug: { type: String, slug: 'title', unique: !0 },
			tracks: [{ type: b().Schema.Types.ObjectId, ref: 'Tracks', autopopulate: { select: '-__v' } }],
			thumbnail: {
				type: String,
				default:
					'https://firebasestorage.googleapis.com/v0/b/music-app-cdef5.appspot.com/o/pictures%2Fdefault-album-image.png?alt=media&token=3c078580-13d5-4252-9c35-ab1d30deefeb',
			},
			createAt: { type: Date, default: new Date().toLocaleDateString() },
			public: { type: Boolean, default: !0 },
		},
		{ timestamps: !0, strictPopulate: !1 }
	);
	Pe.plugin(L(), j());
	const Te = b().model('Playlist', Pe);
	function Ne(t) {
		return (
			(Ne =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			Ne(t)
		);
	}
	function Ge(t, e) {
		var r = Object.keys(t);
		if (Object.getOwnPropertySymbols) {
			var n = Object.getOwnPropertySymbols(t);
			e &&
				(n = n.filter(function (e) {
					return Object.getOwnPropertyDescriptor(t, e).enumerable;
				})),
				r.push.apply(r, n);
		}
		return r;
	}
	function Ie(t) {
		for (var e = 1; e < arguments.length; e++) {
			var r = null != arguments[e] ? arguments[e] : {};
			e % 2
				? Ge(Object(r), !0).forEach(function (e) {
						Ae(t, e, r[e]);
				  })
				: Object.getOwnPropertyDescriptors
				? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
				: Ge(Object(r)).forEach(function (e) {
						Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
				  });
		}
		return t;
	}
	function Ae(t, e, r) {
		return (
			(e = (function (t) {
				var e = (function (t, e) {
					if ('object' !== Ne(t) || null === t) return t;
					var r = t[Symbol.toPrimitive];
					if (void 0 !== r) {
						var n = r.call(t, e || 'default');
						if ('object' !== Ne(n)) return n;
						throw new TypeError('@@toPrimitive must return a primitive value.');
					}
					return ('string' === e ? String : Number)(t);
				})(t, 'string');
				return 'symbol' === Ne(e) ? e : String(e);
			})(e)) in t
				? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
				: (t[e] = r),
			t
		);
	}
	function Fe() {
		Fe = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == Ne(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function Ce(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	function qe(t) {
		return function () {
			var e = this,
				r = arguments;
			return new Promise(function (n, o) {
				var a = t.apply(e, r);
				function i(t) {
					Ce(a, n, o, i, u, 'next', t);
				}
				function u(t) {
					Ce(a, n, o, i, u, 'throw', t);
				}
				i(void 0);
			});
		};
	}
	var Re = (function () {
			var t = qe(
				Fe().mark(function t(e, r) {
					var n, o, a;
					return Fe().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(n = e.query.limit || 10),
											(o = e.query.skip || 0),
											(t.next = 5),
											Te.find({ public: !0 }).skip(o).limit(n).sort({ createdAt: -1 }).exec()
										);
									case 5:
										return (a = t.sent), t.abrupt('return', r.status(200).json(a));
									case 9:
										return (
											(t.prev = 9),
											(t.t0 = t.catch(0)),
											t.abrupt('return', r.json({ error: 404, message: t.t0.message }))
										);
									case 12:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 9]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Ue = (function () {
			var t = qe(
				Fe().mark(function t(e, r) {
					var n;
					return Fe().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(t.next = 3),
											Te.find({ creator: e.params.userId })
												.skip(e.query.skip || 0)
												.limit(e.query.limit || 20)
												.exec()
										);
									case 3:
										return (n = t.sent), t.abrupt('return', r.status(200).json(n));
									case 7:
										(t.prev = 7),
											(t.t0 = t.catch(0)),
											console.log(t.t0),
											r.status(404).json({ message: 'Cannot find user playlists!' });
									case 11:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Ye = (function () {
			var t = qe(
				Fe().mark(function t(e, r) {
					var n;
					return Fe().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(t.next = 3),
											Te.findOne({ _id: e.params.id }).select('-__v -updatedAt -createdAt').exec()
										);
									case 3:
										return (n = t.sent), t.abrupt('return', r.status(200).json(n));
									case 7:
										(t.prev = 7),
											(t.t0 = t.catch(0)),
											console.log(t.t0),
											r.status(404).json({ message: 'Playlist does not exist!' });
									case 11:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		De = (function () {
			var t = qe(
				Fe().mark(function t(e, r) {
					var n;
					return Fe().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											console.log('creator:>>>>', e.auth),
											(t.next = 4),
											new Te(Ie({ creator: new (b().Types.ObjectId)(e.auth) }, e.body)).save()
										);
									case 4:
										return (
											(n = t.sent), console.log(e.body), t.abrupt('return', r.status(201).json(n))
										);
									case 9:
										(t.prev = 9),
											(t.t0 = t.catch(0)),
											r.status(500).json({ message: 'Failed to create new playlist!' });
									case 12:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 9]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		$e = (function () {
			var t = qe(
				Fe().mark(function t(e, r) {
					var n, o;
					return Fe().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										if (((t.prev = 0), e.body.track)) {
											t.next = 3;
											break;
										}
										throw A().BadRequest('Invalid track data!');
									case 3:
										return (
											console.log(e.body.track),
											(t.next = 6),
											Te.findOne({ _id: e.params.id, tracks: e.body.track }).exec()
										);
									case 6:
										if (t.sent) {
											t.next = 12;
											break;
										}
										return (
											(t.next = 10),
											Te.updateOne(
												{ _id: e.params.id },
												{ $addToSet: { tracks: e.body.track } },
												{ new: !0, upsert: !0 }
											)
										);
									case 10:
										return (n = t.sent), t.abrupt('return', r.status(201).json(n));
									case 12:
										return (
											(t.next = 14),
											Te.updateOne(
												{ _id: e.params.id },
												{ $pull: { tracks: e.body.track } },
												{ new: !0, upsert: !0 }
											)
										);
									case 14:
										return (o = t.sent), t.abrupt('return', r.status(201).json(o));
									case 18:
										(t.prev = 18),
											(t.t0 = t.catch(0)),
											console.log(t.t0.message),
											r.status(400).json({ message: t.t0.message, status: t.t0.status });
									case 22:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 18]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		ze = (function () {
			var t = qe(
				Fe().mark(function t(e, r) {
					var n;
					return Fe().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										if (((t.prev = 0), e.auth)) {
											t.next = 3;
											break;
										}
										throw A()('You cannot delete this playlist!');
									case 3:
										return (
											console.log(e.auth),
											(t.next = 6),
											Te.updateOne({ creator: e.auth, _id: e.params.id }).exec()
										);
									case 6:
										if ((n = t.sent)) {
											t.next = 9;
											break;
										}
										throw A()('You cannot delete this playlist!');
									case 9:
										return t.abrupt('return', r.status(204).json(n));
									case 12:
										(t.prev = 12),
											(t.t0 = t.catch(0)),
											r.status(200).json({ status: t.t0.status, message: t.t0.message });
									case 15:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 12]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Be = c().Router();
	Be.get('/playlists', Re),
		Be.get('/playlists/created-by/:userId', Ue),
		Be.get('/playlists/:id', Ye),
		Be.post('/playlists', jt, De),
		Be.patch('/playlists/:id/edit-track-list', jt, $e),
		Be.delete('/playlists/:id', jt, ze);
	const Me = Be;
	function Ke(t) {
		return (
			(Ke =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			Ke(t)
		);
	}
	function He(t, e) {
		return (
			(function (t) {
				if (Array.isArray(t)) return t;
			})(t) ||
			(function (t, e) {
				var r = null == t ? null : ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
				if (null != r) {
					var n,
						o,
						a,
						i,
						u = [],
						c = !0,
						s = !1;
					try {
						if (((a = (r = r.call(t)).next), 0 === e)) {
							if (Object(r) !== r) return;
							c = !1;
						} else for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== e); c = !0);
					} catch (t) {
						(s = !0), (o = t);
					} finally {
						try {
							if (!c && null != r.return && ((i = r.return()), Object(i) !== i)) return;
						} finally {
							if (s) throw o;
						}
					}
					return u;
				}
			})(t, e) ||
			(function (t, e) {
				if (!t) return;
				if ('string' == typeof t) return Je(t, e);
				var r = Object.prototype.toString.call(t).slice(8, -1);
				'Object' === r && t.constructor && (r = t.constructor.name);
				if ('Map' === r || 'Set' === r) return Array.from(t);
				if ('Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Je(t, e);
			})(t, e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
				);
			})()
		);
	}
	function Je(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
		return n;
	}
	function Ve() {
		Ve = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == Ke(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function Qe(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	function We(t) {
		return function () {
			var e = this,
				r = arguments;
			return new Promise(function (n, o) {
				var a = t.apply(e, r);
				function i(t) {
					Qe(a, n, o, i, u, 'next', t);
				}
				function u(t) {
					Qe(a, n, o, i, u, 'throw', t);
				}
				i(void 0);
			});
		};
	}
	var Xe = (function () {
			var t = We(
				Ve().mark(function t(e, r) {
					var n, o, a;
					return Ve().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(n = e.query.skip || 0),
											(o = e.query.limit || 10),
											(t.next = 5),
											oe.find().skip(n).limit(o).sort({ releaseDate: -1 }).select('-tracks')
										);
									case 5:
										return (a = t.sent), t.abrupt('return', r.status(200).json(a));
									case 9:
										return (
											(t.prev = 9),
											(t.t0 = t.catch(0)),
											t.abrupt('return', r.status(404).json({ message: 'Albums do not exist!' }))
										);
									case 12:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 9]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		Ze = (function () {
			var t = We(
				Ve().mark(function t(e, r) {
					var n, o, a, i, u, c;
					return Ve().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(n = oe.findOne({ _id: e.params.id }).exec()),
											(o = S.find({ album: e.params.id }).exec()),
											(t.next = 5),
											Promise.all([o, n])
										);
									case 5:
										return (
											(a = t.sent),
											(i = He(a, 2)),
											(u = i[0]),
											(c = i[1]),
											t.abrupt('return', r.status(200).json({ album: c, tracks: u }))
										);
									case 12:
										return (
											(t.prev = 12),
											(t.t0 = t.catch(0)),
											console.log(t.t0.message),
											t.abrupt('return', r.status(404).json({ message: 'Album does not exist!' }))
										);
									case 16:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 12]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		tr = (function () {
			var t = We(
				Ve().mark(function t(e, r) {
					var n;
					return Ve().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (t.prev = 0), (t.next = 3), new oe(e.body).save();
									case 3:
										return (n = t.sent), t.abrupt('return', r.status(201).json(n));
									case 7:
										return (
											(t.prev = 7),
											(t.t0 = t.catch(0)),
											console.log(t.t0),
											t.abrupt(
												'return',
												r.status(400).json({ message: 'Error! Cannot create album!' })
											)
										);
									case 11:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		er = (function () {
			var t = We(
				Ve().mark(function t(e, r) {
					var n;
					return Ve().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (t.prev = 0), (t.next = 3), oe.deleteOne({ _id: e.params.id }).exec();
									case 3:
										return (n = t.sent), t.abrupt('return', r.status(204).json(n));
									case 7:
										return (
											(t.prev = 7),
											(t.t0 = t.catch(0)),
											t.abrupt(
												'return',
												r.status(400).json({ message: 'Error! Cannot delete album!' })
											)
										);
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		rr = (function () {
			var t = We(
				Ve().mark(function t(e, r) {
					var n;
					return Ve().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(t.next = 3),
											oe.updateOne({ _id: e.params.id }, e.body, { new: !0, upsert: !0 }).exec()
										);
									case 3:
										return (n = t.sent), t.abrupt('return', r.status(201).json(n));
									case 7:
										return (
											(t.prev = 7),
											(t.t0 = t.catch(0)),
											t.abrupt(
												'return',
												r.status(400).json({ message: 'Error! Cannot update album!' })
											)
										);
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		nr = (function () {
			var t = We(
				Ve().mark(function t(e, r) {
					var n;
					return Ve().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											console.log('remove object id: ', e.body.track),
											(t.next = 4),
											oe
												.updateOne(
													{ _id: e.params.id },
													{ $pull: { tracks: e.body.track } },
													{ new: !0, upsert: !0 }
												)
												.exec()
										);
									case 4:
										return (n = t.sent), t.abrupt('return', r.status(200).json(n.tracks));
									case 8:
										return (
											(t.prev = 8),
											(t.t0 = t.catch(0)),
											console.log(t.t0),
											t.abrupt(
												'return',
												r.status(400).json({ message: 'Error! Cannot remove song from album!' })
											)
										);
									case 12:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 8]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		or = c().Router();
	or.get('/albums', Xe),
		or.get('/albums/:id', Ze),
		or.post('/albums', jt, Ot, tr),
		or.patch('/albums/:id', jt, Ot, rr),
		or.delete('/albums/:id', jt, Ot, er),
		or.patch('/albums/remove/:id', jt, Ot, nr);
	const ar = or;
	function ir(t) {
		return (
			(ir =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			ir(t)
		);
	}
	function ur() {
		ur = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == ir(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function cr(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	function sr(t) {
		return function () {
			var e = this,
				r = arguments;
			return new Promise(function (n, o) {
				var a = t.apply(e, r);
				function i(t) {
					cr(a, n, o, i, u, 'next', t);
				}
				function u(t) {
					cr(a, n, o, i, u, 'throw', t);
				}
				i(void 0);
			});
		};
	}
	var lr = (function () {
			var t = sr(
				ur().mark(function t(e, r) {
					var n, o;
					return ur().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										if (((t.prev = 0), e.auth)) {
											t.next = 3;
											break;
										}
										throw A().Unauthorized('Require signin!');
									case 3:
										return (t.next = 5), Gt.findOne({ creator: e.auth }).exec();
									case 5:
										return (n = t.sent), (o = n.artists), t.abrupt('return', r.status(200).json(o));
									case 10:
										return (
											(t.prev = 10),
											(t.t0 = t.catch(0)),
											t.abrupt(
												'return',
												r
													.status(404)
													.json({
														error: t.t0.message,
														message: 'Cannot find followed artist',
													})
											)
										);
									case 13:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 10]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		fr = (function () {
			var t = sr(
				ur().mark(function t(e, r) {
					var n, o;
					return ur().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										if (((t.prev = 0), e.auth)) {
											t.next = 3;
											break;
										}
										throw A().Unauthorized('Required signin!');
									case 3:
										return (
											(t.next = 5),
											Gt.findOne({ creator: e.auth })
												.populate({
													path: 'tracks',
													select: '-fileId',
													populate: {
														path: 'album artists',
														select: '-wallpaper -desc -__v -artist',
													},
												})
												.limit(e.query.limit || 10)
												.exec()
										);
									case 5:
										return (
											(o = t.sent),
											console.log('collection :>> ', o),
											t.abrupt(
												'return',
												r
													.status(200)
													.json(
														null !== (n = null == o ? void 0 : o.tracks) && void 0 !== n
															? n
															: []
													)
											)
										);
									case 10:
										return (
											(t.prev = 10),
											(t.t0 = t.catch(0)),
											console.log(t.t0.message),
											t.abrupt(
												'return',
												r
													.status(404)
													.json({ message: 'Cannot find tracks', error: t.t0.message })
											)
										);
									case 14:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 10]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		hr = (function () {
			var t = sr(
				ur().mark(function t(e, r) {
					var n, o;
					return ur().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										if (((t.prev = 0), e.auth)) {
											t.next = 3;
											break;
										}
										throw A().Unauthorized('Require signin!');
									case 3:
										return (
											(t.next = 5),
											Gt.findOne({ creator: e.auth })
												.populate({
													path: 'albums',
													populate: { path: 'artist', select: 'name' },
												})
												.select('albums')
												.exec()
										);
									case 5:
										return (n = t.sent), (o = n.albums), t.abrupt('return', r.status(200).json(o));
									case 10:
										(t.prev = 10),
											(t.t0 = t.catch(0)),
											r.status(404).json({ message: 'Cannot find liked albums' });
									case 13:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 10]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		pr = (function () {
			var t = sr(
				ur().mark(function t(e, r) {
					var n, o;
					return ur().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										if (((t.prev = 0), e.auth)) {
											t.next = 3;
											break;
										}
										throw A().Unauthorized('Require signin!');
									case 3:
										return (
											(t.next = 5),
											Gt.findOne({ $and: [{ creator: e.auth }, { tracks: e.body._id }] })
												.select('tracks')
												.exec()
										);
									case 5:
										if (!t.sent) {
											t.next = 11;
											break;
										}
										return (
											(t.next = 9),
											Gt.updateOne(
												{ creator: e.auth },
												{ $pull: { tracks: e.body._id } },
												{ new: !0 }
											)
										);
									case 9:
										return (n = t.sent), t.abrupt('return', r.status(201).json(n));
									case 11:
										return (
											(t.next = 13),
											Gt.updateOne(
												{ creator: e.auth },
												{ $push: { tracks: e.body._id } },
												{ new: !0, upsert: !0 }
											).exec()
										);
									case 13:
										return (o = t.sent), t.abrupt('return', r.status(201).json(o));
									case 17:
										return (
											(t.prev = 17),
											(t.t0 = t.catch(0)),
											console.log(t.t0.message),
											t.abrupt(
												'return',
												r.status(400).json({ message: 'Cannot update tracks collection!' })
											)
										);
									case 21:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 17]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		vr = (function () {
			var t = sr(
				ur().mark(function t(e, r) {
					var n, o;
					return ur().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											console.log(e.body.artist),
											(t.next = 4),
											Gt.findOne({ $and: [{ creator: e.auth }, { artists: e.body.artist }] })
												.select('artists')
												.exec()
										);
									case 4:
										if (t.sent) {
											t.next = 10;
											break;
										}
										return (
											(t.next = 8),
											Gt.findOneAndUpdate(
												{ creator: e.auth },
												{ $push: { artists: e.body.artist } },
												{ new: !0, upsert: !0 }
											).exec()
										);
									case 8:
										return (n = t.sent), t.abrupt('return', r.status(201).json(n));
									case 10:
										return (
											(t.next = 12),
											Gt.findOneAndUpdate(
												{ creator: e.auth },
												{ $pull: { artists: b().Types.ObjectId(e.body.artist) } },
												{ new: !0 }
											)
										);
									case 12:
										return (o = t.sent), t.abrupt('return', r.status(204).json(o));
									case 16:
										return (
											(t.prev = 16),
											(t.t0 = t.catch(0)),
											console.log(t.t0.message),
											t.abrupt(
												'return',
												r.status(500).json({ status: t.t0.status, message: t.t0.message })
											)
										);
									case 20:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 16]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		dr = (function () {
			var t = sr(
				ur().mark(function t(e, r) {
					var n, o;
					return ur().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										if (((t.prev = 0), e.auth)) {
											t.next = 3;
											break;
										}
										throw A().Unauthorized('Require signin!');
									case 3:
										return (
											(t.next = 5),
											Gt.findOne({ creator: e.auth, albums: e.body._id }).select('albums').exec()
										);
									case 5:
										if (t.sent) {
											t.next = 11;
											break;
										}
										return (
											(t.next = 9),
											Gt.updateOne(
												{ creator: e.auth },
												{ $addToSet: { albums: e.body._id } },
												{ new: !0, upsert: !0 }
											).exec()
										);
									case 9:
										return (n = t.sent), t.abrupt('return', r.status(201).json(n));
									case 11:
										return (
											(t.next = 13),
											Gt.updateOne(
												{ creator: e.auth },
												{ $pull: { albums: e.body._id } },
												{ new: !0 }
											)
										);
									case 13:
										return (o = t.sent), t.abrupt('return', r.status(201).json(o));
									case 17:
										return (
											(t.prev = 17),
											(t.t0 = t.catch(0)),
											t.abrupt(
												'return',
												r.status(200).json({ status: t.t0.status, message: t.t0.message })
											)
										);
									case 20:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 17]]
					);
				})
			);
			return function (e, r) {
				return t.apply(this, arguments);
			};
		})(),
		yr = c().Router();
	yr.get('/collection/tracks', jt, fr),
		yr.get('/collection/albums', jt, hr),
		yr.get('/collection/artists', jt, lr),
		yr.patch('/collection/tracks', jt, pr),
		yr.patch('/collection/albums', jt, dr),
		yr.patch('/collection/artists', jt, vr);
	const mr = yr;
	function gr(t) {
		return (
			(gr =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			gr(t)
		);
	}
	function wr() {
		wr = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == gr(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function br(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	const xr = (function () {
		var t,
			e =
				((t = wr().mark(function t(e, r) {
					var n, o, a, i, u, c, s;
					return wr().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											(n = e.query.keyword.toLowerCase()),
											(o = new RegExp('^'.concat(n), 'gi')),
											(t.next = 5),
											re.find({ $or: [{ name: o }, { desc: o }] }).limit(3)
										);
									case 5:
										return (
											(a = t.sent),
											(t.next = 8),
											oe
												.find({ $or: [{ title: o }, { artist: a }] })
												.populate({ path: 'artist', select: '-wallpaper' })
												.limit(3)
										);
									case 8:
										return (i = t.sent), (t.next = 11), G.find({ name: o }).limit(3);
									case 11:
										return (
											(u = t.sent),
											(t.next = 14),
											S.find({ $or: [{ title: o }, { artists: a }, { genre: u }] })
												.populate({
													path: 'artists album genre',
													select: '-releaseDate -artist -tracks -__v -wallpaper -desc',
												})
												.select('-__v -fileId -createdAt -updatedAt -uploader ')
												.limit(10)
										);
									case 14:
										return (
											(c = t.sent),
											(t.next = 17),
											Te.find({ title: o })
												.populate({ path: 'creator artist', select: 'username name' })
												.limit(3)
										);
									case 17:
										return (
											(s = t.sent),
											t.abrupt(
												'return',
												r.status(200).json({ tracks: c, artists: a, playlists: s, albums: i })
											)
										);
									case 21:
										return (
											(t.prev = 21),
											(t.t0 = t.catch(0)),
											t.abrupt('return', r.json({ message: 'No result', status: 404 }))
										);
									case 24:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 21]]
					);
				})),
				function () {
					var e = this,
						r = arguments;
					return new Promise(function (n, o) {
						var a = t.apply(e, r);
						function i(t) {
							br(a, n, o, i, u, 'next', t);
						}
						function u(t) {
							br(a, n, o, i, u, 'throw', t);
						}
						i(void 0);
					});
				});
		return function (t, r) {
			return e.apply(this, arguments);
		};
	})();
	var Lr = c().Router();
	Lr.get('/search', xr);
	const Er = Lr;
	var jr = c().Router();
	[St, te, me, Se, Me, ar, mr, Er].forEach(function (t) {
		return jr.use(t);
	});
	const Or = jr,
		kr = {
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'production'.toLowerCase().includes('production')
				? process.env.REMOTE_CALLBACK_URL
				: process.env.LOCAL_CALLBACK_URL,
		},
		_r = require('passport-google-oauth2');
	v().use(
		new _r.Strategy(
			{
				clientID: kr.clientId,
				clientSecret: kr.clientSecret,
				callbackURL: '/api/auth/google/callback',
				passReqToCallback: !0,
			},
			function (t, e, r, n, o) {
				console.log(n);
				var a = { email: n.email, username: n.displayName, avatar: n.picture, role: 'USER' };
				wt.findOrCreate(a, function (t, e) {
					return o(null, !t && e.toObject());
				});
			}
		)
	),
		v().serializeUser(function (t, e) {
			return e(null, t);
		}),
		v().deserializeUser(function (t, e) {
			return e(null, t);
		});
	const Sr = require('passport-local');
	v().use(
		new Sr.Strategy(
			{ usernameField: 'email', passwordField: 'password', passReqToCallback: !0, session: !0 },
			function (t, e, r, n) {
				wt.findOne({ email: e }, function (t, e) {
					return t
						? n(null, !1, { message: t.message })
						: e
						? (console.log(e.authenticate(r)),
						  e.authenticate(r) ? n(null, e.toObject()) : n(null, !1, { message: 'Incorrect password!' }))
						: n(null, !1, { message: 'Account does not exist!' });
				});
			}
		)
	),
		v().serializeUser(function (t, e) {
			return e(null, t);
		}),
		v().deserializeUser(function (t, e) {
			return e(null, t);
		});
	const Pr = require('cookie-parser');
	var Tr = t.n(Pr),
		Nr = c()();
	Nr.use(i()({ origin: '*', methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'] })),
		Nr.use(c().json()),
		Nr.use(o()({ level: 6, threshold: 1024 })),
		Nr.use(h()('tiny')),
		Nr.use(Tr()()),
		Nr.use(
			l()({ saveUninitialized: !1, store: new s.MemoryStore(), secret: process.env.SESSION_SECRET, resave: !1 })
		),
		Nr.use(v().initialize()),
		Nr.use(v().session()),
		Nr.get('/', function (t, e) {
			try {
				return e.json({ status: 200, message: 'Server now is running!' });
			} catch (t) {
				return e.status(500).send('Server is stopped!');
			}
		}),
		Nr.get('/activate-account', function (t, e) {
			return e.sendFile(y().resolve('verify-account.html'));
		}),
		Nr.use('/api', Or);
	const Gr = Nr;
	function Ir(t) {
		return (
			(Ir =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t;
					  }),
			Ir(t)
		);
	}
	function Ar() {
		Ar = function () {
			return t;
		};
		var t = {},
			e = Object.prototype,
			r = e.hasOwnProperty,
			n =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value;
				},
			o = 'function' == typeof Symbol ? Symbol : {},
			a = o.iterator || '@@iterator',
			i = o.asyncIterator || '@@asyncIterator',
			u = o.toStringTag || '@@toStringTag';
		function c(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
		}
		try {
			c({}, '');
		} catch (t) {
			c = function (t, e, r) {
				return (t[e] = r);
			};
		}
		function s(t, e, r, o) {
			var a = e && e.prototype instanceof h ? e : h,
				i = Object.create(a.prototype),
				u = new O(o || []);
			return n(i, '_invoke', { value: x(t, r, u) }), i;
		}
		function l(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) };
			} catch (t) {
				return { type: 'throw', arg: t };
			}
		}
		t.wrap = s;
		var f = {};
		function h() {}
		function p() {}
		function v() {}
		var d = {};
		c(d, a, function () {
			return this;
		});
		var y = Object.getPrototypeOf,
			m = y && y(y(k([])));
		m && m !== e && r.call(m, a) && (d = m);
		var g = (v.prototype = h.prototype = Object.create(d));
		function w(t) {
			['next', 'throw', 'return'].forEach(function (e) {
				c(t, e, function (t) {
					return this._invoke(e, t);
				});
			});
		}
		function b(t, e) {
			function o(n, a, i, u) {
				var c = l(t[n], t, a);
				if ('throw' !== c.type) {
					var s = c.arg,
						f = s.value;
					return f && 'object' == Ir(f) && r.call(f, '__await')
						? e.resolve(f.__await).then(
								function (t) {
									o('next', t, i, u);
								},
								function (t) {
									o('throw', t, i, u);
								}
						  )
						: e.resolve(f).then(
								function (t) {
									(s.value = t), i(s);
								},
								function (t) {
									return o('throw', t, i, u);
								}
						  );
				}
				u(c.arg);
			}
			var a;
			n(this, '_invoke', {
				value: function (t, r) {
					function n() {
						return new e(function (e, n) {
							o(t, r, e, n);
						});
					}
					return (a = a ? a.then(n, n) : n());
				},
			});
		}
		function x(t, e, r) {
			var n = 'suspendedStart';
			return function (o, a) {
				if ('executing' === n) throw new Error('Generator is already running');
				if ('completed' === n) {
					if ('throw' === o) throw a;
					return _();
				}
				for (r.method = o, r.arg = a; ; ) {
					var i = r.delegate;
					if (i) {
						var u = L(i, r);
						if (u) {
							if (u === f) continue;
							return u;
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg;
					else if ('throw' === r.method) {
						if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
						r.dispatchException(r.arg);
					} else 'return' === r.method && r.abrupt('return', r.arg);
					n = 'executing';
					var c = l(t, e, r);
					if ('normal' === c.type) {
						if (((n = r.done ? 'completed' : 'suspendedYield'), c.arg === f)) continue;
						return { value: c.arg, done: r.done };
					}
					'throw' === c.type && ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg));
				}
			};
		}
		function L(t, e) {
			var r = e.method,
				n = t.iterator[r];
			if (void 0 === n)
				return (
					(e.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = void 0), L(t, e), 'throw' === e.method)) ||
						('return' !== r &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					f
				);
			var o = l(n, t.iterator, e.arg);
			if ('throw' === o.type) return (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), f;
			var a = o.arg;
			return a
				? a.done
					? ((e[t.resultName] = a.value),
					  (e.next = t.nextLoc),
					  'return' !== e.method && ((e.method = 'next'), (e.arg = void 0)),
					  (e.delegate = null),
					  f)
					: a
				: ((e.method = 'throw'),
				  (e.arg = new TypeError('iterator result is not an object')),
				  (e.delegate = null),
				  f);
		}
		function E(t) {
			var e = { tryLoc: t[0] };
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e);
		}
		function j(t) {
			var e = t.completion || {};
			(e.type = 'normal'), delete e.arg, (t.completion = e);
		}
		function O(t) {
			(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
		}
		function k(t) {
			if (t) {
				var e = t[a];
				if (e) return e.call(t);
				if ('function' == typeof t.next) return t;
				if (!isNaN(t.length)) {
					var n = -1,
						o = function e() {
							for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						};
					return (o.next = o);
				}
			}
			return { next: _ };
		}
		function _() {
			return { value: void 0, done: !0 };
		}
		return (
			(p.prototype = v),
			n(g, 'constructor', { value: v, configurable: !0 }),
			n(v, 'constructor', { value: p, configurable: !0 }),
			(p.displayName = c(v, u, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor;
				return !!e && (e === p || 'GeneratorFunction' === (e.displayName || e.name));
			}),
			(t.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, v)
						: ((t.__proto__ = v), c(t, u, 'GeneratorFunction')),
					(t.prototype = Object.create(g)),
					t
				);
			}),
			(t.awrap = function (t) {
				return { __await: t };
			}),
			w(b.prototype),
			c(b.prototype, i, function () {
				return this;
			}),
			(t.AsyncIterator = b),
			(t.async = function (e, r, n, o, a) {
				void 0 === a && (a = Promise);
				var i = new b(s(e, r, n, o), a);
				return t.isGeneratorFunction(r)
					? i
					: i.next().then(function (t) {
							return t.done ? t.value : i.next();
					  });
			}),
			w(g),
			c(g, u, 'Generator'),
			c(g, a, function () {
				return this;
			}),
			c(g, 'toString', function () {
				return '[object Generator]';
			}),
			(t.keys = function (t) {
				var e = Object(t),
					r = [];
				for (var n in e) r.push(n);
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop();
							if (n in e) return (t.value = n), (t.done = !1), t;
						}
						return (t.done = !0), t;
					}
				);
			}),
			(t.values = k),
			(O.prototype = {
				constructor: O,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = void 0),
						this.tryEntries.forEach(j),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
				},
				stop: function () {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ('throw' === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function (t) {
					if (this.done) throw t;
					var e = this;
					function n(r, n) {
						return (
							(i.type = 'throw'),
							(i.arg = t),
							(e.next = r),
							n && ((e.method = 'next'), (e.arg = void 0)),
							!!n
						);
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							i = a.completion;
						if ('root' === a.tryLoc) return n('end');
						if (a.tryLoc <= this.prev) {
							var u = r.call(a, 'catchLoc'),
								c = r.call(a, 'finallyLoc');
							if (u && c) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
							} else {
								if (!c) throw new Error('try statement without catch or finally');
								if (this.prev < a.finallyLoc) return n(a.finallyLoc);
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n];
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var a = o;
							break;
						}
					}
					a && ('break' === t || 'continue' === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
					var i = a ? a.completion : {};
					return (
						(i.type = t),
						(i.arg = e),
						a ? ((this.method = 'next'), (this.next = a.finallyLoc), f) : this.complete(i)
					);
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg;
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
							? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
							: 'normal' === t.type && e && (this.next = e),
						f
					);
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), j(r), f;
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e];
						if (r.tryLoc === t) {
							var n = r.completion;
							if ('throw' === n.type) {
								var o = n.arg;
								j(r);
							}
							return o;
						}
					}
					throw new Error('illegal catch attempt');
				},
				delegateYield: function (t, e, r) {
					return (
						(this.delegate = { iterator: k(t), resultName: e, nextLoc: r }),
						'next' === this.method && (this.arg = void 0),
						f
					);
				},
			}),
			t
		);
	}
	function Fr(t, e, r, n, o, a, i) {
		try {
			var u = t[a](i),
				c = u.value;
		} catch (t) {
			return void r(t);
		}
		u.done ? e(c) : Promise.resolve(c).then(n, o);
	}
	const Cr = (function () {
		var t,
			e =
				((t = Ar().mark(function t() {
					return Ar().wrap(
						function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(t.prev = 0),
											b().set('strictQuery', !1),
											(t.next = 4),
											b().connect(Xt.mongoURI)
										);
									case 4:
										console.info('[SUCCESS] Connected to database!'), (t.next = 10);
										break;
									case 7:
										(t.prev = 7), (t.t0 = t.catch(0)), console.log(t.t0);
									case 10:
									case 'end':
										return t.stop();
								}
						},
						t,
						null,
						[[0, 7]]
					);
				})),
				function () {
					var e = this,
						r = arguments;
					return new Promise(function (n, o) {
						var a = t.apply(e, r);
						function i(t) {
							Fr(a, n, o, i, u, 'next', t);
						}
						function u(t) {
							Fr(a, n, o, i, u, 'throw', t);
						}
						i(void 0);
					});
				});
		return function () {
			return e.apply(this, arguments);
		};
	})();
	var qr = process.env.PORT || 3001;
	r()
		.createServer(Gr)
		.listen(qr, function () {
			console.info('[SUCCESS] Server is listening on port '.concat(qr));
		}),
		Cr();
})();
