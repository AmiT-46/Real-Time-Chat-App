import { useState } from "react";
import { useAuthStore } from "../../zustand/useAuthStore";
import useDeleteMessage from "../../hooks/useDeleteMessage";
import useEditMessage from "../../hooks/useEditMessage";
import { MdEdit, MdDeleteOutline } from "react-icons/md"; // Ensure you have react-icons installed

const Message = ({ message }) => {
    const { authUser } = useAuthStore();
    const { deleteMessage, loading: isDeleting } = useDeleteMessage();
    const { editMessage, loading: isEditingText } = useEditMessage();

    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(message.message);

    const fromMe = message.senderId === authUser._id;
    const isDeleted = message.message === "🚫 This message was deleted";

    const chatClassName = fromMe ? 'flex justify-end' : 'flex justify-start';
    
    // Change bubble style if it was deleted
    const bubbleColorClass = isDeleted 
        ? 'bg-gray-800 text-gray-500 italic border border-gray-700' 
        : fromMe 
            ? 'bubble-sent' 
            : 'bubble-received';

    const handleDelete = async () => {
        const confirm = window.confirm("Delete this message for everyone?");
        if (confirm) await deleteMessage(message._id);
    };

    const handleSaveEdit = async () => {
        if (editValue.trim() === message.message) {
            setIsEditing(false); // Close if nothing changed
            return;
        }
        await editMessage(message._id, editValue);
        setIsEditing(false);
    };

    return (
        <div className={`mb-4 ${chatClassName} group relative flex items-center`}>
            
            {/* Action Buttons: Only show on hover (group-hover), if it's my message, not deleted, and not currently editing */}
            {fromMe && !isDeleted && !isEditing && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center mx-2 gap-2 text-gray-400">
                    <button onClick={() => setIsEditing(true)} className="hover:text-blue-400 transition-colors" title="Edit">
                        <MdEdit size={18} />
                    </button>
                    <button onClick={handleDelete} disabled={isDeleting} className="hover:text-red-500 transition-colors" title="Delete">
                        <MdDeleteOutline size={18} />
                    </button>
                </div>
            )}

            {/* Chat Bubble */}
            <div className={`px-4 py-2 max-w-[75%] rounded-2xl shadow-sm ${bubbleColorClass}`}>
                {isEditing ? (
                    // Edit Mode UI
                    <div className="flex flex-col gap-2 min-w-[200px]">
                        <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full bg-blue-700/50 text-white placeholder-gray-300 p-2 rounded focus:outline-none resize-none no-scrollbar"
                            rows={2}
                            autoFocus
                        />
                        <div className="flex justify-end gap-3 text-xs mt-1">
                            <button onClick={() => setIsEditing(false)} className="text-gray-300 hover:text-white transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleSaveEdit} disabled={isEditingText} className="bg-white text-blue-600 px-3 py-1 rounded font-bold hover:bg-gray-200 transition-colors">
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    // Normal Display UI
                    <p className='text-sm whitespace-pre-wrap'>{message.message}</p>
                )}
            </div>
        </div>
    );
};

export default Message;