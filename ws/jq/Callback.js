(function() {
	var rnotwhite = (/\S+/g),
		optionsCache = {},
		createOptions = function(options) {
			var object = optionsCache[options] = {};
			jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
				object[flag] = true;
			});
		};
	/**
	 * 观察者类f
	 * list: 订阅者
	 * stack： 要发布的消息栈
	 * 可选模式：
	 *   once: 只发布一次，不设置消息栈
	 *   memory： 记住上次发布的消息，当有订阅者时，会立即被通知。设置信息栈
	 *   unique
	 *   stopOnFalse
	 */

	jQuery.Callbacks = function(options) {
		options = typeof options === "string" ?
			(optionsCache[options] || createOptions(options)) :
			jQuery.extend({}, options);

		var firing,
			//上次触发的zhi
			memory,
			fired,
			firingLength,
			firingIndex,
			fireingStart,
			//actual callback list
			list = [],
			//Stack of fire calls to repeatale lists
			//each element cotaions its context and arguments ([context, arg])
			//if options contaions "once" ,stack would be undefined
			stack = !options.one && [],
			fire = function(data) {
				memory = options.memory && data;
				fired = true;
				firingIndex = fireingStart || 0;
				fireingStart = 0;
				firingLength = list.length;
				firing = true;
				for (; list && firingIndex < firingLength; firingIndex++) {
					if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
						memory = false;
						break;
					}
				}
				firing = false;
				if (list) {
					if (stack) {
						// not once
						if (stack.length) {
							fire(stack.shift());
						}
					} else if (memory) {
						//once memory
						list = []
					} else {
						//once, not memory
						self.disable();
					}
				}
			},
			//Actual Callbacks object
			self = {
				//to add callback or a collection of callbacks to the list
				add: function(args) {
					if (list) {
						//save the current length of callback list
						var start = list.length;
						//then, add the callback to the list
						(function add(args) {
							jQuery.each(args, function(_, arg) {
								var type = jQuery.type(arg);
								if (type === "function") {
									if (!options.unique || !self.has(arg)) {
										list.push(arg);
									}
								} else if (arg && arg.length && type !== "string") {
									add(arg);
								};
							});
						})(arguments);
						//if the Callback object is firing,
						//then switch the callbacks length
						if (firing) {
							firingLength = list.length;
							//with memory, if not firing then
							//call the added callbacks right away
						} else if (memory) {
							fireingStart = start;
							fire(memory);
						}
					}
					return this;
				},
				remove: function() {
					if (list) {
						jQuery.each(arguments, function(_, arg) {
							var index;
							while ((index = jQuery.inArray(arg, list, index)) > -1) {
								list.splice(index, 1);
								//handle firing indexes
								if (firing) {
									if (index <= firingLength) {
										firingLength--;
									}
									if (index <= firingIndex) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				has: function(fn) {
					return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
				},
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				disable: function() {
					list = stack = memory = undefined;
				},
				disabled: function() {
					return !list;
				},
				lock: function() {
					stack = undefined;
					if (!memory) {
						self.disable();
					}
				},
				locked: function() {
					return !stack;
				},
				fireWith: function(context, args) {
					if (list && (!fired || stack)) {
						args = args || [];
						args = [context, args.slice ? args.slice : args];
						if (firing) {
							stack.push(args);
						} else {
							fire(args);
						}
					}
					return this;
				},
				fire: function() {
					self.fireWith(this, arguments);
					return this;
				},
				fired: function() {
					return !!fired;
				}
			};
		return self;
	}
})();
