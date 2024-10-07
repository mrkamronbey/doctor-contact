import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai'; // Import the tick icon from Ant Design

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description }) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="max-w-sm rounded bg-white p-6">
                    <DialogTitle className="text-lg font-bold flex items-center">
                        <AiOutlineCheckCircle className="w-6 h-6 text-green-500 mr-2" />
                        {title}
                    </DialogTitle>
                    <p className="mt-2">
                        {description}
                    </p>
                </DialogPanel>
            </div>
        </Dialog>
    );
};
