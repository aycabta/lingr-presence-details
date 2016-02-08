// ==UserScript==
// @name       Lingr presence details
// @namespace  http://aycabta.github.io/
// @version    0.0.1
// @description  The Benry Script
// @include    http://lingr.com/
// @copyright  2015+, Code Ass
// ==/UserScript==

(function() {
    RosterView.prototype.oldLingrPresenceDetailsChangePresence = RosterView.prototype.changePresence;
    RosterView.prototype.changePresence = function(event) {
        var timestamp = new Date(event.presence.timestamp);
        var dateString = 
            timestamp.getFullYear().toString() + '-' +
            ('0' + (timestamp.getMonth() + 1)).slice(-2) + '-' +
            ('0' + timestamp.getDate()).slice(-2) + ' ' +
            ('0' + timestamp.getHours()).slice(-2) + ':' +
            ('0' + timestamp.getMinutes()).slice(-2) + ':' +
            ('0' + timestamp.getSeconds()).slice(-2);
        event.text = dateString + ': <img src="' + event.presence.icon_url + '" alt="' + event.presence.nickname + '" width="16" height="16" />' + event.text;
        return RosterView.prototype.oldLingrPresenceDetailsChangePresence.call(this, event);
    }
    Message.prototype.oldLingrPresenceDetailsInitialize = Message.prototype.initialize;
    Message.prototype.initialize = function(json) {
        var result = Message.prototype.oldLingrPresenceDetailsInitialize.call(this, json);
        if (json.type === 'system') {
            result.attributes.decorated_text = result.attributes.text;
        }
        return result;
    };
})();
