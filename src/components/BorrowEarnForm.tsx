'use client';

import { cn } from '@/lib/utils';

export default function BorrowEarnForm({
  isEarn,
  setIsEarn
}: {
  isEarn: boolean;
  setIsEarn: (isEarn: boolean) => void;
}) {
  return (
    <div
      className={cn(
        'flex flex-col justify-between items-center bg-[#1f2324] rounded-xl p-4 gap-4 h-full',
        'border rounded-xl border-[#456DB5]'
      )}
    >
      <div className="w-full p-1.5 bg-[#343a3a] rounded-full flex justify-between gap-2">
        <span
          className={cn(
            'text-2xl w-full text-center rounded-full text-white py-3 cursor-pointer',
            isEarn ? 'bg-[#456DB5]' : 'bg-[#2f3434]'
          )}
          onClick={() => setIsEarn(true)}
        >
          Earn
        </span>
        <span
          className={cn(
            'text-2xl w-full text-center rounded-full text-white py-3 cursor-pointer',
            isEarn ? 'bg-[#2f3434]' : 'bg-[#456DB5]'
          )}
          onClick={() => setIsEarn(false)}
        >
          Borrow
        </span>
      </div>

      <div className="flex flex-col gap-4 justify-between items-center ">
        <span className="text-[#919AAF] text-center">
          Morpho is the most efficient, secure, and flexible lending protocol on Ethereum.
        </span>
        <button className="text-2xl w-full rounded-full bg-[#2c2d2d] text-white py-2">Finalize transaction</button>
      </div>
    </div>
  );
}
