define([
  "locales",
  "handlebars"
], function(locale, Handlebars) {

	/**
	 * Liefert den lokalisierten Text zurück.
	 *
	 * @param string text
	 */
	Handlebars.registerHelper("__", function(text){
		return locale.__(text);
	});

	/**
	 * 
	 */
	Handlebars.registerHelper("assign", function(name) {
		if(arguments.length > 0)
		{
			var type = typeof(arguments[1]);
			var arg = null;
			if(type === "string" || type === "number" || type === "boolean") arg = arguments[1];
			Handlebars.registerHelper(name, function() { return arg; });
		}
	  return "";
	});

	/**
	 * 
	 */
	Handlebars.registerHelper("nl2br", function(text) {
		return _handlebarsNewlineToBreak(text);
	});

	/**
	 * 
	 */
	Handlebars.registerHelper("if_eq", function(context, options) {
		if(context === options.hash.compare) return options.fn(this);
		return options.inverse(this);
	});

	/**
	 * 
	 */
	Handlebars.registerHelper("subTemplate", function(name, sourceContext) {
		var template = Handlebars.compile($("#template-" + name).html());
		var templateContext = $.extend({}, this, sourceContext.hash);
		return new Handlebars.SafeString( template(templateContext) );
	});
	
	/**
	 * 
	 */
	Handlebars.registerHelper("toLowerCase", function(value) {
		return (value && typeof value === "string") ? value.toLowerCase() : '';
	});

	/**
	 * 
	 */
	Handlebars.registerHelper("splitFill", function(value, splitChar, fillChar) {
		var splits = value.split(splitChar);
		
		return new Array(splits.length).join(fillChar) + splits[splits.length - 1];
	});

	/**
	 * Convert Newline to HTML-Break (nl2br).
	 *
	 * @param {String} text
	 * @returns {String}
	 */
	function _handlebarsNewlineToBreak(text)
	{
		return (text + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + "<br>" + "$2");
	} // _handlebarsNewlineToBreak

	return Handlebars;
});