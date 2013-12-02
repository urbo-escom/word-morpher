var GraphBuilder = {

	asText: function(config, path) {
		var str = "";

		str += ""+config.from+"->"+config.to+":\n";
		for(var word = config.from; path[word] != undefined;
		    word = path[word])
			str += "\t"+word+"->"+path[word]+"\n";
		str += "\n";
		return str;
	},

	asDot: function(config, path) {
		var str = "";

		str += "graph "+config.from+"_"+config.to+" {\n";
		for(var word = config.from; path[word] != undefined;
		    word = path[word])
			str += "\t"+word+" -- "+path[word]+"\n";
		str += "}\n";
		return str;
	},

	asSVG: function(config, path) {
		var graph = this.asDot(config, path);
		return Viz(graph, "svg");
	}

}

