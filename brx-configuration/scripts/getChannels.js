require('dotenv').config();
const {
  getAllCoreChannels,
} = require('bloomreach-content-management-apis');

const ENVIRONMENT = process.env.BRX_ENVIRONMENT;
const MANAGEMENT_API_TOKEN = process.env.BRX_MANAGEMENT_API_TOKEN;

const init = async () => {
  const channels = await getAllCoreChannels(ENVIRONMENT)
    .then(response => response.data)
    .catch(error => console.error(error))

  console.log('channels', channels)
  channels.forEach(channel => {
    console.log(`Channel: ${channel.name}`)
  })

};

init();
