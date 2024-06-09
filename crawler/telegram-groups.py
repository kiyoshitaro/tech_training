from telethon import TelegramClient
import telethon
import pandas as pd
import os
from telethon.tl.types import Dialog

# Use your own values from my.telegram.org
api_id = '25979047'
api_hash = '38c0d09178e47d1d569275c6c51dbb2a'
client = TelegramClient('test', api_id, api_hash)
package_dir = os.path.dirname(os.path.abspath(__file__))

async def main():
	global package_dir
	me = await client.get_me()	
	print(me.stringify())

	username = me.username
	print(username)
	print(me.phone)
	await init_empty()
async def init_empty():
	async for dialog in client.iter_dialogs():
		print(str(dialog.entity.id), 'kkkkkkkkkkkkkkk')
		if(str(dialog.entity.id) != '1912036397'):
			continue
		else:
			print(dialog, type(dialog.entity))
   		# if type(dialog.entity) == telethon.tl.types.Channel:
			await collect_data(dialog, "")
	print("	---[✓✓] Init completed!")

async def collect_data(dialog: Dialog, link):
	group = dialog.entity
	# messages = []
	d = {}
	print(type(group), "uuuuu", group.username)
	if type(group) == telethon.tl.types.Channel or type(group) == telethon.tl.types.Chat:
		members = []
		datas = []
		try:
			# if group.username != None and group.broadcast != True:
				async for m in client.iter_participants(dialog.id):
					members.append(m.to_dict())
			# if group.username != None:
				# change limit according to how many messages have to be saved
				async for m in client.iter_messages(dialog.id, limit=10000):
					# print(m)
					d = m.to_dict()
					# d = {
					# 	"id": str(group.id),
					# 	"name": group.title,
					# 	"date": str(m.date),
					# 	"content": m.message,
					# 	"mess_id": m.id,
					# 	"reply_to_mess_id": m.reply_to_msg_id,
					# }
					# if(m.from_id and m.from_id.user_id):
					# 	d["from_user_id"] = m.from_id.user_id
					datas.append(d)
		except telethon.errors.rpcerrorlist.ChannelPrivateError as e:
			print("	---[✘] Data collection failed: "+str(e)) 	
	print("	---[✓] Data collected succesfully in: "+str(dialog.entity.id))
	df_messages = pd.DataFrame.from_dict(datas)
	df_messages.to_pickle(os.path.join(package_dir,'messages'))
	df_users = pd.DataFrame.from_dict(members)
	df_users.to_pickle(os.path.join(package_dir,'members'))
	return datas

with client:
	client.loop.run_until_complete(main())
	client.disconnect()
 
# https://github.com/edogab33/telegram-groups-crawler
# import pandas as pd
# mess = pd.read_pickle('messages')
# # mem = pd.read_pickle('members')
# mess.to_csv('raw.csv', index=False)