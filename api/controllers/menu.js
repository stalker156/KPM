/**
 * Created by Alibek on 16.03.2016.
 */

var menuDefinition = require('../dataLayer/menuDefinition');
var _ = require('underscore');

module.exports = [
    {
        name: 'getcurrentmenu',
        callback: function (payload, done) {
            var roles = [];
            if (payload.user && payload.user.roles)
                roles = payload.user.roles;
            var res = { user: payload.user, menu: [] };

            var tempDefs = JSON.parse(JSON.stringify(menuDefinition.definition));

            _.each(tempDefs, function (item) {
                var menuItem = getMenuItem(item, roles);
                if (menuItem != null)
                    res.menu.push(menuItem);
            });
            return done(null, res);
        },
        allowAnonymous:false
    }];


function getMenuItem(menuItem, roles)
{
    if (menuItem.roles == null || checkMenuItem(menuItem, roles))
    {
        var childs = menuItem.childs;
        menuItem.childs = [];
        _.each(childs, function (child) {
            var ret = getMenuItem(child, roles);
            if (ret != null)
                menuItem.childs.push(child);
        });
        return menuItem;
    }
    return null;
}

function checkMenuItem(item, roles)
{
    if (item.roles == null)
        return true;
    var contains = false;
    _.each(item.roles, function (itemRole) {
        _.each(roles, function (role) {
            if (itemRole === role) {
                contains = true;
                return;
            }
        });
    });
    return contains;
}