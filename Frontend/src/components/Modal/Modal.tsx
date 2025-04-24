import { RxCross2 } from 'react-icons/rx';
import { ModalProps } from '../../Types';

const Modal = (props: ModalProps) => {
    const { isOpen, onClose, title, children } = props;
    if (!isOpen) return null;
    return (
        <div className="bg-opacity-50 fixed top-0 right-0 left-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50">
            <div className="relative max-h-full w-full max-w-2xl p-4">
                <div className="rounded-lg bg-white shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <button
                            type="button"
                            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <RxCross2 className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="space-y-4 p-4 md:p-5">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
