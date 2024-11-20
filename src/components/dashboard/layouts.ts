import { Layouts } from './types';

export const defaultLayouts: Layouts = {
  lg: [
    { i: 'kpi-revenue', x: 0, y: 0, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1 },
    { i: 'kpi-transactions', x: 3, y: 0, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1 },
    { i: 'kpi-refund', x: 6, y: 0, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1 },
    { i: 'kpi-average', x: 9, y: 0, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1 },
    { i: 'transaction-chart', x: 0, y: 2, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'recent-transactions', x: 6, y: 2, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'bank-transactions', x: 0, y: 6, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'secure-transactions', x: 6, y: 6, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'error-distribution', x: 0, y: 10, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'payment-channels', x: 6, y: 10, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'hourly-distribution', x: 0, y: 14, w: 12, h: 3, minW: 6, maxW: 12, minH: 2, maxH: 3 }
  ],
  md: [
    { i: 'kpi-revenue', x: 0, y: 0, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1 },
    { i: 'kpi-transactions', x: 3, y: 0, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1 },
    { i: 'kpi-refund', x: 6, y: 0, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1 },
    { i: 'kpi-average', x: 9, y: 0, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1 },
    { i: 'transaction-chart', x: 0, y: 2, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'recent-transactions', x: 6, y: 2, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'bank-transactions', x: 0, y: 6, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'secure-transactions', x: 6, y: 6, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'error-distribution', x: 0, y: 10, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'payment-channels', x: 6, y: 10, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'hourly-distribution', x: 0, y: 14, w: 12, h: 3, minW: 6, maxW: 12, minH: 2, maxH: 3 }
  ],
  sm: [
    { i: 'kpi-revenue', x: 0, y: 0, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1 },
    { i: 'kpi-transactions', x: 3, y: 0, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1 },
    { i: 'kpi-refund', x: 0, y: 2, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1 },
    { i: 'kpi-average', x: 3, y: 2, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1 },
    { i: 'transaction-chart', x: 0, y: 4, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'recent-transactions', x: 0, y: 8, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'bank-transactions', x: 0, y: 12, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'secure-transactions', x: 0, y: 16, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'error-distribution', x: 0, y: 20, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'payment-channels', x: 0, y: 24, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 },
    { i: 'hourly-distribution', x: 0, y: 28, w: 6, h: 3, minW: 3, maxW: 6, minH: 2, maxH: 3 }
  ],
  xs: [
    { i: 'kpi-revenue', x: 0, y: 0, w: 2, h: 1, minW: 2, maxW: 2, minH: 1, maxH: 1 },
    { i: 'kpi-transactions', x: 2, y: 0, w: 2, h: 1, minW: 2, maxW: 2, minH: 1, maxH: 1 },
    { i: 'kpi-refund', x: 0, y: 2, w: 2, h: 1, minW: 2, maxW: 2, minH: 1, maxH: 1 },
    { i: 'kpi-average', x: 2, y: 2, w: 2, h: 1, minW: 2, maxW: 2, minH: 1, maxH: 1 },
    { i: 'transaction-chart', x: 0, y: 4, w: 4, h: 3, minW: 2, maxW: 4, minH: 2, maxH: 3 },
    { i: 'recent-transactions', x: 0, y: 8, w: 4, h: 3, minW: 2, maxW: 4, minH: 2, maxH: 3 },
    { i: 'bank-transactions', x: 0, y: 12, w: 4, h: 3, minW: 2, maxW: 4, minH: 2, maxH: 3 },
    { i: 'secure-transactions', x: 0, y: 16, w: 4, h: 3, minW: 2, maxW: 4, minH: 2, maxH: 3 },
    { i: 'error-distribution', x: 0, y: 20, w: 4, h: 3, minW: 2, maxW: 4, minH: 2, maxH: 3 },
    { i: 'payment-channels', x: 0, y: 24, w: 4, h: 3, minW: 2, maxW: 4, minH: 2, maxH: 3 },
    { i: 'hourly-distribution', x: 0, y: 28, w: 4, h: 3, minW: 2, maxW: 4, minH: 2, maxH: 3 }
  ],
  xxs: [
    { i: 'kpi-revenue', x: 0, y: 0, w: 2, h: 1, minW: 2, maxW: 2, minH: 1, maxH: 1 },
    { i: 'kpi-transactions', x: 0, y: 2, w: 2, h: 1, minW: 2, maxW: 2, minH: 1, maxH: 1 },
    { i: 'kpi-refund', x: 0, y: 4, w: 2, h: 1, minW: 2, maxW: 2, minH: 1, maxH: 1 },
    { i: 'kpi-average', x: 0, y: 6, w: 2, h: 1, minW: 2, maxW: 2, minH: 1, maxH: 1 },
    { i: 'transaction-chart', x: 0, y: 8, w: 2, h: 3, minW: 2, maxW: 2, minH: 2, maxH: 3 },
    { i: 'recent-transactions', x: 0, y: 12, w: 2, h: 3, minW: 2, maxW: 2, minH: 2, maxH: 3 },
    { i: 'bank-transactions', x: 0, y: 16, w: 2, h: 3, minW: 2, maxW: 2, minH: 2, maxH: 3 },
    { i: 'secure-transactions', x: 0, y: 20, w: 2, h: 3, minW: 2, maxW: 2, minH: 2, maxH: 3 },
    { i: 'error-distribution', x: 0, y: 24, w: 2, h: 3, minW: 2, maxW: 2, minH: 2, maxH: 3 },
    { i: 'payment-channels', x: 0, y: 28, w: 2, h: 3, minW: 2, maxW: 2, minH: 2, maxH: 3 },
    { i: 'hourly-distribution', x: 0, y: 32, w: 2, h: 3, minW: 2, maxW: 2, minH: 2, maxH: 3 }
  ]
};