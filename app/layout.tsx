import type { ReactNode } from 'react';

import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning className='h-full'>
      <body className='min-h-full'>{children}</body>
    </html>
  );
}
