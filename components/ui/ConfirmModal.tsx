'use client';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';

type Props = {
  onConfirm: () => void;
};

export default function ConfirmModal({ onConfirm }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded"
      >
        Finish Test
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">Are you sure?</Dialog.Title>
            <p className="mb-6">You’re about to finish the test. Are you sure you want to proceed?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  setIsOpen(false);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, finish
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
