"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,  } from '@/components/ui/dialog';

interface ModalProps {
  body : React.ReactElement
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
}) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='overflow-y-auto h-auto'>
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
          </DialogHeader>
          <div className="py-2">{body}</div>
          <div className='py-2'>
            {footer}
          </div>
        </DialogContent>
      </Dialog>
    );
};

export default Modal;
