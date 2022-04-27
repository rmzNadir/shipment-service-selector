/* eslint-disable prefer-destructuring */
import { Radio, ScrollArea, Table, Text, Tooltip } from '@mantine/core';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import React, { ReactNode, useMemo } from 'react';

import { Included, RateAttributes } from '@/types';

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
  rates: Included[];
  form: UseForm<ShipmentLabelFormSchema>;
}

export const ShippingOptionsTable = ({
  rates,
  form,
}: ShippingOptionsTableProps) => {
  const { setFieldValue, values } = form;

  const bestOptions = useMemo(() => {
    const bestOptionBase: BestOptionsBase = {
      fastest: undefined,
      cheapest: undefined,
      mostBalanced: undefined,
    };

    return rates?.reduce((options, current) => {
      const { cheapest, fastest } = options;

      options.cheapest = getCheapest(cheapest, current)[0];
      options.fastest = getFastest(fastest, current)[0];
      options.mostBalanced = getMostBalanced(options, current)[0];

      return options;
    }, bestOptionBase);
  }, [rates]);

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
            {rates.map((rate) => {
              const { id, attributes } = rate;
              const {
                provider,
                service_level_name: serviceLevelName,
                days,
                out_of_area_pricing: outOfAreaPricing,
                total_pricing: totalPricing,
                amount_local: localPricing,
                currency_local: currencyLocal,
              } = attributes as RateAttributes;

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
                      {parseLabel(`${provider} ${serviceLevelName}`)}
                      {bestOptions &&
                        renderRateValueRatings(
                          rate,
                          bestOptions as BestOptions
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
  { id, attributes }: Included,
  bestOptions: BestOptions
) => {
  const ratings: ReactNode[] = [];

  const { fastest, cheapest, mostBalanced } = bestOptions;

  const { days } = fastest.attributes as RateAttributes;
  const { days: currentDays } = attributes as RateAttributes;

  if (currentDays === days)
    ratings.push(
      <Tooltip key={`fast-${id}`} label="Fastest shipping time">
        ▶️
      </Tooltip>
    );

  if (fastest.id === id)
    ratings.push(
      <Tooltip
        key={`fastest-${id}`}
        wrapLines
        label="Fastest shipping time with the lowest price"
        width={220}
      >
        ⏩
      </Tooltip>
    );

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
