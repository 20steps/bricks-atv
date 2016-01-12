'use strict';

log.debug('loading bricks.infrastructure.core.stateProvider');

bricks.stateProvider = {
    router: new Router.Router(),
    replaceDocument: false,

    controllers: {},
    controller: function(key,callback) {
        log.debug('bricks.stateProvider.controller',key,callback);
        bricks.stateProvider.controllers[key]=callback;
        if (typeof callback.init !=='undefined') {
            log.debug('bricks.stateProvider.initializingController',callback);
            callback.init();
        }
        return bricks.stateProvider;
    },

    states: [],
    state: function(key,state) {
        log.debug('bricks.stateProvider.state',key,state);
        bricks.stateProvider.states.push({
            key: key,
            url: state.url,
            controller: state.controller,
            template: state.template
        });
        return bricks.stateProvider;
    },

    generateURL: function(key,params) {
        log.debug('bricks.stateProvider.generateURL',key,params);
        var state = _.find(bricks.stateProvider.states,function(state) {
            return state.key == key;
        });
        log.debug('found state',state);
        if (params) {
            return bricks.stateProvider.router.generate(state.controller,params);
        } else {
            return bricks.stateProvider.router.generate(state.controller);
        }
    },

    handleURL: function(url) {
        log.debug("bricks.stateProvider.handleURL",url,replaceDocument);
    },

    goSRefString: function(sref) {
        log.debug('bricks.stateProvider.goSRef',sref);
        var regexp = /([a-zA-Z_-]+)\((.+)\)/g;
        var matches = regexp.exec(sref);
        var to = null;
        var params = null;
        if (matches) {
            to = matches[1];
            log.debug('params-string', matches[2]);
            params = JSON.parse(matches[2]);
            bricks.stateProvider.go(to, params);
        } else {
            to = sref;
            bricks.stateProvider.go(to);
        }
    },

    go: function(to,params,replaceDocument) {
        bricks.stateProvider.replaceDocument = replaceDocument || false;
        if (replaceDocument) {
            log.debug('replacing document');
        }
        log.debug('bricks.stateProvider.go',to,params);
        var url;
        if (params) {
            log.debug('calling generateURL with params',params);
            url = bricks.stateProvider.generateURL(to,params);
        } else {
            log.debug('calling generateURL without params');
            url = bricks.stateProvider.generateURL(to);
        }
        log.debug('generated url',url);
        bricks.stateProvider.handleURL(url);
    },

    findOneControllerByKey: function(controllerKey) {
        log.debug('bricks.stateProvider.findOneControllerByKey',controllerKey);
        return bricks.stateProvider.controllers[controllerKey];
    },

    findOneTemplateByController: function(controllerKey) {
        log.debug('bricks.stateProvider.findOneTemplateByController',controllerKey);
        var state = _.find(bricks.stateProvider.states,function(state) {
            return state.controller == controllerKey;
        });
        log.debug('state',state);
        if (!state) {
            return null;
        }
        return state.template;
    },

    /**
     * @description This function presents a document.
     * The document can be presented on screen by adding to to the documents array
     * of the navigationDocument. The navigationDocument allows you to manipulate
     * the documents array with the pushDocument, popDocument, replaceDocument, and
     * removeDocument functions.
     *
     * You can replace an existing document in the navigationDocumetn array by calling
     * the replaceDocument function of navigationDocument. replaceDocument requires two
     * arguments: the new document, the old document.
     * @param {Document} xml - The XML document to push on the stack
     */
    defaultPresenter: function(xml) {
        log.debug("defaultPresenter",xml);

        if(this.loadingIndicatorVisible) {
            if (bricks.stateProvider.replaceDocument) {
                navigationDocument.popDocument();
                navigationDocument.popDocument();
                navigationDocument.pushDocument(xml);
            } else {
                navigationDocument.replaceDocument(xml, this.loadingIndicator);
            }
            this.loadingIndicatorVisible = false;
        } else {
            if (bricks.stateProvider.replaceDocument) {
                navigationDocument.popDocument();
            }
            navigationDocument.pushDocument(xml);
        }

        // FIXME: separate away
        var doc = xml;
        var searchField = doc.getElementsByTagName("searchField").item(0);
        log.debug("searchField",searchField);
        if (searchField) {
            var onTextChange = searchField.getAttribute("onTextChange");
            log.debug("onTextChange",onTextChange);
            if (onTextChange) {
                var keyboard = searchField.getFeature("Keyboard");
                keyboard.onTextChange = function() {
                    var searchText = keyboard.text;
                    log.debug('search text changed: ' + searchText);
                    var regexp = /([a-zA-Z]+)\.([a-zA-Z]+)/g;
                    var matches = regexp.exec(onTextChange);
                    if (matches) {
                        var controllerKey = matches[1];
                        var controllerFunction = matches[2];
                        var controller = bricks.stateProvider.findOneControllerByKey(controllerKey);
                        controller[controllerFunction](doc,searchText);
                    }
                }
            }
        }
    },

    /**
     * @description This function presents documents within a menu bar.
     * Each item in the menu bar can have a single document associated with it. To associate
     * document to you an item you use the MenuBarDocument feature.
     *
     * Menu bar elements have a MenuBarDocument feature that stores the document associated
     * with a menu bar element. In JavaScript you access the MenuBarDocument by invoking the
     * getFeature function on the menuBar element.
     *
     * A feature in TVMLKit is a construct for attaching extended capabilities to an
     * element. See the TVMLKit documentation for information on elements with available
     * features.
     *
     * @param {Document} xml - The XML document to associate with a menu bar element
     * @param {Element} ele - The currently selected item element
     */
    menuBarItemPresenter: function(xml, ele) {

        log.debug("menuBarItemPresenter");

        /*
         To get the menu bar's 'MenuBarDocument' feature, we move up the DOM Node tree using
         the parentNode property. This allows us to access the the menuBar element from the
         current item element.
         */
        var feature = ele.parentNode.getFeature("MenuBarDocument");

        if (feature) {
            /*
             To retrieve the document associated with the menu bar element, if one has been
             set, you call the getDocument function the MenuBarDocument feature. The function
             takes one argument, the item element.
             */
            var currentDoc = feature.getDocument(ele);
            /*
             To present a document within the menu bar, you need to associate it with the
             menu bar item. This is accomplished by call the setDocument function on MenuBarDocument
             feature. The function takes two argument, the document to be presented and item it
             should be associated with.

             In this implementation we are only associating a document once per menu bar item. You can
             associate a document each time the item is selected, or you can associate documents with
             all the menu bar items before the menu bar is presented. You will need to experimet here
             to balance document presentation times with updating the document items.
             */
            if (!currentDoc) {
                feature.setDocument(xml, ele);
            }

            var newDoc = feature.getDocument(ele);
            if (newDoc.getElementsByTagName("searchField").length>0) {
                var searchField = newDoc.getElementsByTagName("searchField").item(0);
                var keyboard = searchField.getFeature("Keyboard");

                keyboard.onTextChange = function() {
                    var searchText = keyboard.text;
                    log.debug('search text changed: ' + searchText);
                    injectSearchResults(newDoc, searchText);
                }
            }

        }
    },

    /**
     * @description This function creates a XML document from the contents of a template file.
     * In this example we are utilizing the DOMParser to transform the Index template from a
     * string representation into a DOMDocument.
     *
     * @param {String} resource - The contents of the template file
     * @return {Document} - XML Document
     */
    makeDocument: function(resource) {
        if (!bricks.stateProvider.parser) {
            bricks.stateProvider.parser = new DOMParser();
        }
        var doc = bricks.stateProvider.parser.parseFromString(resource, "application/xml");
        return doc;
    },

    /**
     * @description This function handles the select event and invokes the appropriate presentation method.
     * This is only one way to implent a system for presenting documents. You should determine
     * the best system for your application and data model.
     *
     * @param {Event} event - The select event
     */
    loadcnt: 0,
    handleEvent: function(event) {

        log.debug('handleEvent',event);

        var self = this,
            ele = event.target,
            sref = ele.getAttribute("ui-sref");

        /*
         Check if the selected element has a 'template' attribute. If it does then we begin
         the process to present the template to the user.
         */
        if (sref) {
            log.debug('sref found',sref);
            bricks.stateProvider.goSRefString(sref);
        } else {
            log.debug('no sref found');
        }
    },


    loadingIndicatorVisible: false,

    /**
     * @description This function handles the display of loading indicators.
     *
     * @param {String} presentation - The presentation function name
     */
    showLoadingIndicator: function() {

        log.debug('showing loading indicator');
        /*
         You can reuse documents that have previously been created. In this implementation
         we check to see if a loadingIndicator document has already been created. If it
         hasn't then we create one.
         */
        if (!bricks.stateProvider.loadingIndicator) {
            // FIXME: make this configurable or at least overridable
            var loadingTemplatePath = '/modules/app/loading.template.xml.js';
            bricks.resourceLoader.load(loadingTemplatePath, {},
                function(resource) {
                    log.debug('got loading template resource',resource);
                    bricks.stateProvider.loadingIndicator = bricks.stateProvider.makeDocument(resource);
                    if (!bricks.stateProvider.loadingIndicatorVisible /*&& presentation != "modalDialogPresenter" && presentation != "menuBarItemPresenter"*/) {
                        log.debug('pushing loading indicator');
                        navigationDocument.pushDocument(bricks.stateProvider.loadingIndicator);
                        bricks.stateProvider.loadingIndicatorVisible = true;
                    }
                }
            );
        } else {
            if (!bricks.stateProvider.loadingIndicatorVisible /*&& presentation != "modalDialogPresenter" && presentation != "menuBarItemPresenter"*/) {
                log.debug('pushing loading indicator');
                navigationDocument.pushDocument(bricks.stateProvider.loadingIndicator);
                bricks.stateProvider.loadingIndicatorVisible = true;
            }
        }
    },

    /**
     * @description This function handles the removal of loading indicators.
     * If a loading indicator is visible, it removes it from the stack and sets the loadingIndicatorVisible attribute to false.
     */
    hideLoadingIndicator: function() {

        log.debug('hiding loading indicator');

        if (bricks.stateProvider.loadingIndicatorVisible) {
            navigationDocument.removeDocument(bricks.stateProvider.loadingIndicator);
            bricks.stateProvider.loadingIndicatorVisible = false;
        }
    },

    init: function() {
        log.debug('initializing bricks.stateProvider');
        bricks.stateProvider.router.getHandler = function(controllerKey) {
            log.debug('"bricks.stateProvider.getHandler',controllerKey);
            var controller = bricks.stateProvider.findOneControllerByKey(controllerKey);
            log.debug('controller',controller);
            return {
                beforeModel: function(context) {
                    log.debug('beforeModel',controllerKey,context);
                    bricks.eventProvider.broadcast('stateProvider.beforeModel',{'key': controllerKey, 'context': context});
                    if (typeof controller.resolve !== 'undefined') {
                        bricks.stateProvider.showLoadingIndicator();
                    }
                },
                model: function(stateParams) {
                    log.debug('model',stateParams);
                    bricks.eventProvider.broadcast('stateProvider.model',{'key': controllerKey, 'stateParams': stateParams});
                    if (typeof controller.resolve !== 'undefined') {
                        log.debug('calling controller.resolve',stateParams);
                        return controller.resolve(stateParams)
                    }
                    return {};
                },
                afterModel: function(context) {
                    log.debug('afterModel',controllerKey,context);
                    bricks.eventProvider.broadcast('stateProvider.afterModel',{'key': controllerKey, 'context': context});
                },
                enter: function(context) {
                    log.debug('enter',controllerKey,context);
                    bricks.eventProvider.broadcast('stateProvider.enter',{'key': controllerKey, 'context': context});
                },
                setup: function(model) {
                    log.debug('setup',model);
                    bricks.eventProvider.broadcast('stateProvider.setup',{'key': controllerKey, 'model': model});
                    var context = model;
                    if (typeof controller.action !== 'undefined') {
                        log.debug('calling controller.action',model)
                        context = controller.action(model);
                    }
                    context.bricks = bricks;
                    log.debug('templateContext',context);
                    var templatePath = bricks.stateProvider.findOneTemplateByController(controllerKey);
                    if (templatePath) {
                        log.debug('loading template from path',templatePath);
                        bricks.resourceLoader.load(templatePath, context,
                            function(resource) {
                                if (resource) {
                                    /*
                                     The XML template must be turned into a DOMDocument in order to be
                                     presented to the user. See the implementation of makeDocument below.
                                     */
                                    var doc = bricks.stateProvider.makeDocument(resource);

                                    /*
                                     Event listeners are used to handle and process user actions or events. Listeners
                                     can be added to the document or to each element. Events are bubbled up through the
                                     DOM hierarchy and can be handled or cancelled at at any point.

                                     Listeners can be added before or after the document has been presented.

                                     For a complete list of available events, see the TVMLKit DOM Documentation.
                                     */
                                    doc.addEventListener("select", bricks.stateProvider.handleEvent.bind(bricks.stateProvider));

                                    bricks.stateProvider.defaultPresenter(doc);
                                    bricks.stateProvider.hideLoadingIndicator();
                                }
                            }
                        );
                    } else {
                        log.debug('no template');
                        bricks.stateProvider.hideLoadingIndicator();
                    }

                },
                exit: function(context) {
                    log.debug('exit',context);
                    bricks.eventProvider.broadcast('stateProvider.exit',{'key': controllerKey, 'context': context});
                },
                serialize: function(params) {
                    log.debug('serialize',params);
                    return params;
                }
            }
        }
    }
};

bricks.stateProvider.init();
