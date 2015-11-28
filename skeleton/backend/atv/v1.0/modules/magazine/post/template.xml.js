'use strict';

var Template = function(context, callback) {

    console.log('magazine.post.template',context);

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
            <descriptiveAlertTemplate theme="dark">
                <title><%= post.title %></title>
                <img src="<%= post.featured_image.url %>"  width="1800" height="400"/>
                <description><%= post.content %></description>
            </descriptiveAlertTemplate>
        </document>
	`);

    var tvml = template(context);

    callback(null, tvml);

};
