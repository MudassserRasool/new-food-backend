import requireAuth from '../middlewares/requireAuth.js';
import categoryRouter from '../routes/categoryRoute.js';
import dealRouter from '../routes/dealRoute.js  ';
import orderRouter from '../routes/orderRoute.js';
import productRouter from '../routes/productRoute.js';
import profileRouter from '../routes/profileRoute.js';
import reviewRouter from '../routes/reviewRoute.js';
import userRouter from '../routes/user.js';
const apiRoutes = [
  {
    baseResource: 'user',
    router: userRouter,
    middlewares: [], // Optional additional middleware for this route
  },
  {
    baseResource: 'profile',
    router: profileRouter,
    middlewares: [requireAuth],
  },
  {
    baseResource: 'category',
    router: categoryRouter,
    middlewares: [requireAuth],
  },
  {
    baseResource: 'product',
    router: productRouter,
    middlewares: [requireAuth],
  },
  {
    baseResource: 'deal',
    router: dealRouter,
    middlewares: [requireAuth],
  },
  {
    baseResource: 'review',
    router: reviewRouter,
    middlewares: [requireAuth],
  },
  {
    baseResource: 'order',
    router: orderRouter,
    middlewares: [requireAuth],
  },
];

export default apiRoutes;
