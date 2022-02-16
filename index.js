
const mongodb = require('mongodb');

const client = new mongodb.MongoClient('mongodb://localhost:27017')

const connectClient = async () => {
    await client.connect()
    console.log('ClientConnected!')
};

const getUserCollection = () => {
    const db = client.db('megans-db');
    const col = db.collection('users');
    return col;
}
//update
const insertUser = async () => {
    const col = getUserCollection();
    await col.insertOne({
        first: 'Megan',
        last: 'Martel',
        job: 'student',
    });
    console.log('User Inserted!');
};

const getUsers = async () => {
    const col = getUserCollection();
    const users = await col.find({}).toArray();
    return users;
};

const getProductCollection = () => {
    const db = client.db('megans-db');
    const col = db.collection('products');
    return col;
}

const insertProduct = async () => {
    const col = getProductCollection();
    await col.insertOne({
        type: 'pants',
        color: 'blue',
        size: 'small',
    });
    console.log('Product Inserted!');
};

const getProducts = async () => {
    const col = getProductCollection();
    const products = await col.find({}).toArray();
    return products;
};

connectClient()
    .then(() => insertUser())
    .then(() => getUsers())
    .then((users) => console.log(users))
    .then(() => insertProduct())
    .then(() => getProducts())
    .then((products) => console.log(products))
    .then (() => client.close());


