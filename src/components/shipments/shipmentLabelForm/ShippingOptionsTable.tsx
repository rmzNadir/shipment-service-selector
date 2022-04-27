/* eslint-disable prefer-destructuring */
import { Radio, ScrollArea, Table, Text, Tooltip } from '@mantine/core';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import React, { ReactNode, useEffect, useMemo } from 'react';

import { IncludedRate } from '@/types';

import type { ShipmentLabelFormSchema } from './ShipmentLabelForm';
import {
  BestOptions,
  BestOptionsBase,
  getCheapest,
  getFastest,
  getMostBalanced,
  parseLabel,
} from './utils';

export interface ShippingOptionsTableProps {
  rates: IncludedRate[];
  form: UseForm<ShipmentLabelFormSchema>;
}

export const ShippingOptionsTable = ({
  rates,
  form,
}: ShippingOptionsTableProps) => {
  const { setFieldValue, values } = form;
  const sortedRates = rates.sort((a, b) => {
    const { days: aDays } = a.attributes;
    const { days: bDays } = b.attributes;

    return aDays - bDays;
  });

  const bestOptions = useMemo(() => {
    const bestOptionBase: BestOptionsBase = {
      fastest: undefined,
      cheapest: undefined,
      mostBalanced: undefined,
    };

    return sortedRates.reduce((options, current) => {
      const { cheapest, fastest } = options;

      options.cheapest = getCheapest(cheapest, current)[0];
      options.fastest = getFastest(fastest, current)[0];
      options.mostBalanced = getMostBalanced(options, current)[0];

      return options;
    }, bestOptionBase) as BestOptions;
  }, [sortedRates]);

  useEffect(() => {
    setFieldValue('rate', bestOptions.mostBalanced?.id);
    // Unavoidable, useForm hook's return value isn't memoized
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bestOptions]);

  const hasMultipleFastRates = sortedRates.some(
    ({ attributes: { days }, id }) => {
      const {
        id: fastestID,
        attributes: { days: fastestDays },
      } = bestOptions.fastest;

      return days === fastestDays && id !== fastestID;
    }
  );

  return (
    <ScrollArea>
      <div className="overflow-x-auto whitespace-nowrap">
        <Table highlightOnHover horizontalSpacing="md" verticalSpacing="md">
          <thead>
            <tr>
              <th></th>
              <th>Shipping company</th>
              <th className="!text-right">Estimated days until delivery</th>
              <th className="!text-right">Out of area pricing</th>
              <th className="!text-right">Local area pricing</th>
              <th className="!text-right">Total</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {sortedRates.map((rate) => {
              const { id, attributes } = rate;
              const {
                provider,
                service_level_name: serviceLevelName,
                days,
                out_of_area_pricing: outOfAreaPricing,
                total_pricing: totalPricing,
                amount_local: localPricing,
                currency_local: currencyLocal,
              } = attributes;

              return (
                <tr
                  key={id}
                  className="cursor-pointer"
                  onClick={() => setFieldValue('rate', id)}
                  aria-label="select shipping provider"
                >
                  <td>
                    <Radio
                      value={id}
                      checked={values.rate === id}
                      readOnly
                      aria-label="select shipping provider"
                    />
                  </td>
                  <td>
                    <Text
                      weight={
                        bestOptions?.mostBalanced?.id === id
                          ? 'bold'
                          : undefined
                      }
                    >
                      {parseLabel(`${provider} ${serviceLevelName} `)}
                      {bestOptions &&
                        renderRateValueRatings(
                          rate,
                          bestOptions,
                          hasMultipleFastRates
                        )}
                    </Text>
                  </td>
                  <td className="text-right">{days}</td>
                  <td className="text-right">{outOfAreaPricing}</td>
                  <td className="text-right">{localPricing}</td>
                  <td className="text-right">{totalPricing}</td>
                  <td>{currencyLocal}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </ScrollArea>
  );
};

const renderRateValueRatings = (
  { id, attributes }: IncludedRate,
  bestOptions: BestOptions,
  hasMultipleFastRates: boolean
) => {
  const ratings: ReactNode[] = [];

  const { fastest, cheapest, mostBalanced } = bestOptions;

  const { days } = fastest.attributes;
  const { days: currentDays } = attributes;

  if (currentDays === days)
    ratings.push(
      <Tooltip key={`fast-${id}`} label="Fastest shipping time">
        ▶️
      </Tooltip>
    );

  if (fastest.id === id && hasMultipleFastRates) {
    ratings[0] = (
      <Tooltip
        key={`fastest-${id}`}
        wrapLines
        label="Fastest shipping time with the lowest price compared to other options with the same shipping time"
        width={220}
      >
        ⏩
      </Tooltip>
    );
  }

  if (cheapest.id === id)
    ratings.push(
      <Tooltip key={`cheapest-${id}`} label="Cheapest option">
        💵
      </Tooltip>
    );

  if (mostBalanced.id === id)
    ratings.push(
      <Tooltip key={`best-${id}`} label="Best option">
        🥇
      </Tooltip>
    );

  return ratings;
};
