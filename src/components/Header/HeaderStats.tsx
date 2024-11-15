'use client';

import totalBorrowedImg from '@/assets/totalBorrowed.svg';
import totalDepositsImg from '@/assets/totalDeposits.svg';
import { Loading } from '@/components/Loading';
import { formatCurrency } from '@/lib/utils';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const GET_MORPHO_BLUES = gql`
  query GetMorphoBlues {
    morphoBlues {
      items {
        state {
          totalBorrowUsd
          totalDepositUsd
        }
      }
    }
  }
`;

export default function HeaderStats() {
  const { loading, data } = useQuery(GET_MORPHO_BLUES);
  const [totalDeposits, setTotalDeposits] = useState<number | undefined>(undefined);
  const [totalBorrowed, setTotalBorrowed] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (data) {
      const totalDepositUsd =
        data.morphoBlues.items[0].state.totalDepositUsd + data.morphoBlues.items[1].state.totalDepositUsd;
      const totalBorrowUsd =
        data.morphoBlues.items[0].state.totalBorrowUsd + data.morphoBlues.items[1].state.totalBorrowUsd;
      setTotalDeposits(totalDepositUsd);
      setTotalBorrowed(totalBorrowUsd);
    }
  }, [data]);

  return (
    <div className="w-full flex justify-between p-4 gap-4 items-center text-xs">
      <div className="flex justify-between items-center border rounded-full border-[#456DB5] px-4 py-2 bg-[#1f2324] ">
        <div className="flex justify-between items-center">
          <Image src={totalDepositsImg} alt="Total Deposits" />
          <span className="pl-2 pr-6 whitespace-nowrap">Total Deposits</span>
        </div>
        <span>{loading || !totalDeposits ? <Loading /> : <span>{formatCurrency(totalDeposits)}</span>}</span>
      </div>
      <div className="flex justify-between items-center border rounded-full border-[#456DB5] px-4 py-2 bg-[#1f2324]">
        <div className="flex justify-between items-center">
          <Image src={totalBorrowedImg} alt="Total Borrowed" />
          <span className="pl-2 pr-6 whitespace-nowrap">Total Borrowed</span>
        </div>
        <span>{loading || !totalBorrowed ? <Loading /> : <span>{formatCurrency(totalBorrowed)}</span>}</span>
      </div>
    </div>
  );
}
