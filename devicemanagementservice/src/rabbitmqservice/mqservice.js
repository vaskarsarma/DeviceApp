// Create RabbitMQ Instance

import amqp from 'amqplib/callback_api';

const CONN_URL = 'amqps://kkasxrvd:cvbco6hEhrvrGFGkJWKfyE8V65HZWWHf@cattle.rmq2.cloudamqp.com/kkasxrvd';

let ch = null;
amqp.connect(CONN_URL, (err, conn) => {
  conn.createChannel((_err, channel) => {
    ch = channel;
  });
});

const publishToQueue = async (queueName, data) => {
  ch.sendToQueue(queueName, Buffer.from(data));
};

process.on('exit', () => {
  ch.close();
  console.log('Closing rabbitmq channel');
});

module.exports = publishToQueue;
