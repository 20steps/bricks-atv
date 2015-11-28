'use strict';

var Template = function(context, callback) {

    var template = _.template(`<?xml version="1.0" encoding="UTF-8" ?>
        <document>
            <head>
                <style>
                    .whiteText {
                        color: rgb(255, 255, 255);
                    }
                    .blackText {
                        color: rgb(97, 97, 97);
                    }
                    .grayText {
                        color: rgb(147, 147, 147);
                    }
                </style>
            </head>
            <loadingTemplate>
                <activityIndicator>
                  <text class="blackText"><%= window.i18n.t('app.loading.message') %></text>
                </activityIndicator>
            </loadingTemplate>
        </document>`
    );

    var tvml = template(context);

    callback(null, tvml);
}
