import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, CheckCircle2, Shield, Mail, Building2, User,
    ArrowRight, Sparkles, RefreshCw, Home, AlertCircle,
    ChevronDown, ChevronUp, Send, Inbox, XCircle, Calendar, LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES, USER_STATUS } from '../utils/constants';
import { getStoredEmails, clearStoredEmails } from '../services/emailService';

function AnimatedBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
            <motion.div
                className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-200/10 rounded-full blur-[100px]"
                animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[80px]"
                animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    );
}

function Card({ children, className = '', delay = 0 }) {
    return (
        <motion.div
            className={`bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}

function ProgressStep({ step, title, description, status, isLast }) {
    const isCompleted = status === 'completed';
    const isCurrent = status === 'current';

    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? 'bg-emerald-500' : isCurrent ? 'bg-brand-200' : 'bg-slate-200'}`}
                    animate={isCurrent ? { boxShadow: ['0 0 0 0 rgba(14,165,233,0.3)', '0 0 0 15px rgba(14,165,233,0)'] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6 text-white" /> : isCurrent ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                            <RefreshCw className="w-5 h-5 text-white" />
                        </motion.div>
                    ) : <span className="text-slate-400 font-semibold">{step}</span>}
                </motion.div>
                {!isLast && <div className={`w-0.5 h-16 mt-2 ${isCompleted ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
            </div>
            <div className="flex-1 pb-6">
                <div className="flex items-center gap-3">
                    <h3 className={`text-lg font-semibold ${status === 'pending' ? 'text-slate-400' : 'text-slate-800'}`}>{title}</h3>
                    {isCurrent && <span className="px-3 py-1 bg-brand-100/10 text-brand-200 text-xs font-semibold rounded-full">In Progress</span>}
                </div>
                <p className={`mt-1 text-sm ${status === 'pending' ? 'text-slate-400' : 'text-slate-600'}`}>{description}</p>
            </div>
        </div>
    );
}

function InfoItem({ icon: Icon, label, value, color = 'brand' }) {
    const colors = { brand: 'bg-brand-100/10 border-brand-200/20', emerald: 'bg-emerald-50 border-emerald-200', amber: 'bg-amber-50 border-amber-200' };
    const iconColors = { brand: 'text-brand-200', emerald: 'text-emerald-600', amber: 'text-amber-600' };
    return (
        <div className={`flex items-center gap-4 p-4 rounded-xl ${colors[color]} border`}>
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm"><Icon className={`w-5 h-5 ${iconColors[color]}`} /></div>
            <div><p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p><p className="text-sm font-semibold text-slate-800">{value}</p></div>
        </div>
    );
}

function EmailCard({ email, index }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <button onClick={() => setExpanded(!expanded)} className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    {email.template?.includes('APPROVED') ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Send className="w-5 h-5 text-brand-200" />}
                </div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-800 truncate">{email.subject}</p><p className="text-xs text-slate-500 truncate">To: {email.to}</p></div>
                {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            <AnimatePresence>
                {expanded && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="border-t border-slate-200 overflow-hidden">
                        <div className="p-4 bg-slate-50 max-h-60 overflow-y-auto text-slate-700 text-sm" dangerouslySetInnerHTML={{ __html: email.body }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function PendingVerificationPage({ onNavigateToHome }) {
    const { user, simulatePlatformApproval, logout } = useAuth();
    const [emails, setEmails] = useState([]);
    const [showEmails, setShowEmails] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);

    useEffect(() => { setEmails(getStoredEmails()); }, []);
    const refreshEmails = () => setEmails(getStoredEmails());

    const getStatusContent = () => {
        if (!user) return { title: 'Loading...', description: '', icon: Clock, step: 1 };
        switch (user.status) {
            case USER_STATUS.PENDING_PLATFORM_VERIFICATION: return { title: 'Platform Verification in Progress', description: 'Our team is reviewing your college credentials. This usually takes 24-48 hours.', icon: Shield, step: 1 };
            case USER_STATUS.PENDING_ADMIN_APPROVAL: return { title: 'Awaiting College Admin Approval', description: 'Your college administrator will review and approve your account.', icon: Building2, step: 2 };
            case USER_STATUS.ACTIVE: return { title: 'Account Verified!', description: 'Your account is now active.', icon: CheckCircle2, step: 3 };
            default: return { title: 'Processing', description: 'Your account is being processed.', icon: Clock, step: 1 };
        }
    };

    const statusContent = getStatusContent();
    const steps = [{ step: 1, title: 'Platform Verification', description: 'Our team reviews your college ID and verifies your credentials.' }, { step: 2, title: 'Account Activation', description: 'Full access to all GoPass admin features!' }];
    const getStepStatus = (stepNumber) => { if (user?.status === USER_STATUS.ACTIVE) return 'completed'; if (stepNumber < statusContent.step) return 'completed'; if (stepNumber === statusContent.step) return 'current'; return 'pending'; };

    const handleSimulatePlatform = async () => { setIsSimulating(true); await new Promise(r => setTimeout(r, 1500)); simulatePlatformApproval?.(); refreshEmails(); setIsSimulating(false); };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Floating action buttons */}
                <div className="absolute top-6 right-6 flex items-center gap-3">
                    <motion.button onClick={() => { setShowEmails(!showEmails); refreshEmails(); }} className="relative p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Inbox className="w-5 h-5 text-slate-600" />
                        {emails.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-200 text-white text-xs rounded-full flex items-center justify-center">{emails.length}</span>}
                    </motion.button>
                    <motion.button onClick={onNavigateToHome} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Home className="w-5 h-5 text-slate-600" /></motion.button>
                    <motion.button onClick={logout} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-red-50 hover:border-red-200 transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><LogOut className="w-5 h-5 text-slate-600" /></motion.button>
                </div>

                <main className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-5xl">
                        {/* Logo */}
                        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="inline-flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-brand-300 flex items-center justify-center shadow-lg shadow-brand-200/30"><Sparkles className="w-6 h-6 text-white" /></div>
                                <span className="text-3xl font-bold text-slate-900 font-serif">GoPass</span>
                            </div>
                        </motion.div>

                        <div className="grid lg:grid-cols-5 gap-6">
                            {/* Main card */}
                            <div className="lg:col-span-3">
                                <Card className="overflow-hidden" delay={0.1}>
                                    <div className="p-6 bg-gradient-to-r from-brand-200 to-brand-300">
                                        <div className="flex items-center gap-4">
                                            <motion.div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                                                <statusContent.icon className="w-8 h-8 text-white" />
                                            </motion.div>
                                            <div><h1 className="text-2xl font-bold text-white">{statusContent.title}</h1><p className="text-white/80 mt-1">{statusContent.description}</p></div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-brand-200" />Verification Progress</h2>
                                        {steps.map((step, index) => <ProgressStep key={step.step} {...step} status={getStepStatus(step.step)} isLast={index === steps.length - 1} />)}
                                    </div>
                                    {process.env.NODE_ENV !== 'production' && user?.status === USER_STATUS.PENDING_PLATFORM_VERIFICATION && (
                                        <div className="p-5 bg-amber-50 border-t border-amber-200">
                                            <div className="flex items-center gap-2 mb-3"><AlertCircle className="w-4 h-4 text-amber-600" /><span className="text-sm font-medium text-amber-800">Development Mode</span></div>
                                            <motion.button onClick={handleSimulatePlatform} disabled={isSimulating} className="px-4 py-2.5 bg-brand-200 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-brand-100 disabled:opacity-50" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}Simulate Platform Approval
                                            </motion.button>
                                        </div>
                                    )}
                                    {user?.status === USER_STATUS.ACTIVE && (
                                        <div className="p-5 border-t border-slate-200">
                                            <motion.button className="w-full py-3 bg-gradient-to-r from-brand-200 to-brand-300 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-200/30" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>Go to Dashboard <ArrowRight className="w-5 h-5" /></motion.button>
                                        </div>
                                    )}
                                </Card>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-2 space-y-5">
                                {user && (
                                    <Card className="p-5" delay={0.2}>
                                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Your Details</h3>
                                        <div className="space-y-3">
                                            <InfoItem icon={User} label="Full Name" value={user.fullName} />
                                            <InfoItem icon={Mail} label="Email" value={user.email} />
                                            <InfoItem icon={Building2} label="Role" value={user.role} color={user.role === ROLES.ADMIN ? 'amber' : 'brand'} />
                                            {user.college && <InfoItem icon={Building2} label="College" value={user.college.name} color="emerald" />}
                                        </div>
                                    </Card>
                                )}
                                <Card className="p-5 bg-gradient-to-br from-brand-100 to-brand-200 border-0" delay={0.3}>
                                    <div className="flex items-center gap-3 mb-4"><Calendar className="w-5 h-5 text-white" /><h3 className="text-lg font-semibold text-white">Estimated Time</h3></div>
                                    <p className="text-white/80 text-sm mb-4">Platform verification typically takes:</p>
                                    <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center"><div className="text-4xl font-bold text-white">24-48</div><div className="text-white/80 text-sm">Hours</div></div>
                                </Card>
                                <Card className="p-5" delay={0.4}>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Need Help?</h3>
                                    <p className="text-sm text-slate-600 mb-4">Contact our support team for any questions.</p>
                                    <a href="mailto:support@gopass.com" className="text-sm font-medium text-brand-200 hover:text-brand-100 flex items-center gap-2"><Mail className="w-4 h-4" /> support@gopass.com</a>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Email Sidebar */}
            <AnimatePresence>
                {showEmails && (
                    <>
                        <motion.div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowEmails(false)} />
                        <motion.div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}>
                            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-brand-100/10 flex items-center justify-center"><Inbox className="w-5 h-5 text-brand-200" /></div><div><h3 className="font-semibold text-slate-800">Email Inbox</h3><p className="text-xs text-slate-500">{emails.length} emails</p></div></div>
                                <div className="flex items-center gap-2">
                                    {emails.length > 0 && <button onClick={() => { clearStoredEmails(); setEmails([]); }} className="p-2 text-slate-400 hover:text-red-500"><XCircle className="w-5 h-5" /></button>}
                                    <button onClick={() => setShowEmails(false)} className="p-2 text-slate-400 hover:text-slate-600"><ArrowRight className="w-5 h-5" /></button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                                {emails.length === 0 ? <div className="text-center py-12"><Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" /><p className="text-slate-500">No emails yet</p></div> : emails.map((email, index) => <EmailCard key={email.id} email={email} index={index} />)}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
