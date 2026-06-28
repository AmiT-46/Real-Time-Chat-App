import { useState } from "react";
import { useAuthStore } from "../../zustand/useAuthStore";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import useDeleteProfile from "../../hooks/useDeleteProfile";
import useChangePassword from "../../hooks/useChangePassword"; // 1. Import new hook
import useLogout from "../../hooks/useLogout";
import { IoClose } from "react-icons/io5";

const ProfileModal = ({ isOpen, onClose }) => {
    const { authUser } = useAuthStore();
    const { updateProfile, loading: updating } = useUpdateProfile();
    const { deleteProfile, loading: deleting } = useDeleteProfile();
    const { changePassword, loading: changingPwd } = useChangePassword(); // 2. Init hook
    const { logout } = useLogout();

    const [fullName, setFullName] = useState(authUser?.fullName || "");
    const [username, setUsername] = useState(authUser?.username || "");
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

    // Password States
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    if (!isOpen) return null;

    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        await updateProfile(fullName, username);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const success = await changePassword(passwords.current, passwords.new, passwords.confirm);
        if (success) {
            // Clear the password fields if successful
            setPasswords({ current: "", new: "", confirm: "" });
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            {/* Added max-h-[90vh] and overflow-y-auto so it scrolls nicely if the screen is small */}
            <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 relative max-h-[90vh] overflow-y-auto no-scrollbar">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <IoClose size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6 text-center">My Profile</h2>

                {!isConfirmingDelete ? (
                    <>
                        {/* 1. Update Info Form */}
                        <form onSubmit={handleUpdateInfo} className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
                                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full theme-input p-3" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full theme-input p-3" />
                            </div>
                            <button type="submit" disabled={updating} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-50">
                                {updating ? "Saving..." : "Update Profile Info"}
                            </button>
                        </form>

                        <div className="divider my-6 bg-gray-700 h-[1px]"></div>

                        {/* 2. Change Password Form */}
                        <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
                            <h3 className="text-white font-semibold">Change Password</h3>
                            <input 
                                type="password" placeholder="Current Password" 
                                value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} 
                                className="w-full theme-input p-3" 
                            />
                            <input 
                                type="password" placeholder="New Password" 
                                value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} 
                                className="w-full theme-input p-3" 
                            />
                            <input 
                                type="password" placeholder="Confirm New Password" 
                                value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} 
                                className="w-full theme-input p-3" 
                            />
                            <button type="submit" disabled={changingPwd} className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-50 border border-gray-600">
                                {changingPwd ? "Updating..." : "Change Password"}
                            </button>
                        </form>

                        <div className="divider my-6 bg-gray-700 h-[1px]"></div>

                        {/* 3. Danger Zone */}
                        <div className="flex justify-between items-center">
                            <button onClick={logout} className="text-gray-400 hover:text-white font-medium transition-colors">
                                Logout
                            </button>
                            <button onClick={() => setIsConfirmingDelete(true)} className="text-red-500 hover:text-red-400 font-medium transition-colors">
                                Delete Account
                            </button>
                        </div>
                    </>
                ) : (
                    /* Danger Zone Confirmation remains the same */
                    <div className="text-center">
                        <h3 className="text-xl text-red-500 font-bold mb-3">Are you absolutely sure?</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            This action cannot be undone. All your messages and data will be permanently wiped.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button onClick={() => setIsConfirmingDelete(false)} className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">Cancel</button>
                            <button onClick={deleteProfile} disabled={deleting} className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition-colors disabled:opacity-50">
                                {deleting ? "Deleting..." : "Yes, Delete Everything"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileModal;