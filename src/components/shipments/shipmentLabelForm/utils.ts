import { IncludedRate } from '@/types';

export type BestOptionsBase = Record<
  'fastest' | 'cheapest' | 'mostBalanced',
  IncludedRate | undefined
>;

export type BestOptions = Record<
  'fastest' | 'cheapest' | 'mostBalanced',
  IncludedRate
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

export const getTotal = (rate: IncludedRate) => {
  const {
    amount_local: currentLocalAmount,
    out_of_area_pricing: currentOOAAmount,
  } = rate.attributes;

  return parseFloat(currentLocalAmount) + parseFloat(currentOOAAmount);
};

export const getCheapest = (
  cheapest: BestOptionsBase['cheapest'],
  current: IncludedRate
): [IncludedRate, number] => {
  const currentTotalPrice = getTotal(current);

  if (!cheapest) {
    return [current, currentTotalPrice];
  }

  const {
    amount_local: cheapestLocalAmount,
    out_of_area_pricing: cheapestOOAAmount,
  } = cheapest.attributes;

  const cheapestTotalPrice =
    parseFloat(cheapestLocalAmount) + parseFloat(cheapestOOAAmount);

  if (currentTotalPrice < cheapestTotalPrice) {
    return [current, currentTotalPrice];
  }

  return [cheapest, cheapestTotalPrice];
};

export const getFastest = (
  fastest: BestOptionsBase['fastest'],
  current: IncludedRate
): [IncludedRate, number] => {
  const { attributes: currentAttributes } = current;

  const { days: currentDays } = currentAttributes;

  if (!fastest) {
    return [current, currentDays];
  }

  const { attributes } = fastest;

  const { days: fastestDays } = attributes;

  if (currentDays === fastestDays) {
    const [cheapestRate] = getCheapest(fastest, current);

    const { days } = cheapestRate.attributes;

    return [cheapestRate, days];
  }

  if (currentDays < fastestDays) {
    return [current, currentDays];
  }

  return [fastest, fastestDays];
};

export const getMostBalanced = (
  { mostBalanced, fastest, cheapest }: BestOptionsBase,
  current: IncludedRate
): [IncludedRate, number | null] => {
  if (!mostBalanced || !fastest || !cheapest) {
    return [current, null];
  }

  const { days: fastestDays } = fastest.attributes;
  const { days: mostBalancedDays } = mostBalanced.attributes;
  const { days: currentDays } = current.attributes;

  const cheapestTotal = getTotal(cheapest);
  const mostBalancedTotals = getTotal(mostBalanced);
  const currentTotal = getTotal(current);

  const topOptionsBalanceIndex = cheapestTotal + fastestDays;

  const mostBalancedBalanceIndex =
    topOptionsBalanceIndex /
    (mostBalancedTotals + (mostBalancedDays * 500) / fastestDays);

  const currentBalanceIndex =
    topOptionsBalanceIndex / (currentTotal + (currentDays * 500) / fastestDays);

  if (currentBalanceIndex > mostBalancedBalanceIndex) {
    return [current, currentBalanceIndex];
  }

  return [mostBalanced, mostBalancedBalanceIndex];
};
