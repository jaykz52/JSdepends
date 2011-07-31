JSDepends
=============

JSDepends is an easy-to-use dependency management tool for Javascript. It also happens to be quite good at asynchronous loading of dependencies.

# Usage
To leverage JSDepends,  reference the script in the <head></head> of your html a la:

 <script src='url/for/depends.js' type='text/javascript'></script>

JSDepends' dependency tree is initially empty, but there's a few ways to build it up. You can:

1. Extend the dependency tree yourself by adding something like the following below your depends.js declaration: 
	
	<script type="text/javascript">
	depends.extend({
		'random-script' : {'url' : 'url/for/randomscript.js', require: null},
		'some-local-file' : {'url' : 'url/for/file.js', require: ['jquery-ui', 'random-script']},
		'jquery-ui' : {'url' : 'url/for/jquery-ui.js', require: ['jquery']},
		'jquery' : {'url' : 'url/for/jquery.js'}
	});
	</script>

2. reference a publicly available dependency tree (TBA):
	
	<script src="url/for/depends-tree.js" type="text/javascript"></script>
	
3. Both! When extending the dependency tree, new dependencies will simply be added; if there's a key collision (i.e. 2 'jquery' dependencies), the tree is updated from the last occurrence. This makes it easy to leverage an existing public repo, and still allowing you to customize it by updating urls, adding your own private files/frameworks, etc:

	<script src="url/for/depends-tree.js" type="text/javascript"></script>
	<script>
	depends.extend({
		'some-local-file' : {'url' : 'url/for/file.js', require: ['jquery']},
		'jquery' : {'url' : 'new/url/for/jquery.js'}
	});
	</script>
	
Once the dependency tree has been populated (hopefully using a publicly available one to save you time), you can actually tell depends which scripts you rely on:
	
	<script type="text/javascript">
	depends.js(['some-local-file', 'coffeescript'], true, function() {
		// do something once all the dependencies are loaded...
		alert("Hello, world!");
	});
	</script>
	
The 1st arg is the array of dependencies (by key), followed by a boolean that tells JSDepends whether you want to pull down transitive dependencies along with your explicit ones. Lastly, you can declare a callback that will be called when all of your dependencies are loaded. Enjoy!

# Get the source
<https://github.com/jaykz52/JSDepends>

# Issues/Feature Requests/Fan Mail
I'm working on adding version support to JSDepends. Currently this could be accomplished by uniquely naming keys in the dependency tree, but it's not particularly helpful or time-saving.

Additionally, I'd like to make it possible to declare 'dependency groups' so that you could declare separate callbacks for when a particular group had finished loading, rather than having to wait for ALL scripts to load.

Go to <https://github.com/jaykz52/JSDepends/issues> and let me know what doesn't work along with some repro steps. If you'd like to see a feature let me know; we might be able to work something out...

# License
Copyright (c) 2011 Jason Kozemczak <jason.kozemczak@gmail.com>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.