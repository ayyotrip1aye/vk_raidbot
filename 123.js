﻿const {
	VK,
	updates,
	Keyboard
} = require('vk-io');

let bot = new Flooder('d72e944e896c4768da54c19ee74b83e52f5a54e4bd49a0ac8320b8f5e3d7700b5c6f5570d2d3a0fde9b84', 188615215);
function Flooder (access_token, group_id)
{
	let vk = new VK(),
		request = require('request'),
		chats = require('./data/chats.json'),
		users = require('./data/users.json'),
		whitelist = require('./data/whitelist.json'),
		utils = require('./meta/utils.js');

	vk.setOptions({
		token: access_token,
		apiMode: 'parallel_selected',
		pollingGroupId: group_id
	});

	vk.updates.startPolling();

	vk.updates.on('message', async (message) => {
		if(message.isUser)
		{
			if(message.isOutbox) return;
			if(/^(кто вы такие)/i.test(message.text))
			{
				return message.send({
					message: 'Вкратце - бот для краша конференций/бесед.\nХотите пошутить над своим другом/классной беседой? Добавьте бота в чат, и вы сами увидите, что он умеет!\n\nВнимание: Бот создан в ознакомительных целях! Автор не несет ответственность за последствия от ваших действий'
				})
			}
			if(/^(?:хочу добавить бота)/i.test(message.text))
			{
				return message.send({
					message: 'Вы можете добавить бота в беседу.\n\nИнструкция: \n1. Зайдите в нашу группу\n2. Найдите кнопку <<Добавить в беседу>> или <<Пригласить в беседу>> под кнопкой ниже <<Подписаться>>\n3. Выберите беседу\n4. Дайте доступ к уведомлениям либо напишите @public180799532 старт',
					keyboard: Keyboard.keyboard([
						Keyboard.textButton({
							label: 'Понял!',
							color: Keyboard.POSITIVE_COLOR
						}),
						Keyboard.textButton({
							label: 'Я не понял!',
							color: Keyboard.NEGATIVE_COLOR
						}),
						Keyboard.textButton({
							label: 'Вернуться назад'
						})
					])
				})
			}
			if(/(vk\.(com|me)\/join\/[a-z0-9_]+)/i.test(message.text))
			{
				let args = message.text.match(/(vk\.(com|me)\/join\/[a-z0-9_]+)/i);
				args[1] = args[1].replace('https', '')
				args[1] = args[1].replace('http', '')
				args[1] = args[1].replace(':', '')
				args[1] = args[1].replace('//', '')
				await message.joinChatByInviteLink('https://' + args[1])
				return message.send('Запрос отправлен')
			}
			if(/(репорт)/i.test(message.text))
			{
				message.reply('Постараемся разобраться!', {
					keyboard: Keyboard.keyboard([
						Keyboard.textButton({
							label: 'Кто вы такие?'
						}),
						Keyboard.textButton({
							label: 'Хочу добавить бота в беседу!'
						})
					])
				})
				return message.send({
					user_id: 440077933,
					message: 'Вам был отправлен репорт от *id' + message.senderId + ' (Пользователя)\n\nТекст: ' + message.text
				})
			}
			if(/(не работает)/i.test(message.text))
			{
				return message.send({
					message: 'Бот может не работать взависимости от нагрузки\nВК накладывает флуд контроль на бота на некоторое время'
				})
			}
			if(/(^понял|не хочу|назад)/i.test(message.text))
			{
				return message.send({
					message: 'Ок.',
					keyboard: Keyboard.keyboard([
						Keyboard.textButton({
							label: 'Кто вы такие?'
						}),
						Keyboard.textButton({
							label: 'Хочу добавить бота в беседу!'
						})
					])
				})
			}
			if(/(не понял)/i.test(message.text))
			{
				return message.send('Подробная инструкция в нашем посте:', {
					attachment: 'wall-170300337_3'
				})
			}
			if(/(не хочу|)/i.test(message.text))
			{
				return message.send({
					message: `У меня не нашлось на это ответа :(\n\nНажмите на нужную кнопку`,
					keyboard: Keyboard.keyboard([
						Keyboard.textButton({
							label: 'Кто вы такие?'
						}),
						Keyboard.textButton({
							label: 'Хочу добавить бота в беседу!'
						})
					])
				})
			}
		}
		if(message.isChat)
		{
			if(/(айди|cid)/i.test(message.text))
			{
				return message.reply(`ID беседы ` + message.chatId)
			}
			if(whitelist.includes(message.chatId)) return;
			if(chats.includes(message.chatId))
			{
				chats.push(message.chatId)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				await message.send({
					chat_id: message.chatId,
					message: '👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂😀😃😄😁😆😅😂🤣☺😊😇🙂🙃😉😌😍😘😗😙😚😋😜😝😛🤑🤗🤓😎🤡🤠😏😒😞😔😟😕🙁☹😣😖😫😩😤😠😡😶😐😑😯😦😧😮😲😵😳😱😨😰😢😥🤤😭😓😪😴🙄🤔🤥😬🤐🤢🤧😷🤒🤕😈👿👹👺💩👻💀☠👽👾🤖🎃😺😸😹😻😼😽🙀😿😾👐🙌👏🙏🤝👍👎👊✊🤛🤜🤞✌🤘👌👈👉👆👇☝✋🖐🖖👋🤙💪🖕✍🤳💅🖖💄💋👄👅👂👃👤👣👁👀🗣👥👶👦👧👨👩👱‍♀️👱👴👵👲👳‍♀️👳👮‍♀️👮👷‍♀️👷💂‍♀️💂🕵‍♀️🕵👩‍⚕️👨‍⚕️👩‍🌾️👨‍🌾️👩‍🍳️👨‍🍳️👩‍🎓️👨‍🎓️👩‍🎤️👨‍🎤️👩‍🏫️👨‍🏫️👩‍🏭️👨‍🏭️👩‍💻️👨‍💻️👩‍💼️👨‍💼️👩‍🔧️👨‍🔧️👩‍🔬️👨‍🔬️👩‍🎨️👨‍🎨️👩‍🚒️👨‍🚒️👩‍✈️👨‍✈️👩‍🚀️👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂',
					attachment: utils.pick(['photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367'])
				})
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266) 
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				await message.send({
					chat_id: message.chatId,
					message: '👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂😀😃😄😁😆😅😂🤣☺😊😇🙂🙃😉😌😍😘😗😙😚😋😜😝😛🤑🤗🤓😎🤡🤠😏😒😞😔😟😕🙁☹😣😖😫😩😤😠😡😶😐😑😯😦😧😮😲😵😳😱😨😰😢😥🤤😭😓😪😴🙄🤔🤥😬🤐🤢🤧😷🤒🤕😈👿👹👺💩👻💀☠👽👾🤖🎃😺😸😹😻😼😽🙀😿😾👐🙌👏🙏🤝👍👎👊✊🤛🤜🤞✌🤘👌👈👉👆👇☝✋🖐🖖👋🤙💪🖕✍🤳💅🖖💄💋👄👅👂👃👤👣👁👀🗣👥👶👦👧👨👩👱‍♀️👱👴👵👲👳‍♀️👳👮‍♀️👮👷‍♀️👷💂‍♀️💂🕵‍♀️🕵👩‍⚕️👨‍⚕️👩‍🌾️👨‍🌾️👩‍🍳️👨‍🍳️👩‍🎓️👨‍🎓️👩‍🎤️👨‍🎤️👩‍🏫️👨‍🏫️👩‍🏭️👨‍🏭️👩‍💻️👨‍💻️👩‍💼️👨‍💼️👩‍🔧️👨‍🔧️👩‍🔬️👨‍🔬️👩‍🎨️👨‍🎨️👩‍🚒️👨‍🚒️👩‍✈️👨‍✈️👩‍🚀️👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂',
					attachment: utils.pick(['photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367'])
				})
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266) 
				await message.send({
					chat_id: message.chatId,
					message: '👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂😀😃😄😁😆😅😂🤣☺😊😇🙂🙃😉😌😍😘😗😙😚😋😜😝😛🤑🤗🤓😎🤡🤠😏😒😞😔😟😕🙁☹😣😖😫😩😤😠😡😶😐😑😯😦😧😮😲😵😳😱😨😰😢😥🤤😭😓😪😴🙄🤔🤥😬🤐🤢🤧😷🤒🤕😈👿👹👺💩👻💀☠👽👾🤖🎃😺😸😹😻😼😽🙀😿😾👐🙌👏🙏🤝👍👎👊✊🤛🤜🤞✌🤘👌👈👉👆👇☝✋🖐🖖👋🤙💪🖕✍🤳💅🖖💄💋👄👅👂👃👤👣👁👀🗣👥👶👦👧👨👩👱‍♀️👱👴👵👲👳‍♀️👳👮‍♀️👮👷‍♀️👷💂‍♀️💂🕵‍♀️🕵👩‍⚕️👨‍⚕️👩‍🌾️👨‍🌾️👩‍🍳️👨‍🍳️👩‍🎓️👨‍🎓️👩‍🎤️👨‍🎤️👩‍🏫️👨‍🏫️👩‍🏭️👨‍🏭️👩‍💻️👨‍💻️👩‍💼️👨‍💼️👩‍🔧️👨‍🔧️👩‍🔬️👨‍🔬️👩‍🎨️👨‍🎨️👩‍🚒️👨‍🚒️👩‍✈️👨‍✈️👩‍🚀️👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂',
					attachment: utils.pick(['photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367'])
				})
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266) 
				await message.send({
					chat_id: message.chatId,
					message: '👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂😀😃😄😁😆😅😂🤣☺😊😇🙂🙃😉😌😍😘😗😙😚😋😜😝😛🤑🤗🤓😎🤡🤠😏😒😞😔😟😕🙁☹😣😖😫😩😤😠😡😶😐😑😯😦😧😮😲😵😳😱😨😰😢😥🤤😭😓😪😴🙄🤔🤥😬🤐🤢🤧😷🤒🤕😈👿👹👺💩👻💀☠👽👾🤖🎃😺😸😹😻😼😽🙀😿😾👐🙌👏🙏🤝👍👎👊✊🤛🤜🤞✌🤘👌👈👉👆👇☝✋🖐🖖👋🤙💪🖕✍🤳💅🖖💄💋👄👅👂👃👤👣👁👀🗣👥👶👦👧👨👩👱‍♀️👱👴👵👲👳‍♀️👳👮‍♀️👮👷‍♀️👷💂‍♀️💂🕵‍♀️🕵👩‍⚕️👨‍⚕️👩‍🌾️👨‍🌾️👩‍🍳️👨‍🍳️👩‍🎓️👨‍🎓️👩‍🎤️👨‍🎤️👩‍🏫️👨‍🏫️👩‍🏭️👨‍🏭️👩‍💻️👨‍💻️👩‍💼️👨‍💼️👩‍🔧️👨‍🔧️👩‍🔬️👨‍🔬️👩‍🎨️👨‍🎨️👩‍🚒️👨‍🚒️👩‍✈️👨‍✈️👩‍🚀️👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂',
					attachment: utils.pick(['photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367'])
				})
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266) 				
				await message.send({
					chat_id: message.chatId,
					message: '👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂😀😃😄😁😆😅😂🤣☺😊😇🙂🙃😉😌😍😘😗😙😚😋😜😝😛🤑🤗🤓😎🤡🤠😏😒😞😔😟😕🙁☹😣😖😫😩😤😠😡😶😐😑😯😦😧😮😲😵😳😱😨😰😢😥🤤😭😓😪😴🙄🤔🤥😬🤐🤢🤧😷🤒🤕😈👿👹👺💩👻💀☠👽👾🤖🎃😺😸😹😻😼😽🙀😿😾👐🙌👏🙏🤝👍👎👊✊🤛🤜🤞✌🤘👌👈👉👆👇☝✋🖐🖖👋🤙💪🖕✍🤳💅🖖💄💋👄👅👂👃👤👣👁👀🗣👥👶👦👧👨👩👱‍♀️👱👴👵👲👳‍♀️👳👮‍♀️👮👷‍♀️👷💂‍♀️💂🕵‍♀️🕵👩‍⚕️👨‍⚕️👩‍🌾️👨‍🌾️👩‍🍳️👨‍🍳️👩‍🎓️👨‍🎓️👩‍🎤️👨‍🎤️👩‍🏫️👨‍🏫️👩‍🏭️👨‍🏭️👩‍💻️👨‍💻️👩‍💼️👨‍💼️👩‍🔧️👨‍🔧️👩‍🔬️👨‍🔬️👩‍🎨️👨‍🎨️👩‍🚒️👨‍🚒️👩‍✈️👨‍✈️👩‍🚀️👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂',
					attachment: utils.pick(['photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367'])
				})
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266) 
				await message.send({
					chat_id: message.chatId,
					message: kasha,
					attachment: utils.pick(['photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367'])
				})
			}
			if(message.isOutbox) return;
			const a = setInterval(() => {
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266)
				message.sendSticker(14266) 
				message.send({
					message: utils.pick([
						'👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂😀😃😄😁😆😅😂🤣☺😊😇🙂🙃😉😌😍😘😗😙😚😋😜😝😛🤑🤗🤓😎🤡🤠😏😒😞😔😟😕🙁☹😣😖😫😩😤😠😡😶😐😑😯😦😧😮😲😵😳😱😨😰😢😥🤤😭😓😪😴🙄🤔🤥😬🤐🤢🤧😷🤒🤕😈👿👹👺💩👻💀☠👽👾🤖🎃😺😸😹😻😼😽🙀😿😾👐🙌👏🙏🤝👍👎👊✊🤛🤜🤞✌🤘👌👈👉👆👇☝✋🖐🖖👋🤙💪🖕✍🤳💅🖖💄💋👄👅👂👃👤👣👁👀🗣👥👶👦👧👨👩👱‍♀️👱👴👵👲👳‍♀️👳👮‍♀️👮👷‍♀️👷💂‍♀️💂🕵‍♀️🕵👩‍⚕️👨‍⚕️👩‍🌾️👨‍🌾️👩‍🍳️👨‍🍳️👩‍🎓️👨‍🎓️👩‍🎤️👨‍🎤️👩‍🏫️👨‍🏫️👩‍🏭️👨‍🏭️👩‍💻️👨‍💻️👩‍💼️👨‍💼️👩‍🔧️👨‍🔧️👩‍🔬️👨‍🔬️👩‍🎨️👨‍🎨️👩‍🚒️👨‍🚒️👩‍✈️👨‍✈️👩‍🚀️👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂',
						kasha
					]),
					attachment: utils.pick(['photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367'])
				})
			}, 1000)
			setTimeout(() => {
				clearInterval(a)
			}, 60000)
			let presents = utils.pick(['ААААААААААААААААА ПИДОРАС ЗА ЧТО', 'Я ЛОХ НАХУЙ', 'умри', 'обоссысь', 'ты чтоо хочешь меня кикнуть? :3 ', 'у меня простатит', 'ya sosu', 'Suka', 'GG ', 'кто', 'Денис Добровольский LOX VIP', 'ИЛИ', 'кто', 'кто', 'обоссысь', 'умри'])
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266) 
			return message.send({
				message: utils.pick([
					'👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂😀😃😄😁😆😅😂🤣☺😊😇🙂🙃😉😌😍😘😗😙😚😋😜😝😛🤑🤗🤓😎🤡🤠😏😒😞😔😟😕🙁☹😣😖😫😩😤😠😡😶😐😑😯😦😧😮😲😵😳😱😨😰😢😥🤤😭😓😪😴🙄🤔🤥😬🤐🤢🤧😷🤒🤕😈👿👹👺💩👻💀☠👽👾🤖🎃😺😸😹😻😼😽🙀😿😾👐🙌👏🙏🤝👍👎👊✊🤛🤜🤞✌🤘👌👈👉👆👇☝✋🖐🖖👋🤙💪🖕✍🤳💅🖖💄💋👄👅👂👃👤👣👁👀🗣👥👶👦👧👨👩👱‍♀️👱👴👵👲👳‍♀️👳👮‍♀️👮👷‍♀️👷💂‍♀️💂🕵‍♀️🕵👩‍⚕️👨‍⚕️👩‍🌾️👨‍🌾️👩‍🍳️👨‍🍳️👩‍🎓️👨‍🎓️👩‍🎤️👨‍🎤️👩‍🏫️👨‍🏫️👩‍🏭️👨‍🏭️👩‍💻️👨‍💻️👩‍💼️👨‍💼️👩‍🔧️👨‍🔧️👩‍🔬️👨‍🔬️👩‍🎨️👨‍🎨️👩‍🚒️👨‍🚒️👩‍✈️👨‍✈️👩‍🚀️👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂',
					kasha
				]),
				keyboard: Keyboard.keyboard([
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					})
				]),
				attachment: utils.pick(['photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367'])
			})
		}
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266) 
		message.send({
			chat_id: message.chatId,
			message: '👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂😀😃😄😁😆😅😂🤣☺😊😇🙂🙃😉😌😍😘😗😙😚😋😜😝😛🤑🤗🤓😎🤡🤠😏😒😞😔😟😕🙁☹😣😖😫😩😤😠😡😶😐😑😯😦😧😮😲😵😳😱😨😰😢😥🤤😭😓😪😴🙄🤔🤥😬🤐🤢🤧😷🤒🤕😈👿👹👺💩👻💀☠👽👾🤖🎃😺😸😹😻😼😽🙀😿😾👐🙌👏🙏🤝👍👎👊✊🤛🤜🤞✌🤘👌👈👉👆👇☝✋🖐🖖👋🤙💪🖕✍🤳💅🖖💄💋👄👅👂👃👤👣👁👀🗣👥👶👦👧👨👩👱‍♀️👱👴👵👲👳‍♀️👳👮‍♀️👮👷‍♀️👷💂‍♀️💂🕵‍♀️🕵👩‍⚕️👨‍⚕️👩‍🌾️👨‍🌾️👩‍🍳️👨‍🍳️👩‍🎓️👨‍🎓️👩‍🎤️👨‍🎤️👩‍🏫️👨‍🏫️👩‍🏭️👨‍🏭️👩‍💻️👨‍💻️👩‍💼️👨‍💼️👩‍🔧️👨‍🔧️👩‍🔬️👨‍🔬️👩‍🎨️👨‍🎨️👩‍🚒️👨‍🚒️👩‍✈️👨‍✈️👩‍🚀️👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂',
			attachment: utils.pick(['photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367'])
		})
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266)
			message.sendSticker(14266) 
		message.send({
			chat_id: message.chatId,
			message: '👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂😀😃😄😁😆😅😂🤣☺😊😇🙂🙃😉😌😍😘😗😙😚😋😜😝😛🤑🤗🤓😎🤡🤠😏😒😞😔😟😕🙁☹😣😖😫😩😤😠😡😶😐😑😯😦😧😮😲😵😳😱😨😰😢😥🤤😭😓😪😴🙄🤔🤥😬🤐🤢🤧😷🤒🤕😈👿👹👺💩👻💀☠👽👾🤖🎃😺😸😹😻😼😽🙀😿😾👐🙌👏🙏🤝👍👎👊✊🤛🤜🤞✌🤘👌👈👉👆👇☝✋🖐🖖👋🤙💪🖕✍🤳💅🖖💄💋👄👅👂👃👤👣👁👀🗣👥👶👦👧👨👩👱‍♀️👱👴👵👲👳‍♀️👳👮‍♀️👮👷‍♀️👷💂‍♀️💂🕵‍♀️🕵👩‍⚕️👨‍⚕️👩‍🌾️👨‍🌾️👩‍🍳️👨‍🍳️👩‍🎓️👨‍🎓️👩‍🎤️👨‍🎤️👩‍🏫️👨‍🏫️👩‍🏭️👨‍🏭️👩‍💻️👨‍💻️👩‍💼️👨‍💼️👩‍🔧️👨‍🔧️👩‍🔬️👨‍🔬️👩‍🎨️👨‍🎨️👩‍🚒️👨‍🚒️👩‍✈️👨‍✈️👩‍🚀️👨‍🚀️👩‍⚖️👨‍⚖️🎅👸🤴👰🤵👼🤰🙇‍♀️🙇💁💁‍♂️🙅🙅‍♂️🙆🙆‍♂️🙋🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎🙎‍♂️🙍🙍‍♂️💇💇‍♂️💆💆‍♂️🕴💃🕺👯👯‍♂️🚶‍♀️🚶🏃‍♀️🏃👫👭👬💑💏👪👚👕👖👔👗👙👘👠👡👢👞👟👒🎩🎓👑⛑🎒👝👛👜💼👓🕶🌂☂',
			attachment: utils.pick(['photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367', 'photo437055630_457240367'])
		})
	})

	setInterval(() => {
		require('fs').writeFileSync('./data/chats.json', JSON.stringify(chats, null, '\t'))
		require('fs').writeFileSync('./data/users.json', JSON.stringify(users, null, '\t'))
	}, 5000)

}

let kasha = `56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏`