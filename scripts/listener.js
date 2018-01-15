module.exports = (robot) => {
  // Matches all messages
  robot.hear(/.*/i, (res) => {
    console.log(res.message.rawMessage.channel.name, res.message.rawMessage.thread_ts); 
    console.log(res.message.user.name);
    console.log(res.message.type);
    res.send(res.match[0]);
  });

  // Listens for reactions
  // We're only looking for message.type === 'added'
  // message.reaction === 'smirk' => ':smirk:'
  robot.react(async (res) => {
    const { channel } = res.message.item;
    
    const result = await robot.adapter.client.web.channels.info(channel);

    console.log(res.message.user.name, result.channel.name, res.message.type, res.message.reaction);
  });
};