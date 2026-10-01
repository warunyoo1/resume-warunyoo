import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-neutral-200',
        glass: 'liquid-glass text-foreground hover:bg-white/10',
        ghost: 'text-foreground hover:bg-white/10',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);
