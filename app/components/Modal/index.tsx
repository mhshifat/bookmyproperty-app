"use client";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io';
import { Button } from "..";

interface ModalProps {
  title?: string;
  isOpen?: boolean;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function Modal({
  title,
  isOpen,
  body,
  footer,
  actionLabel,
  secondaryActionLabel,
  disabled,
  secondaryAction,
  onClose,
  onSubmit,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(onClose, 300);
  }, [disabled, onClose])
  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit])
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction])
  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  if (!isOpen) return null;
  return (
    <>
      <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>

              <div className="relative p-6 flex-auto">
                {body}
              </div>

              <div className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button outline onClick={handleSecondaryAction} disabled={disabled}>{secondaryActionLabel}</Button>
                  )}
                  <Button onClick={handleSubmit} disabled={disabled}>{actionLabel}</Button>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}