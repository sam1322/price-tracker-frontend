// stores/authStore.ts
import apiClient from '@/constants/apiClient';
import { generateFingerprint } from '@/lib/fingerprint';
import axios from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


export interface User {
    id: string;
    email?: string;
    name?: string;
    isGuest: boolean;
    guestId?: string;
    createdAt: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    isInitialized: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    createGuestSession: () => Promise<void>;
    convertGuestToUser: (userData: { email: string; password: string; name?: string }) => Promise<void>;
    login: ({ email, password }: { email: string, password: string }) => Promise<void>;
    register: ({ email, password, name }: { email: string, password: string, name: string }) => Promise<void>;
    logOut: () => Promise<void>;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            loading: false,
            isInitialized: false,

            setUser: (user) => set({ user }),

            setLoading: (loading) => set({ loading }),

            initialize: async () => {
                if (get().isInitialized) return;

                set({ loading: true });

                try {
                    // First check if user is already authenticated
                    const authCheck = await checkExistingAuth();
                    if (authCheck) {
                        set({ user: authCheck });
                    }
                    // else {
                    //     // If not authenticated, create guest session
                    //     await get().createGuestSession();
                    // }
                } catch (error) {
                    console.error('Failed to initialize auth:', error);
                } finally {
                    set({ loading: false, isInitialized: true });
                }
            },

            createGuestSession: async () => {
                const { user } = get();
                if (user) return; // Already have a user

                try {
                    const fingerprint = await generateFingerprint();

                    const { data } = await apiClient.post('/auth/guest', { fingerprint });
                    console.log("guest data", data)
                    set({ user: data.user })

                } catch (error) {
                    console.error('Failed to create guest session:', error);
                    // Fallback to basic guest session
                    if (axios.isAxiosError(error)) {
                        console.error('Axios error occurred:', error?.response?.data);
                        throw error
                    } else {
                        await createBasicGuestSession(set);
                    }
                }
            },

            convertGuestToUser: async (userData) => {
                const { user } = get();
                if (!user?.isGuest) {
                    throw new Error('User is not a guest');
                }

                try {
                    const { data } = await apiClient.post('/auth/guest/convert', userData);
                    set({ user: data });

                } catch (error) {
                    console.error('Failed to convert guest:', error);
                    throw error;
                }
            },

            login: async ({ email, password }) => {
                set({ loading: true });
                try {
                    const { data } = await apiClient.post("/auth/login", { email, password });
                    set({ user: data.user })
                } catch (error) {
                    console.error('Login failed:', error);
                    throw error;
                } finally {
                    set({ loading: false });
                }
            },


            register: async ({ email, password, name }) => {
                set({ loading: true });
                try {
                    const { data } = await apiClient.post("/auth/register", { email, name, password });
                    set({ user: data.user })
                } catch (error) {
                    console.error('Login failed:', error);
                    throw error;
                } finally {
                    set({ loading: false });
                }
            },

            logOut: async () => {
                try {
                    await apiClient.post('/auth/logout', {});
                } catch (error) {
                    console.error('Logout failed:', error);
                } finally {
                    set({ user: null });
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for auth state
            partialize: (state) => ({
                user: state.user,
                isInitialized: state.isInitialized
            }),
        }
    )
);

// Helper functions
const checkExistingAuth = async (): Promise<User | null> => {
    try {
        const { data } = await apiClient.get("/auth/me")
        return data
    } catch (error) {
        console.error('Auth check failed:', error);
    }
    return null;
};

const createBasicGuestSession = async (set: any) => {
    try {
        const basicFingerprint = `basic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const { data } = await apiClient.post("/auth/guest", { fingerprint: basicFingerprint })

        set({ user: data.user });
    } catch (error) {
        console.error('Failed to create basic guest session:', error);
    }
};