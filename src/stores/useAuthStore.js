import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    login: (email, password) => {
        // ---------------------------------------------------------
        // DEMO MODE: Any non-empty email/password combination works
        // ---------------------------------------------------------

        // Check for "admin" specific demo to give elevated privileges (optional)
        const isAdmin = email.includes('admin');

        if (!email || !password) {
            return { success: false, error: "Please enter both email and password." };
        }

        set({
            user: {
                name: email.split('@')[0],
                email,
                level: isAdmin ? 99 : 12,
                streak: 5,
                role: isAdmin ? 'admin' : 'student'
            },
            isAuthenticated: true
        });

        return { success: true };
    },
    logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;
