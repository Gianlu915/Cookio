import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'node:fs/promises';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());
app.use(express.static('public'));


app.options('*', cors());


app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  console.log('POST /orders body:', req.body);

  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: 'Missing data.' });
  }


  if (
    !orderData.customer.email ||
    !orderData.customer.email.includes('@') ||
    !orderData.customer.name ||
    orderData.customer.name.trim() === '' ||
    !orderData.customer.street ||
    orderData.customer.street.trim() === '' ||
    !orderData.customer['postal-code'] ||
    orderData.customer['postal-code'].trim() === '' ||
    !orderData.customer.city ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
