'use strict';

// the context is the return value of Controller.prepare
var Template = function(context, callback) {

    // compile the template
    log.debug('menu.template',context);

    // compile the template
    // In PHPStorm > 9.5 activate ECMA6 support to show clean
    // in Preferences -> Languages & Frameworks -> JavaScript > JavaScript Version -> ECMA6
    var template = _.template(`<?xml version="1.0" encoding="UTF-8" ?>
        <document>
            <menuBarTemplate>
                <menuBar>
                    <menuItem ui-sref='start({"id": "1234"})'>
                        <title><%= window.i18n.t('start.menu.title') %></title>
                    </menuItem>
                    <menuItem ui-sref="search">
                        <title><%= window.i18n.t('search.menu.title') %></title>
                    </menuItem>
                    <menuItem ui-sref="magazine">
                        <title><%= window.i18n.t('magazine.menu.title') %></title>
                    </menuItem>
                    <menuItem ui-sref="settings">
                        <title><%= window.i18n.t('settings.menu.title') %></title>
                    </menuItem>
                </menuBar>
            </menuBarTemplate>
        </document>`
    );

    // execute the template given the context
    var tvml = template(context);

    // render the TVML
    callback(null,tvml);
}