import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import { Loader2, AlertCircle, ArrowRight, Zap, Check, Star } from 'lucide-react';

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
        <div className="min-h-screen flex font-sans bg-white">
            {/* Left Side - Visual & Testimonial */}
            <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden flex-col justify-between p-12 text-white">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-900 z-0"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-lg border border-white/20">
                            S
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Speking.</span>
                    </div>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h2 className="text-4xl font-extrabold mb-6 leading-tight">
                        Master English fluency with AI-driven practice.
                    </h2>
                    <div className="space-y-4 mb-12">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500/50 flex items-center justify-center"><Check size={14} /></div>
                            <span className="text-blue-100 font-medium">Real-time pronunciation feedback</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500/50 flex items-center justify-center"><Check size={14} /></div>
                            <span className="text-blue-100 font-medium">IELTS & PTE Mock Simulations</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500/50 flex items-center justify-center"><Check size={14} /></div>
                            <span className="text-blue-100 font-medium">Adaptive learning path</span>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <div className="flex gap-1 text-amber-400 mb-3">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                        </div>
                        <p className="text-lg font-medium mb-4">"The mock tests are incredibly realistic. I boosted my IELTS score from 6.0 to 7.5 in just 3 weeks!"</p>
                        <div className="flex items-center gap-3">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" className="w-10 h-10 rounded-full border-2 border-white/50" alt="User" />
                            <div>
                                <div className="font-bold">Sarah Jenkins</div>
                                <div className="text-sm text-blue-200">University Student</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-blue-200">
                    © 2024 Speking Inc.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 lg:bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tighter">
                            {isRegister ? 'Create an account' : 'Welcome back'}
                        </h2>
                        <p className="mt-2 text-slate-500">
                            {isRegister ? 'Start your 7-day free trial today.' : 'Enter your credentials to access your account.'}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            type="button"
                            onClick={() => { login('demo@speking.com', 'demo123'); navigate('/dashboard'); }}
                            className="w-full flex justify-center items-center py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-all gap-3 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Zap size={18} className="text-amber-500 relative z-10" fill="currentColor" />
                            <span className="relative z-10">Instant Demo Login</span>
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-50 lg:bg-white text-slate-500">Or continue with email</span>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl flex items-center gap-3 border border-red-100 animate-in slide-in-from-top-2">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            {isRegister && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                    <input id="name" name="name" type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" placeholder="John Doe" />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    placeholder="name@company.com"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="block text-sm font-medium text-slate-700">Password</label>
                                    {!isRegister && <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-500">Forgot password?</a>}
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed gap-2 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isRegister ? 'Create Account' : 'Sign In')}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="text-center text-sm">
                        {isRegister ? (
                            <span className="text-slate-500">Already have an account? <a href="/auth/login" className="font-bold text-blue-600 hover:text-blue-500">Log in</a></span>
                        ) : (
                            <span className="text-slate-500">Don't have an account? <a href="/auth/register" className="font-bold text-blue-600 hover:text-blue-500">Sign up</a></span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
