import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full text-xl px-3 py-2 ring-offset-transparent bg-[#2f3434] text-right rounded-xl',
        'file:font-medium file:text-slate-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        'dark:file:text-slate-50 file:border-0 file:bg-transparent file:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
