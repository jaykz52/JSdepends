(function(doc) {
    var dependencyList = [],
        callbacks = [],
        scriptElementsToLoad = [],
        isDOMLoaded = false,
        allScriptsAppended = false;


    if (!window.dependsRepo) {
        window.dependsRepo = {
            'jquery-paging' : { 'url' : 'http://localhost:11080/movement-request-validation-portlet/javascripts/jquery.paging.js', 'require' : ['jquery'] },
            'jquery-metadata' : { 'url' : 'http://localhost:11080/movement-request-validation-portlet/javascripts/jquery.metadata.js', 'require' : ['jquery'] },
            'sorting' : { 'url' : 'http://localhost:11080/movement-request-validation-portlet/javascripts/columnSorting.js', 'require' : ['jquery'] },
            'jquery-portlet' : { 'url' : 'http://localhost:11080/movement-request-validation-portlet/javascripts/jquery.portlet-1.0.js', 'require' : ['jquery'] },
            'jquery-tooltip' : { 'url' : 'http://localhost:11080/movement-request-validation-portlet/javascripts/jquery.wtooltip.js', 'require' : ['jquery'] },
            'jquery' : { 'url' : 'jquery.js', 'require' : null }
        };
    }
    var tree = window.dependsRepo;

    if (!window.depends) window.depends = {};
    window.depends.js = function(dependencies, includeTransitives, callback) {
        if (callback) callbacks.push(callback);
        for (var i = 0; i < dependencies.length; i++) {
            var deps = buildDependencies(dependencies[i], includeTransitives);
            for (var j = 0; j < deps.length; j++) {
                safelyPushDependency(dependencyList, deps[j]);
            }
        }
    };
    window.depends.extend = function(extTree) {
        // overwrite/add to main repo tree
        for (var extRequire in extTree) { tree[extRequire] = extTree[extRequire]; }
    }

    // we'll only add the dependency once...
    function safelyPushDependency(list, required) {
        for (var i = 0; i < list.length; i++) {
            if (required == list[i]) return;
        }
        list.push(required);
    }

    function buildDependencies(key, includeTransitives) {
        var deps = [];
        var subTree = tree[key];
        if (includeTransitives && subTree.require !== undefined && subTree.require !== null) {
            for (var k = 0; k < subTree.require.length; k++) {
                var subDeps = buildDependencies(subTree.require[k], includeTransitives);
                for (var j = 0; j < subDeps.length; j++) { safelyPushDependency(deps, subDeps[j]); }
            }
        }
        safelyPushDependency(deps, key);
        return deps;
    }
    function isElementLoaded(el) {
        return el.readyState === 'loaded' || el.readyState === 'complete';
    }
    function createScriptElement(url) {
            var scriptEl = doc.createElement('script');
            scriptEl.src = url;
            scriptEl.type = 'text/javascript';
            scriptElementsToLoad.push(scriptEl);
            scriptEl.onload = function() { scriptLoaded(scriptEl); };
            scriptEl.onreadystatechange = function() {
                if (isElementLoaded(scriptEl)) scriptLoaded(scriptEl);
            };
            (doc.body || doc.head).appendChild(scriptEl);
    }
    function scriptLoaded(scriptElement) {
        scriptElement.isLoaded = true;

        if (allScriptsAppended) {
            for (var i = 0; i < scriptElementsToLoad.length; i++) {
                if (!scriptElementsToLoad[i].isLoaded) return;
            }

            for (var k = 0; k < callbacks.length; k++) { callbacks[k](); }
        }
    }

    var loaded = function() {
        if (isDOMLoaded) return;
        isDOMLoaded = true;
        for (var i = 0; i < dependencyList.length; i++) { createScriptElement(tree[dependencyList[i]].url); }
        allScriptsAppended = true;
    };


    // start loading once the load event fires...
    if (window.addEventListener) {
        doc.addEventListener('DOMContentLoaded', loaded, false);
        doc.addEventListener("load", loaded, false); // we might need to hook in here..
    } else if (window.attachEvent) {
        doc.attachEvent('onreadystatechange', function() {
            if (isElementLoaded(doc)) loaded();
        });
        window.attachEvent('onload', loaded); // we might need to hook in here..
    }
}(document));