import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    const conString = `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}-shard-00-00.fhfeh.mongodb.net:27017,${process.env.mongodb_cluster}-shard-00-02.fhfeh.mongodb.net:27017/${process.env.mongodb_database}?ssl=true&replicaSet=atlas-13paf0-shard-0&authSource=admin&retryWrites=true&w=majority`

    try {
      // client = await MongoClient.connect(
      //   'mongodb://admin:test@cluster0-shard-00-00.fhfeh.mongodb.net:27017,cluster0-shard-00-01.fhfeh.mongodb.net:27017,cluster0-shard-00-02.fhfeh.mongodb.net:27017/my-site?ssl=true&replicaSet=atlas-13paf0-shard-0&authSource=admin&retryWrites=true&w=majority'
      // );
      client = await MongoClient.connect(conString);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', message: newMessage });
  }
}

export default handler;
