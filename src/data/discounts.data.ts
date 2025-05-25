import { Discount } from '../models/discounts.model';

export default [
  {
    id: '8e07378c-3ebd-41e0-9da1-62f595914141',
    _deleted: false,
    products: [
      '706b3401-1934-4d3d-8fbe-401fc89bb2dc',
      'bc90c40c-c12a-421c-ae9b-f2cab13a2155'
    ],
    type: 'total',
    amount: 3.5,
    start_date: '2025-05-25T04:24:00.031Z' as unknown as Date,
    end_date: '2025-05-31T04:24:00.031Z' as unknown as Date,
    enabled: true
  },
  {
    id: 'f670fae8-df5d-4c33-bec1-319f8dbaf922',
    _deleted: false,
    products: [
      '91408d81-cf58-4017-944c-15ae76374d31',
      '4c93046a-8799-46a0-86cd-1e2b0faf1ec5'
    ],
    type: 'percentage',
    amount: 35,
    start_date: '2025-05-25T04:24:00.031Z' as unknown as Date,
    end_date: '2025-06-10T04:24:00.031Z' as unknown as Date,
    enabled: true
  }
] as Discount[];
