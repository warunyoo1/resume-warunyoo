import { Slot } from '@radix-ui/react-slot';
import { buttonVariants } from '@/lib/button-variants';
import type { ButtonProps } from '@/types/ui';
import { cn } from '@/lib/utils';

export function Button({ className, variant, asChild = false, type, ...props }: ButtonProps) {
  const Component = asChild ? Slot : 'button';
  return (
    <Component
      data-slot="button"
      type={asChild ? undefined : (type ?? 'button')}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}
