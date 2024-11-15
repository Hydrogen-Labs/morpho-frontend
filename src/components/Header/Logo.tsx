'use client';

import logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      {/* TODO: change logo alt */}
      <Image src={logo} alt="logo" width={48} height={48} />
    </Link>
  );
}
