'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

export type HeaderActionProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: React.ReactNode;
    label?: React.ReactNode;
  };

export function HeaderAction({
  icon,
  label,
  className,
  type = 'button',
  ...props
}: HeaderActionProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:min-h-0 sm:min-w-0 sm:px-2 sm:py-1.5 sm:text-sm',
        className,
      )}
      {...props}
    >
      {icon}
      {label ? <span className='hidden sm:inline'>{label}</span> : null}
    </button>
  );
}

export type HeaderActionLinkProps = {
  href: React.ComponentProps<typeof Link>['href'];
  icon: React.ReactNode;
  label?: React.ReactNode;
  className?: string;
};

export function HeaderActionLink({
  href,
  icon,
  label,
  className,
}: HeaderActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:min-h-0 sm:min-w-0 sm:px-2 sm:py-1.5 sm:text-sm',
        className,
      )}
    >
      {icon}
      {label ? <span className='hidden sm:inline'>{label}</span> : null}
    </Link>
  );
}
