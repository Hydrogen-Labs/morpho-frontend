'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react';

export default function SelectSupplyToken() {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const decimalRegex = /^\d*\.?\d*$/;
    if (decimalRegex.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-[#343a3a] w-full p-4 gap-4 rounded-xl">
      <span className="text-xl w-full text-left">Select Supply Token</span>
      <div className="relative">
        <Input value={amount} onChange={handleAmountChange} placeholder="0.0" />
        <Select>
          <SelectTrigger className="w-2/5 absolute top-0">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
