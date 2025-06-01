export type TNoteItemProps = {
  text: string;
  completed: boolean;
  onStatusChange: (bool: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
  deadline?: Date;
}