'use strict';

var Template = function (context, callback) {

    console.log('settings.template',context);

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
            <listTemplate theme="dark">
                <background>
                    <img style="tv-tint-color:rgba(1, 22, 43, 0.8);" src="<%= bricks.config.options.BASEURL %>/modules/app/images/background_image.png"/>
                </background>
                <banner>
                    <title><%= window.i18n.t('settings.title') %></title>
                </banner>
                <list>
                    <header>header</header>
                    <section>
                        <listItemLockup>
                            <title><%= window.i18n.t('settings.entries.login') %></title>
                            <relatedContent>
                                <lockup>
                                    <img src="<%= bricks.config.options.BASEURL %>/modules/settings/images/login-icon.png" width="850" height="850" />
                                </lockup>
                            </relatedContent>
                        </listItemLockup>
                        <listItemLockup>
                            <title><%= window.i18n.t('settings.entries.autoplay') %></title>
                            <relatedContent>
                                <lockup>
                                    <img src="<%= bricks.config.options.BASEURL %>/modules/settings/images/autoplay-icon.png" width="850" height="850" />
                                </lockup>
                            </relatedContent>
                        </listItemLockup>
                        <listItemLockup>
                            <title><%= window.i18n.t('settings.entries.help') %></title>
                            <relatedContent>
                                <lockup>
                                    <img src="<%= bricks.config.options.BASEURL %>/modules/settings/images/help-icon.png" width="850" height="850" />
                                </lockup>
                            </relatedContent>
                        </listItemLockup>
                        <listItemLockup>
                            <title><%= window.i18n.t('settings.entries.imprint') %></title>
                            <relatedContent>
                                <lockup>
                                    <img src="<%= bricks.config.options.BASEURL %>/modules/settings/images/imprint-icon.png" width="850" height="850" />
                                </lockup>
                            </relatedContent>
                        </listItemLockup>
                        <listItemLockup ui-sref="settings_reload">
                            <title><%= window.i18n.t('settings.entries.reload') %></title>
                            <relatedContent>
                                <lockup>
                                    <img src="<%= bricks.config.options.BASEURL %>/modules/settings/images/reload-icon.png" width="850" height="850" />
                                </lockup>
                            </relatedContent>
                        </listItemLockup>
                    </section>
                </list>
            </listTemplate>
        </document>
	`);


    var tvml = template(context);

    callback(null, tvml);

};
