import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { LuImage, LuX } from 'react-icons/lu';

interface EmojiPickerPopupProps {
    icon: string;
    onSelect: (emoji: string) => void;
}
const EmojiPickerPopup = (props: EmojiPickerPopupProps) => {
    const { onSelect, icon } = props;
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="mb-6 flex flex-col items-start gap-5 md:flex-row">
            <div
                className="flex cursor-pointer items-center gap-4"
                onClick={() => setIsOpen(true)}
            >
                <div className="text-primary flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-2xl">
                    {icon ? (
                        <img
                            src={icon}
                            alt={icon}
                            title={icon}
                            className="h-12 w-12"
                        />
                    ) : (
                        <LuImage />
                    )}
                </div>
                <p className="">{icon ? 'Change Icon' : 'Pick Icon'}</p>
            </div>
            {isOpen && (
                <div className="relative">
                    <button
                        className="absolute -top-2 -right-2 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white"
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX />
                    </button>
                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={(emoji) => onSelect(emoji?.imageUrl)}
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;
