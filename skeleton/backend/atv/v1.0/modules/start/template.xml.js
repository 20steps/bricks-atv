'use strict';

// the context is the return value of Controller.prepare
var Template = function(context, callback) {
	log.debug('start.template',context);

	// define and compile the template
	var template = _.template(`<?xml version="1.0" encoding="UTF-8" ?>
        <document>
            <head>
                <style>
                .whiteText {
                    color: rgb(255, 255, 255);
                }
                </style>
            </head>
            <stackTemplate theme="dark">
                <background>
                    <img style="tv-tint-color:rgba(1, 22, 43, 0.8);" src="<%= bricks.config.options.BASEURL %>/modules/app/images/background_image.png"/>
                </background>
                <banner>
                    <title><%= window.i18n.t('magazine.title') %></title>
                </banner>
                <collectionList>
                    <% _.each(magazine.categories, function(category){ %>
                        <shelf>
                            <header>
                                <title class="whiteText"><%= category.name %></title>
                            </header>
                            <section>
                                <% _.each(category.posts, function(post){ %>
                                    <lockup ui-sref='magazine_post({"slug": "<%= post.slug %>"})'>
                                        <% if (post.featured_image.url) { %>
                                            <img src="<%= post.featured_image.url %>" width="540" height="275" />
                                        <% } else { %>
                                            <img src="http://edition-steinbach.de/wp-content/uploads/2014/09/blablabla.jpg" width="308" height="174" />
                                        <% } %>
                                        <title class="whiteText"><%= _.escape(post.title) %></title>
                                    </lockup>
                                <% }) %>
                            </section>
                        </shelf>
                    <% }) %>
                </collectionList>
            </stackTemplate>
        </document>
	`);

	// execute the template given the context
	var tvml = template(context);

	// render the TVML
	callback(null,tvml);

};
