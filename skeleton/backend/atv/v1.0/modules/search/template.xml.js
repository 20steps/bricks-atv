'use strict';

var Template = function(context, callback) {

    var template = _.template(`<?xml version="1.0" encoding="UTF-8" ?>
        <document>
            <head>
                <style>
                    .blackText {
                        color: rgb(97, 97, 97);
                    }
                    .grayText {
                        color: rgb(147, 147, 147);
                    }
                    .whiteText {
                        color: rgb(255, 255, 255);
                    }
                </style>
            </head>
            <searchTemplate theme="dark">
                <background>
                    <img style="tv-tint-color:rgba(1, 22, 43, 0.8);" src="<%= bricks.config.options.BASEURL %>/modules/app/images/background_image.png"/>
                </background>
                <searchField onTextChange="BricksTVSearchController.updateHits"><%= window.i18n.t('search.form.q.placeholder') %></searchField>
                <collectionList>
                    <shelf>
                        <header>
                            <title class="blackText"><%= window.i18n.t('search.recommended_properties.title') %></title>
                        </header>
                        <section>
                            <% _.each(inspire.properties, function(property){ %>
                                <lockup ui-sref='property({"slug": "<%= property.slug %>"})'>
                                    <img src="<%= property.media.teaser.pictures.primary.url %>"  width="540" height="275"  />
                                    <title class="whiteText"><%= property.title %></title>
                                </lockup>
                            <% }) %>
                        </section>
                    </shelf>
                </collectionList>
            </searchTemplate>
        </document>`
    );

    var tvml = template(context);

    callback(null,tvml);

};

