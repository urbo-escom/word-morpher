$( document ).ready( function(){
	$("#from, #to").autocomplete({
		minLength: 1,
		source: function(request, response) {
			var term = request.term;
			var search = words4.concat(words5).filter(
			function(e,j) {
				for(var i = 0; i < term.length; i++)
					if (term.charCodeAt(i) !=
					    e.charCodeAt(i))
						return false;
				return true;
			}).filter(function(e,i) { return i < 5; });
			response(search);
		}
	});
});

