// ==UserScript==
// @name         Discord Authorization Page Helper
// @namespace    https://github.com/DevYukine
// @version      0.2
// @description  Makes the authorization page nicer c:
// @author       DevYukine
// @match        *://discord.com/oauth2/authorize*
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @require      https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js
// @updateURL    https://raw.githubusercontent.com/DevYukine/discord-authorization-helper/main/discord-authorization-helper.user.js
// @downloadURL  https://raw.githubusercontent.com/DevYukine/discord-authorization-helper/main/discord-authorization-helper.user.js
// ==/UserScript==

(function () {
	'use strict';

	const config = new MonkeyConfig({
		title: 'Discord Authorization Page',
		menuCommand: true,
		params: {
			removeGuildsJoinScope: {
				type: 'checkbox',
				default: true
			},
			removeEmailScope: {
				type: 'checkbox',
				default: false
			},
			skipPromptIfPossible: {
				type: 'checkbox',
				default: false
			}
		}
	});

	const urlParams = new URLSearchParams(location.search);

	if (RegExp('discord.com/oauth2/authorize').test(document.referrer)) {
		console.log('previos page was authorize, exiting');
		return;
	}

	let href = location.href;

	const scopes = urlParams.get("scope").split(' ');

	if (config.get('removeGuildsJoinScope') && scopes.includes('guilds.join')) {
		console.log('found guilds.join scope, removing it');
		href = href.replace(/guilds.join/, '');
	}

	if (config.get('removeEmailScope') && scopes.includes('email')) {
		console.log('found email scope, removing it');
		href = href.replace(/email/, '');
	}

	console.log('moving to new domain');
	location.assign(`${href}${config.get('skipPromptIfPossible') ? '&prompt=none' : ''}`);
})();