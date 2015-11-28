
/**
 * This convenience funnction returns an alert template, which can be used to present errors to the user.
 */
var createAlert = function(title, description) {

    var template = _.template(`<?xml version="1.0" encoding="UTF-8" ?>
        <document>
            <alertTemplate>
                <title><%= title %></title>
                <description><%= description %></description>
            </alertTemplate>
        </document>`
    );

    var parser = new DOMParser();
    return parser.parseFromString(template(
            {
                title: title,
                description: description
            }),
        "application/xml"
    );
};