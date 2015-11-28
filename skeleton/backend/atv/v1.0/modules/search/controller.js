'use strict';

bricks.module('brickstv.search').controller('BricksTVSearchController', {

    // the model function generates or fetches the model
    // - parameters of ui-sref are handed over via the stateParams argument
    // - the function might either return a plain old object or a promise (hint: bricks.apiLoader.call(url) returns a promise)
    // - in case it returns a promise a loading indicator is automatically rendered while resolving or rejecting the promise
    resolve: function(stateParams) {
        log.info('BricksTVSearchController.model',stateParams);
        return bricks.apiLoader.call('/inspire.json');

    },

    // model could be generated / fetched successfully prepare is called with the model as it's sole argument
    // - the pepare function can modify, select from or augment the model
    // - the return value of the function is the context for template invocation
    action: function(model) {
        log.info('BricksTVSearchController.action',model);
        return model.data;
    },

    updateHits: function(doc,text) {
        log.debug('updating hits',text);

        bricks.apiLoader.call('/search/'+encodeURIComponent(text)+'.json').then(function(response) {
            log.debug(response);
            //Create parser and new input element
            var domImplementation = doc.implementation;
            var lsParser = domImplementation.createLSParser(1, null);
            var lsInput = domImplementation.createLSInput();

            var noResultsCompiledTemplate = _.template(`
                <list>
                    <section>
                        <header>
                            <title><%= window.i18n.t('search.noresults.title') %></title>
                        </header>
                    </section>
                </list>`
            );
            //set default template fragment to display no results
            lsInput.stringData = noResultsCompiledTemplate({});

            if (response.data.search.count>0) {
                var resultsCompiledTemplate = _.template(`
                    <shelf>
                        <header>
                            <title><%= window.i18n.t('search.results.title') %></title>
                        </header>
                        <section id="Results">
                            <% _.each(properties, function(property) { %>
                                <lockup>
                                    <% if (property.media.teaser.pictures.primary.url) { %>
                                        <img src="<%= property.media.teaser.pictures.primary.url %>" width="540" height="275" />
                                    <% } else { %>
                                        <img src="http://edition-steinbach.de/wp-content/uploads/2014/09/blablabla.jpg" width="540" height="275" />
                                    <% } %>
                                    <title><%= property.title %></title>
                                </lockup>
                            <% }) %>
                        </section>
                    </shelf>`
                );
                lsInput.stringData = resultsCompiledTemplate(response.data.search);
            }

            log.debug('to be injected',lsInput.stringData);

            //add the new input element to the document by providing the newly created input, the context,
            //and the operator integer flag (1 to append as child, 2 to overwrite existing children)
            lsParser.parseWithContext(lsInput, doc.getElementsByTagName("collectionList").item(0), 2);
        },function(error) {
            log.error(error);
        });
    }

});
