
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