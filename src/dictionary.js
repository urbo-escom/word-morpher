var Dictionary = {

	// Se pueden encadenar?
	areChainable: function(w1, w2) {
		var l1 = w1.length;
		var l2 = w2.length;

		if (l1 != l2)
			return false;

		var hasOneLetterChanged = false;
		for(var i = 0; i < l1; i++) {
			if (w1.charAt(i) == w2.charAt(i))
				continue;
			if (w1.charAt(i) != w2.charAt(i) &&
			    hasOneLetterChanged)
				return false;
			if (w1.charAt(i) != w2.charAt(i) &&
			    !hasOneLetterChanged)
				hasOneLetterChanged = true;
		}

		return true;
	},

	// La comparación normal == ó === no funciona con UTF-8 o
	// la codificación en los archivos está fallando...
	equal: function(w1, w2) {
		var l1 = w1.length;
		var l2 = w2.length;

		if (l1 != l2)
			return false;

		for(var i = 0; i < l1; i++)
			if (w1.charCodeAt(i) != w2.charCodeAt(i))
				return false;

		return true;
	},

	indexOf: function(words) {
		var l = words.length;
		var that = this;

		var findIndex = function(word) {
			for(var i = 0; i < l; i++)
				if (that.equal(words[i], word))
					return i;
			return undefined;
		};

		var indices = [];
		for(var i = 1; i < arguments.length; i++)
			indices[i - 1] = findIndex(arguments[i]);

		return indices;
	}

}

