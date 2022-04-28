import {
  ActionIcon,
  Button,
  Divider,
  Modal,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import Link from 'next/link';
import React, { useState } from 'react';
import { Copy, ExternalLink } from 'tabler-icons-react';

import { IncludedRate, LabelAttributes } from '@/types';

import { getTotal, parseLabel } from './utils';

export interface ResultModalProps {
  isOpen: boolean;
  onClose(): void;
  label?: LabelAttributes;
  rate?: IncludedRate;
}

export const ResultModal = ({
  isOpen,
  onClose,
  label,
  rate,
}: ResultModalProps) => {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      centered
      title={<Title order={3}>Shipping label(s)</Title>}
      classNames={{ modal: 'mt-48' }}
      closeButtonLabel="close modal"
    >
      <Divider />
      <div className="mt-6">
        {label && rate && (
          <Content label={label} rate={rate} onClose={onClose} />
        )}
      </div>
    </Modal>
  );
};

const Content = ({
  label,
  rate,
  onClose,
}: Required<Omit<ResultModalProps, 'isOpen'>>) => {
  const [copiedValue, setCopiedValue] = useState('');
  const {
    provider,
    service_level_name: serviceLevelName,
    days,
    currency_local: currencyLocal,
  } = rate.attributes;

  const {
    tracking_number: trackingNumber,
    tracking_url_provider: trackingURL,
    label_url: labelURL,
  } = label;

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(() => setCopiedValue(value));

    setTimeout(() => {
      setCopiedValue('');
    }, 5000);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Title order={4}>{parseLabel(`${provider} ${serviceLevelName}`)}</Title>
        <Text>{days}-Day shipping</Text>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Text>Total</Text>{' '}
        <Text>
          {rate && getTotal(rate)} {currencyLocal}
        </Text>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <Text>Tracking number</Text>
        <Tooltip
          position="right"
          label={copiedValue === trackingNumber ? 'Copied!' : 'Copy'}
          color={copiedValue === trackingNumber ? 'green' : undefined}
        >
          <ActionIcon
            onClick={() => copyToClipboard(trackingNumber)}
            aria-label="copy tracking number"
          >
            <Copy size={16} />
          </ActionIcon>
        </Tooltip>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <Text>Tracking URL</Text>

        <Tooltip
          position="right"
          label={copiedValue === trackingURL ? 'Copied!' : 'Copy'}
          color={copiedValue === trackingURL ? 'green' : undefined}
        >
          <ActionIcon
            onClick={() => copyToClipboard(trackingURL)}
            aria-label="copy tracking url"
          >
            <Copy size={16} />
          </ActionIcon>
        </Tooltip>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <Text>Label</Text>

        <Tooltip position="right" label="Open label document">
          <ActionIcon
            component="a"
            href={labelURL}
            target="_blank"
            aria-label="open label document in another window"
          >
            <ExternalLink size={16} />
          </ActionIcon>
        </Tooltip>
      </div>

      <div className="mt-12 flex gap-4">
        <Button fullWidth color="red" onClick={onClose}>
          Close
        </Button>
        <Link href="/" passHref>
          <Button fullWidth component="a">
            Create another shipment
          </Button>
        </Link>
      </div>
    </>
  );
};
