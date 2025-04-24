interface DeleteAlertProps {
    content: string;
    onDelete: () => void;
}
const DeleteAlert = (props: DeleteAlertProps) => {
    const { content, onDelete } = props;
    return (
        <div>
            <p className="text-sm">{content}</p>
            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;
