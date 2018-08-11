//require('config.js');

var __base = './';	// shows that it's not related to it being a global variable.

const MyClass = require(__base + 'classes/MyClass.js');	// If `__base + ` was just ignored, then the jsconfig would allow intellisense to work

var myClass = new MyClass();
myClass.sayHello();	// "No definition found for "sayHello"