import type { TColors, TVariants } from "@shared/types/types";

export type TCustomButtonProps = {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  pressed?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isTextBtn?: boolean;
  TColor?: TColors;
  TIsUpper?: boolean;
  TVariant?: TVariants;
};