import discord
from discord.ext import commands
import random
client = commands.Bot(command_prefix = '.')

# EVENT
@client.event 
async def on_ready():
    print("READY !")
# @client.event
# async def on_


#COMMAND
@client.command()
# CALL .tick in chat 
async def tick(ctx):
    await ctx.send(f'tock ! {round(client.latency*1000)} ms')

@client.command(aliases=["8ques", "ask"]) # default only can call .8ques
async def _8ques(ctx, * , question): # * mean just 1 params
    response = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes - definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful."
    ]
    await ctx.send(f'Question: {question}\nAnswer: {random.choice(response)}')


@client.command()
async def clear(ctx, amount = 5):
    await ctx.channel.purge(limit = amount)

@client.command()
async def kick(ctx, member: discord.Member, * , reason = None):
    await member.kick(reason= reason)

@client.command()
async def ban(ctx, member: discord.Member, * , reason = None):
    await member.ban(reason= reason)
    await ctx.send(f'Banned {member.mention}')


@client.command()
async def unban(ctx, *, member):
    banned_user = await ctx.guild.bans()
    name, disciminator = member.split("#")
    for banned_entry in banned_user:
        user = banned_entry.user
        if (user.name, user.discrimator) == (name, disciminator):
            await ctx.guild.unban(user)
            await ctx.send(f'Unbanned {member.mention}')
            return 

client.run('ODExNTU3OTAzMzA2OTgxMzk2.YCz8Mg.__P_IrfuI4HxTaCZ5-x3yFfMpog')