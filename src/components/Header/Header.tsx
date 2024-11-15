'use client';

import React from 'react';
import HeaderLinks from './HeaderLinks';
import HeaderStats from './HeaderStats';
import Logo from './Logo';
import Wallet from './Wallet';

export default function Header() {
  return (
    <div className="w-full flex justify-between p-8 items-center">
      <Logo />
      <div className="flex justify-end items-center">
        <HeaderLinks />
        <HeaderStats />
        <Wallet />
      </div>
    </div>
  );
}
