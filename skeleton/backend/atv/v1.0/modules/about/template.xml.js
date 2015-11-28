'use strict';

var Template = function(context, callback) {

    log.debug('about.template',context);

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
            <descriptiveAlertTemplate theme="dark">
                <background>
                    <img style="tv-tint-color:rgba(1, 22, 43, 0.8);" src="<%= bricks.config.options.BASEURL %>/modules/app/images/background_image.png"/>
                </background>
                <title class="whiteText">PrimeEstate</title>
                <img />
                <description class="grayText">built by 20steps for Propertycompany</description>
            </descriptiveAlertTemplate>
        </document>`
    );

    var tvml = template(context);

	callback(null,tvml);
};
