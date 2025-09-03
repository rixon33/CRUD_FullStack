type ConfirmDialogProps = {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export const ConfirmDialog = ({
    message,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) => {
    return (
        <div
            onClick={onCancel}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 text-center"
            >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Confirmación
                </h3>
                <p className="text-gray-700 mb-6">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};
