'use client';

import AvailablePositions from '@/components/AvailablePositions';
import BorrowEarnForm from '@/components/BorrowEarnForm';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

export default function Page() {
  const [isEarn, setIsEarn] = useState(true);

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1 px-8">
        <BorrowEarnForm isEarn={isEarn} setIsEarn={setIsEarn} />
      </div>
      <div className="col-span-2 flex justify-between">
        <Separator orientation="vertical" className="w-0.5" />
        <div className="w-full px-8">
          <AvailablePositions />
        </div>
      </div>
    </div>
  );
}
