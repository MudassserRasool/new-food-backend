import requireAuth from '../middlewares/requireAuth.js';
import categoryRouter from '../routes/categoryRoute.js';
import productRouter from '../routes/productRoute.js';
import profileRouter from '../routes/profile.js';
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
];

export default apiRoutes;
