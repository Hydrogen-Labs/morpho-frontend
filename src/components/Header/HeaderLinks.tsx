'use client';

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function HeaderLinks() {
  const pathname = usePathname();

  const links = [
    { href: '/positions', label: 'Your Positions' },
    { href: '/', label: 'New Position' },
    { href: '/rewards', label: 'Your Rewards' }
  ];

  return (
    <div className="w-full flex justify-between p-4 items-center whitespace-nowrap">
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className="flex flex-col items-center px-8">
          {label}
          {pathname === href && <Separator orientation="horizontal" className="h-1 w-4/5" />}
        </Link>
      ))}
    </div>
  );
}
