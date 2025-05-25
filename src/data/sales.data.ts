import { Sale } from '../models/sales.model';

export default [
  {
    id: '8e07378c-3ebd-41e0-9da1-62f595914141',
    _deleted: false,
    products: [
      {
        product_id: '706b3401-1934-4d3d-8fbe-401fc89bb2dc',
        quantity: 1
      },
      {
        product_id: 'bc90c40c-c12a-421c-ae9b-f2cab13a2155',
        quantity: 1
      }
    ],
    client_id: 'e76d0703-d105-46b2-9170-666f6061ee2c',
    amount: 3.5
  },
  {
    id: 'f670fae8-df5d-4c33-bec1-319f8dbaf922',
    _deleted: false,
    products: [
      {
        product_id: '91408d81-cf58-4017-944c-15ae76374d31',
        quantity: 2
      },
      {
        product_id: '4c93046a-8799-46a0-86cd-1e2b0faf1ec5',
        quantity: 1
      }
    ],
    client_id: '1abea531-1493-481d-873d-1d70766a1f58',
    amount: 35
  }
] as Sale[];
