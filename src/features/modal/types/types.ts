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