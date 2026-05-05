'use client';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  transactionId: string;
}
const DeleteTransactionDialog = ({ open, setOpen, transactionId }: Props) => {
  return <div>DeleteTransactionDialog</div>;
};

export default DeleteTransactionDialog;
