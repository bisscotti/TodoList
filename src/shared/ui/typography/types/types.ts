import type { TColors, TVariants } from "@shared/types/types";

export type TTypographyProps = {
  color: TColors;
  variant: TVariants;
  TIsUpper?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};