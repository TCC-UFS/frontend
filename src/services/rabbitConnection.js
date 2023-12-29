import webstomp from 'webstomp-client';

const HOST = process.env.SD_RABBITMQ_HOST;
const USER = process.env.SD_RABBITMQ_USER;
const PWD = process.env.SD_RABBITMQ_PWD;

module.exports = class RabbitConnection {
  constructor() {
    this.Connect();
  }

  async Connect() {
    const opt = { credentials: require('amqplib').credentials.plain(USER, PWD) };
    this.connection = await amqplib.connect(`amqp://${HOST}/chat_sd`, opt);
    this.channel = await this.connection.createChannel();
  }

  SetUser(user) { this.user = user }
  GetUser() { return this.user }

  GetChannel() {
    return this.channel;
  }
}
