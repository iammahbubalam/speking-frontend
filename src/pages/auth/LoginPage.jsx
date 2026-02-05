import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import { Loader2, AlertCircle, ArrowRight, Zap } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('demo@speking.com');
    const [password, setPassword] = useState('demo123');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const location = useLocation();
    const isRegister = location.pathname.includes('register');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            const result = login(email, password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error || 'Invalid credentials');
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-[400px] w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white font-bold text-xl mb-4">
                        S
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {isRegister ? 'Create Account' : 'Welcome back'}
                    </h1>
                    <p className="text-slate-500 text-sm mt-2">
                        {isRegister ? 'Start your fluency journey today.' : 'Please enter your details to sign in.'}
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2 border border-red-100">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {isRegister && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                            <input id="name" name="name" type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" placeholder="E.g. Alex Doe" />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                                Remember me
                            </label>
                        </div>

                        {!isRegister && (
                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot password?
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="grid gap-4">
                        <button
                            type="button"
                            onClick={() => { login('demo@speking.com', 'demo123'); navigate('/dashboard'); }}
                            className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg shadow-sm text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all gap-2"
                        >
                            <Zap size={16} fill="currentColor" /> Instant Demo Login
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={18} /> : (isRegister ? 'Create account' : 'Sign in')}
                            {!isLoading && <ArrowRight size={16} />}
                        </button>
                    </div>

                    <div className="mt-8 text-center text-sm text-slate-500">
                        {isRegister ? (
                            <span>Already have an account? <a href="/auth/login" className="font-bold text-blue-600 hover:underline">Log in</a></span>
                        ) : (
                            <span>Don't have an account? <a href="/auth/register" className="font-bold text-blue-600 hover:underline">Sign up</a></span>
                        )}
                    </div>
                </form>
            </div>

            <div className="fixed bottom-4 text-center w-full text-xs text-slate-400">
                &copy; 2024 Speking. Enterprise Edition.
            </div>
        </div>
    );
};

export default LoginPage;
