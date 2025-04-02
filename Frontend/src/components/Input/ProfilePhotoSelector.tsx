import { ChangeEvent, useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';
interface ProfilePhotoSelectorProps {
    image: File | null;
    setImage: (image: File | null) => void;
}
const ProfilePhotoSelector = (props: ProfilePhotoSelectorProps) => {
    const { image, setImage } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file, previewUrl);
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        console.log(image, previewUrl);
    };

    const onChooseFile = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className="mb-6 flex justify-center">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={inputRef}
            />
            {!image ? (
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
                    <LuUser className="text-primary text-4xl" />
                    <button
                        type="button"
                        className="bg-primary absolute -right-1 -bottom-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white"
                        onClick={onChooseFile}
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={previewUrl || ''}
                        alt="Profile Photo"
                        className="h-20 w-20 rounded-full object-cover"
                    />
                    <button
                        type="button"
                        className="absolute -right-1 -bottom-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white"
                        onClick={handleRemoveImage}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
