<!-- 🚨 STOP 🚨 𝗦𝗧𝗢𝗣 🚨 𝑺𝑻𝑶𝑷 🚨

Half of all issues filed here are duplicates, answered in the FAQ, or not appropriate for the bug tracker. Even if you think you've found a *bug*, please read the FAQ first, especially the Common "Bugs" That Aren't Bugs section!

Please help us by doing the following steps before logging an issue:
  * Search: https://github.com/Microsoft/TypeScript/search?type=Issues
  * Read the FAQ: https://github.com/Microsoft/TypeScript/wiki/FAQ

Please fill in the *entire* template below.
-->

<!-- Please try to reproduce the issue with `typescript@next`. It may have already been fixed. -->


<!-- Search terms you tried before logging this (so others can find this issue more easily) -->
**Search Terms:**

Node intellisense require not working with variable in the path "no definition found" even with a jsconfig file

**Code**

Config file not necessary, but it's an example of a typical use-case in a larger project with many directories since it simplifies all the require calls to be consistent regardless of the file location.
/config.js
```js
global.__base = __dirname + '/';
```

/classes/MyClass.js
```js
class MyClass {
	sayHello() {
		console.log('hello');
	}
}
module.exports = MyClass;
```



*example of where the issue happens:*
/example.js
```js
//require('config.js');

var __base = './';	// shows that it's not related to it being a global variable.

const MyClass = require(__base + 'classes/MyClass.js');	// If `__base + ` was just ignored, then the jsconfig would allow intellisense to work

var myClass = new MyClass();
myClass.sayHello();	// Intellisense: "No definition found for "sayHello"
```

*If the variable was ignored e.g. "require('classes/MyClass.js');" works fine with the following jsconfig*
/jsconfig.json
```
{
	"compilerOptions": {
		"target": "ES6",
		"baseUrl": "."
	}
}
```


**Expected behavior:**

Any variables in the require call to be ignored/striped out when being parsed for intellisense:
E.g. It should read `require(__base + 'classes/MyClass.js');` as if it's `require('classes/MyClass.js');` which will make the intellisense work due to the jsconfig.json file.


**Actual behavior:**

Intellisense will not link up to the required class/module.

**Playground Link:** <!-- A link to a TypeScript Playground "Share" link which demonstrates this behavior -->

**Related Issues:** <!-- Did you find other bugs that looked similar? -->
The following issue is very similar, but they are using a variable for the entire require which couldn't be solved easily.
https://github.com/Microsoft/TypeScript/issues/18656