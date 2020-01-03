/*\

Hello, World widget

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var MyWidget = function(parseTreeNode,options) {
  this.initialise(parseTreeNode,options);
	this.addEventListeners([
		{type: "tm-test-event", handler: "handleTestEvent"}
	]);
	console.log("InstalledInstalledInstalledInstalledInstalledInstalled");
  this.makeChildWidgets();
};

/*
Inherit from the base widget class
*/
MyWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
MyWidget.prototype.render = function(parent,nextSibling) {
    this.parentDomNode = parent;
    //var textNode = this.document.createTextNode("Hello, World!");
    //parent.insertBefore(textNode,nextSibling);
    //this.domNodes.push(textNode);
    this.renderChildren(parent,nextSibling)
    console.log("EVENTEVENTEVENTEVENTEVENTEVENTEVENTEVENTEVENT",this.children);
};

MyWidget.prototype.handleTestEvent = function(event) {
	console.log("EVENT",event)
  return false
};

exports.hello = MyWidget;

})();
