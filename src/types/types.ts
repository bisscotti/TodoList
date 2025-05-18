import type { ReactNode } from 'react';

export type TIconProps = {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
};


export type TColors = 'textColor' | 'white' | 'purple' | 'red';

export type TCustomInputProps = {
  placeholder?: string;
  checked?: boolean;
  iconSearch?: boolean;
  className?: string;
  value?: string;
  type: 'text' | 'checkbox' | 'datetime-local';
  onChange?: () => void;
  onChangeText?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDate?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | boolean;
};
export type TNoteItemProps = {
  text: string;
  completed: boolean;
  onStatusChange: (bool: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
  deadline?: Date;
}

export type THeaderProps = {
  theme: 'light' | 'dark';
  setTheme: (v: 'light' | 'dark') => void;
};

export type TCustomButtonProps = {
  variant: 'primary' | 'secondary';
  children: ReactNode;
  pressed?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isTextBtn?: boolean;
  TColor?: TColors;
  TIsUpper?: boolean;
  TVariant?: TVariants;
};

export type TVariants = 'h1' | 'bodyText' | 'smallBodyText';

export type TTypographyProps = {
  color: TColors;
  variant: TVariants;
  TIsUpper?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export type TMultiContainerProps = {
  children: ReactNode;
  className?: string;
}
export type TModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  className?: string;
  inputTitle?: string;
  inputDesc?: string;
  setInputTitle?: (v: string) => void;
  setInputDesc?: (v: string) => void;
  onApply?: () => void;
  createdAt?: number;
  deadline?: Date;
  setDeadline?: (v?: Date) => void;
}