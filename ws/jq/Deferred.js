(function() {
	/**
	 * 
	 */
	jQuery.extend({
		Deferred: function( func ) {
			var tuples = [
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "reject" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				deferred = {},
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function() {
						var fns = arguments;
					},
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				};
			promise.pipe = promise.then;
			jQuery.each( tuples, function() {
				//the Callbacks object
				var list = tuples[ 2 ],
				//resolved | rejcted | undefined
					stateString = tuples[ 3 ];
				// promise[ done | fail | progress ] = list.add
				promise[ tuples[ 1 ] ] = list.add;

				//handle state
				if ( stateString ) {
					list.add(function() {
							state = stateString;
						}, 
						tuples[ i ^ 1 ][ 2 ].disable, 
						tuples[ 2 ][ 2 ].lock 
					);
				}
				deferred[ tuples[0] ] = function() {
					deferred[ tuples[0] +"With" ]( this === deferred ? promise : this, arguments );
				};
				deferred[ tuples[0] + "With" ] = list.fireWith;
			});

			promise.promise( deferred );

			if ( func ) {
				func.call( deferred, deferred );
			}
			return deferred;
		}
	});
})();