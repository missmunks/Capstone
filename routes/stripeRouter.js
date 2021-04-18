const express = require('express');
const stripeRouter = express();
const stripe = require ('stripe')('sk_test_51IgfNNBiothv58cf1OMUUdoXVz5akce35IHlHHrfkcz3hmB2jq3HPYomKuN9Ed8D242645yU8KyqmIPFsrABUDbM00YcTM2dDt');

stripeRouter.post('/create-checkout-session', async (req, res) => {
	const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Order total',
          },
          unit_amount: 200000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://tech-titans-shop.herokuapp.com/success',
    cancel_url: 'https://tech-titans-shop.herokuapp.com/cart',
  });
  
  res.json({id: session.id});
});

module.exports = stripeRouter;
