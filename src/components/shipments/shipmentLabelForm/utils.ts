import { Included, RateAttributes } from '@/types';

export type BestOptionsBase = Record<
  'fastest' | 'cheapest' | 'mostBalanced',
  Included | undefined
>;

export type BestOptions = Record<
  'fastest' | 'cheapest' | 'mostBalanced',
  Included
>;

const IGNORE_CAPITALIZING: Record<string, string> = {
  dhl: 'DHL',
};

export const parseLabel = (label: string) => {
  const labelWithoutUnderscores = label.replace(/_/g, ' ').toLowerCase();

  const labelWithoutDuplicates = Array.from(
    new Set(labelWithoutUnderscores.split(' '))
  ).join(' ');

  return labelWithoutDuplicates.replace(/(^\w|\s\w)(\S*)/g, (word, m1, m2) => {
    if (word in IGNORE_CAPITALIZING) return IGNORE_CAPITALIZING[word];
    return m1.toUpperCase() + m2.toLowerCase();
  });
};

export const getTotal = (rate: Included) => {
  const {
    amount_local: currentLocalAmount,
    out_of_area_pricing: currentOOAAmount,
  } = rate.attributes as RateAttributes;

  return parseFloat(currentLocalAmount) + parseFloat(currentOOAAmount);
};

export const getCheapest = (
  cheapest: BestOptionsBase['cheapest'],
  current: Included
): [Included, number] => {
  const currentTotalPrice = getTotal(current);

  if (!cheapest) {
    return [current, currentTotalPrice];
  }

  const {
    amount_local: cheapestLocalAmount,
    out_of_area_pricing: cheapestOOAAmount,
  } = cheapest.attributes as RateAttributes;

  const cheapestTotalPrice =
    parseFloat(cheapestLocalAmount) + parseFloat(cheapestOOAAmount);

  if (currentTotalPrice < cheapestTotalPrice) {
    return [current, currentTotalPrice];
  }

  return [cheapest, cheapestTotalPrice];
};

export const getFastest = (
  fastest: BestOptionsBase['fastest'],
  current: Included
): [Included, number] => {
  const { attributes: currentAttributes } = current;

  const { days: currentDays } = currentAttributes as RateAttributes;

  if (!fastest) {
    return [current, currentDays];
  }

  const { attributes } = fastest;

  const { days: fastestDays } = attributes as RateAttributes;

  if (currentDays === fastestDays) {
    const [cheapestRate] = getCheapest(fastest, current);

    const { days } = cheapestRate.attributes as RateAttributes;

    return [cheapestRate, days];
  }

  if (currentDays < fastestDays) {
    return [current, currentDays];
  }

  return [fastest, fastestDays];
};

export const getMostBalanced = (
  { mostBalanced, fastest, cheapest }: BestOptionsBase,
  current: Included
): [Included, number | null] => {
  if (!mostBalanced || !fastest || !cheapest) {
    return [current, null];
  }

  const { days: fastestDays } = fastest.attributes as RateAttributes;
  const { days: mostBalancedDays } = mostBalanced.attributes as RateAttributes;
  const { days: currentDays } = current.attributes as RateAttributes;

  const cheapestTotal = getTotal(cheapest);
  const mostBalancedTotals = getTotal(mostBalanced);
  const currentTotal = getTotal(current);

  const topOptionsBalanceIndex = fastestDays * cheapestTotal;

  const mostBalancedBalanceIndex =
    (mostBalancedTotals * mostBalancedDays) / topOptionsBalanceIndex;

  const currentBalanceIndex =
    (currentTotal * currentDays) / topOptionsBalanceIndex;

  if (currentBalanceIndex < mostBalancedBalanceIndex) {
    return [current, currentBalanceIndex];
  }

  return [mostBalanced, mostBalancedBalanceIndex];
};
