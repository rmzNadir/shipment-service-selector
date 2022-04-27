import {
  BestOptions,
  getCheapest,
  getFastest,
  getMostBalanced,
  getTotal,
  parseLabel,
} from '@/components/shipments/shipmentLabelForm/utils';
import { IncludedRate } from '@/types';

const RATE_A: IncludedRate = {
  id: '391002',
  type: 'rates',
  attributes: {
    created_at: '2022-04-27T10:03:12.934-05:00',
    updated_at: '2022-04-27T10:03:12.960-05:00',
    amount_local: '134.0',
    currency_local: 'MXN',
    provider: 'CARSSA',
    service_level_name: 'Nacional',
    service_level_code: 'NACIONAL',
    service_level_terms: null,
    days: 10,
    duration_terms: null,
    zone: null,
    arrives_by: null,
    out_of_area: false,
    out_of_area_pricing: '0.0',
    total_pricing: '134.0',
    is_ocurre: false,
  },
};

const RATE_B: IncludedRate = {
  id: '390994',
  type: 'rates',
  attributes: {
    created_at: '2022-04-27T10:03:06.374-05:00',
    updated_at: '2022-04-27T10:03:13.006-05:00',
    amount_local: '201.0',
    currency_local: 'MXN',
    provider: 'FEDEX',
    service_level_name: 'Fedex Express Saver',
    service_level_code: 'FEDEX_EXPRESS_SAVER',
    service_level_terms: null,
    days: 5,
    duration_terms: null,
    zone: null,
    arrives_by: null,
    out_of_area: false,
    out_of_area_pricing: '0.0',
    total_pricing: '201.0',
    is_ocurre: false,
  },
};

const BEST_OPTIONS: BestOptions = {
  mostBalanced: {
    id: '390999',
    type: 'rates',
    attributes: {
      created_at: '2022-04-27T10:03:12.713-05:00',
      updated_at: '2022-04-27T10:03:12.977-05:00',
      amount_local: '228.0',
      currency_local: 'MXN',
      provider: 'REDPACK',
      service_level_name: 'Express',
      service_level_code: 'EXPRESS',
      service_level_terms: null,
      days: 2,
      duration_terms: null,
      zone: null,
      arrives_by: null,
      out_of_area: false,
      out_of_area_pricing: '0.0',
      total_pricing: '228.0',
      is_ocurre: false,
    },
  },
  fastest: {
    id: '390999',
    type: 'rates',
    attributes: {
      created_at: '2022-04-27T10:03:12.713-05:00',
      updated_at: '2022-04-27T10:03:12.977-05:00',
      amount_local: '228.0',
      currency_local: 'MXN',
      provider: 'REDPACK',
      service_level_name: 'Express',
      service_level_code: 'EXPRESS',
      service_level_terms: null,
      days: 2,
      duration_terms: null,
      zone: null,
      arrives_by: null,
      out_of_area: false,
      out_of_area_pricing: '0.0',
      total_pricing: '228.0',
      is_ocurre: false,
    },
  },
  cheapest: {
    id: '390998',
    type: 'rates',
    attributes: {
      created_at: '2022-04-27T10:03:12.708-05:00',
      updated_at: '2022-04-27T10:03:12.982-05:00',
      amount_local: '128.0',
      currency_local: 'MXN',
      provider: 'REDPACK',
      service_level_name: 'Ecoexpress',
      service_level_code: 'ECOEXPRESS',
      service_level_terms: null,
      days: 5,
      duration_terms: null,
      zone: null,
      arrives_by: null,
      out_of_area: false,
      out_of_area_pricing: '0.0',
      total_pricing: '128.0',
      is_ocurre: false,
    },
  },
};

describe('Shipment label form utils', () => {
  describe('parseLabel', () => {
    it('Correctly parses a label that ignores capitalization', () => {
      const result = parseLabel('DHL Express');

      expect(result).toBe('DHL Express');
    });

    it('Correctly parses a normal label', () => {
      const result = parseLabel('FEDEX STANDARD OVERNIGHT');

      expect(result).toBe('Fedex Standard Overnight');
    });
  });

  describe('getTotal', () => {
    it('Correctly returns the total of the passed rate as an integer', () => {
      const result = getTotal(RATE_A);

      expect(result).toBe(134);
    });
  });

  describe('getCheapest', () => {
    it('Correctly returns the cheapest of two rates', () => {
      const [cheapest, total] = getCheapest(RATE_A, RATE_B);

      expect(cheapest).toBe(RATE_A);
      expect(total).toBe(134);
    });
  });

  describe('getFastest', () => {
    it('Correctly returns the rate with the fastest shipping time', () => {
      const [fastest, days] = getFastest(RATE_A, RATE_B);

      expect(fastest).toBe(RATE_B);
      expect(days).toBe(5);
    });
  });

  describe('getMostBalanced', () => {
    it('Correctly returns the best option', () => {
      const [mostBalanced, balanceIndex] = getMostBalanced(
        BEST_OPTIONS,
        RATE_B
      );

      expect(mostBalanced).toBe(BEST_OPTIONS.mostBalanced);
      expect(balanceIndex).toBe(0.39634146341463417);
    });
  });
});
