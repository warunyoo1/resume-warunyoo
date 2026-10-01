import type { BrandProps } from '@/types/components';
import { cn } from '@/lib/utils';

export function Brand({ className }: BrandProps) {
  return (
    <span className={cn('brand-symbol', className)} aria-hidden="true">
      <span />
    </span>
  );
}
