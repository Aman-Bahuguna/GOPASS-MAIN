import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings,
    Shield,
    Bell,
    Lock,
    Eye,
    EyeOff,
    Mail,
    Smartphone,
    Globe,
    Moon,
    Sun,
    Palette,
    Key,
    AlertTriangle,
    CheckCircle2,
    ChevronRight,
    LogOut,
    Trash2,
    Download,
    HelpCircle,
    MessageSquare,
    FileText,
    Building2,
    Users,
    Calendar,
    ToggleLeft,
    ToggleRight,
    Fingerprint,
    History,
    Zap,
    Volume2,
    VolumeX
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';

// Toggle Switch Component
function ToggleSwitch({ enabled, onToggle, disabled = false }) {
    return (
        <motion.button
            onClick={() => !disabled && onToggle(!enabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } ${enabled ? 'bg-brand-200' : 'bg-slate-300'}`}
            whileTap={!disabled ? { scale: 0.95 } : {}}
        >
            <motion.div
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                animate={{ x: enabled ? 26 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
        </motion.button>
    );
}

// Settings Section Component
function SettingsSection({ title, description, icon: Icon, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden"
        >
            <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900">{title}</h3>
                        {description && <p className="text-sm text-slate-500">{description}</p>}
                    </div>
                </div>
            </div>
            <div className="divide-y divide-slate-100">
                {children}
            </div>
        </motion.div>
    );
}

// Settings Item Component
function SettingsItem({ icon: Icon, label, description, action, onClick, danger = false }) {
    return (
        <motion.div
            className={`p-4 hover:bg-slate-50 transition-colors ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
            whileHover={onClick ? { x: 4 } : {}}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${danger ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <p className={`font-medium ${danger ? 'text-red-600' : 'text-slate-900'}`}>{label}</p>
                        {description && <p className="text-sm text-slate-500">{description}</p>}
                    </div>
                </div>
                {action || (onClick && <ChevronRight className="w-5 h-5 text-slate-400" />)}
            </div>
        </motion.div>
    );
}

// Password Change Modal
function PasswordModal({ isOpen, onClose }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSuccess(true);
        setTimeout(() => {
            onClose();
            setSuccess(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }, 1500);
        setIsLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                            {success ? (
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                    >
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-slate-900">Password Updated!</h3>
                                    <p className="text-slate-500 mt-2">Your password has been changed successfully.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                                            <Key className="w-6 h-6 text-brand-300" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">Change Password</h3>
                                            <p className="text-sm text-slate-500">Enter your current and new password</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPasswords ? 'text' : 'password'}
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-200"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                            <input
                                                type={showPasswords ? 'text' : 'password'}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-200"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPasswords ? 'text' : 'password'}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-200"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswords(!showPasswords)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                                >
                                                    {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="flex-1 py-3 px-4 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="flex-1 py-3 px-4 bg-gradient-to-r from-brand-200 to-brand-300 text-white rounded-xl font-medium shadow-lg shadow-brand-200/30 disabled:opacity-50"
                                            >
                                                {isLoading ? 'Updating...' : 'Update Password'}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// User-specific Settings
function UserSettings({ settings, setSettings }) {
    return (
        <>
            <SettingsSection title="Event Preferences" description="Customize your event experience" icon={Calendar}>
                <SettingsItem
                    icon={Bell}
                    label="Event Reminders"
                    description="Get notified before your registered events"
                    action={
                        <ToggleSwitch
                            enabled={settings.eventReminders}
                            onToggle={(val) => setSettings({ ...settings, eventReminders: val })}
                        />
                    }
                />
                <SettingsItem
                    icon={Zap}
                    label="Recommended Events"
                    description="Receive personalized event suggestions"
                    action={
                        <ToggleSwitch
                            enabled={settings.recommendations}
                            onToggle={(val) => setSettings({ ...settings, recommendations: val })}
                        />
                    }
                />
                <SettingsItem
                    icon={Download}
                    label="Ticket Downloads"
                    description="Automatically download tickets after registration"
                    action={
                        <ToggleSwitch
                            enabled={settings.autoDownload}
                            onToggle={(val) => setSettings({ ...settings, autoDownload: val })}
                        />
                    }
                />
            </SettingsSection>
        </>
    );
}

// Organizer-specific Settings
function OrganizerSettings({ settings, setSettings }) {
    return (
        <>
            <SettingsSection title="Event Management" description="Configure event creation settings" icon={Calendar}>
                <SettingsItem
                    icon={Bell}
                    label="Registration Alerts"
                    description="Get notified when someone registers for your event"
                    action={
                        <ToggleSwitch
                            enabled={settings.registrationAlerts}
                            onToggle={(val) => setSettings({ ...settings, registrationAlerts: val })}
                        />
                    }
                />
                <SettingsItem
                    icon={Users}
                    label="Attendee Updates"
                    description="Receive updates about attendee activity"
                    action={
                        <ToggleSwitch
                            enabled={settings.attendeeUpdates}
                            onToggle={(val) => setSettings({ ...settings, attendeeUpdates: val })}
                        />
                    }
                />
                <SettingsItem
                    icon={FileText}
                    label="Auto-generate Reports"
                    description="Create attendance reports after events end"
                    action={
                        <ToggleSwitch
                            enabled={settings.autoReports}
                            onToggle={(val) => setSettings({ ...settings, autoReports: val })}
                        />
                    }
                />
            </SettingsSection>

            <SettingsSection title="Visibility" description="Control who can see your events" icon={Eye}>
                <SettingsItem
                    icon={Globe}
                    label="Public Events by Default"
                    description="Make new events visible to all users"
                    action={
                        <ToggleSwitch
                            enabled={settings.publicByDefault}
                            onToggle={(val) => setSettings({ ...settings, publicByDefault: val })}
                        />
                    }
                />
                <SettingsItem
                    icon={Building2}
                    label="College-only Events"
                    description="Restrict events to your college by default"
                    action={
                        <ToggleSwitch
                            enabled={settings.collegeOnly}
                            onToggle={(val) => setSettings({ ...settings, collegeOnly: val })}
                        />
                    }
                />
            </SettingsSection>
        </>
    );
}

// Admin-specific Settings
function AdminSettings({ settings, setSettings }) {
    return (
        <>
            <SettingsSection title="Approval Settings" description="Configure organizer approval process" icon={Shield}>
                <SettingsItem
                    icon={Bell}
                    label="New Organizer Alerts"
                    description="Get notified when new organizers need approval"
                    action={
                        <ToggleSwitch
                            enabled={settings.newOrganizerAlerts}
                            onToggle={(val) => setSettings({ ...settings, newOrganizerAlerts: val })}
                        />
                    }
                />
                <SettingsItem
                    icon={CheckCircle2}
                    label="Auto-approve Verified Organizers"
                    description="Automatically approve organizers with verified credentials"
                    action={
                        <ToggleSwitch
                            enabled={settings.autoApprove}
                            onToggle={(val) => setSettings({ ...settings, autoApprove: val })}
                        />
                    }
                />
                <SettingsItem
                    icon={AlertTriangle}
                    label="Event Moderation Alerts"
                    description="Receive alerts for flagged event content"
                    action={
                        <ToggleSwitch
                            enabled={settings.moderationAlerts}
                            onToggle={(val) => setSettings({ ...settings, moderationAlerts: val })}
                        />
                    }
                />
            </SettingsSection>

            <SettingsSection title="College Management" description="Configure college-wide settings" icon={Building2}>
                <SettingsItem
                    icon={Users}
                    label="Maximum Events per Organizer"
                    description="Limit active events per organizer"
                    onClick={() => { }}
                />
                <SettingsItem
                    icon={Calendar}
                    label="Event Duration Limits"
                    description="Set maximum event duration"
                    onClick={() => { }}
                />
                <SettingsItem
                    icon={FileText}
                    label="Monthly Reports"
                    description="Generate college activity reports"
                    action={
                        <ToggleSwitch
                            enabled={settings.monthlyReports}
                            onToggle={(val) => setSettings({ ...settings, monthlyReports: val })}
                        />
                    }
                />
            </SettingsSection>
        </>
    );
}

// Main Settings Page Component
export default function SettingsPage({ onNavigate }) {
    const { user, logout } = useAuth();
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // Common settings state
    const [settings, setSettings] = useState({
        // Notifications
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        soundEffects: true,

        // Appearance
        darkMode: false,

        // Security
        twoFactorAuth: false,
        loginAlerts: true,

        // User-specific
        eventReminders: true,
        recommendations: true,
        autoDownload: false,

        // Organizer-specific
        registrationAlerts: true,
        attendeeUpdates: true,
        autoReports: false,
        publicByDefault: true,
        collegeOnly: false,

        // Admin-specific
        newOrganizerAlerts: true,
        autoApprove: false,
        moderationAlerts: true,
        monthlyReports: true,
    });

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your account settings and preferences</p>
            </motion.div>

            {/* Notification Settings - Common */}
            <SettingsSection title="Notifications" description="Configure how you receive updates" icon={Bell}>
                <SettingsItem
                    icon={Mail}
                    label="Email Notifications"
                    description="Receive updates via email"
                    action={
                        <ToggleSwitch
                            enabled={settings.emailNotifications}
                            onToggle={(val) => setSettings({ ...settings, emailNotifications: val })}
                        />
                    }
                />
                <SettingsItem
                    icon={Smartphone}
                    label="Push Notifications"
                    description="Receive browser push notifications"
                    action={
                        <ToggleSwitch
                            enabled={settings.pushNotifications}
                            onToggle={(val) => setSettings({ ...settings, pushNotifications: val })}
                        />
                    }
                />
                <SettingsItem
                    icon={MessageSquare}
                    label="SMS Notifications"
                    description="Receive important updates via SMS"
                    action={
                        <ToggleSwitch
                            enabled={settings.smsNotifications}
                            onToggle={(val) => setSettings({ ...settings, smsNotifications: val })}
                        />
                    }
                />
                <SettingsItem
                    icon={settings.soundEffects ? Volume2 : VolumeX}
                    label="Sound Effects"
                    description="Play sounds for notifications"
                    action={
                        <ToggleSwitch
                            enabled={settings.soundEffects}
                            onToggle={(val) => setSettings({ ...settings, soundEffects: val })}
                        />
                    }
                />
            </SettingsSection>

            {/* Security Settings - Common */}
            <SettingsSection title="Security" description="Protect your account" icon={Shield}>
                <SettingsItem
                    icon={Key}
                    label="Change Password"
                    description="Update your account password"
                    onClick={() => setShowPasswordModal(true)}
                />
                <SettingsItem
                    icon={Fingerprint}
                    label="Two-Factor Authentication"
                    description="Add an extra layer of security"
                    action={
                        <ToggleSwitch
                            enabled={settings.twoFactorAuth}
                            onToggle={(val) => setSettings({ ...settings, twoFactorAuth: val })}
                        />
                    }
                />
                <SettingsItem
                    icon={History}
                    label="Login Activity"
                    description="View recent login sessions"
                    onClick={() => { }}
                />
                <SettingsItem
                    icon={Bell}
                    label="Login Alerts"
                    description="Get notified of new logins"
                    action={
                        <ToggleSwitch
                            enabled={settings.loginAlerts}
                            onToggle={(val) => setSettings({ ...settings, loginAlerts: val })}
                        />
                    }
                />
            </SettingsSection>

            {/* Appearance Settings - Common */}
            <SettingsSection title="Appearance" description="Customize your experience" icon={Palette}>
                <SettingsItem
                    icon={settings.darkMode ? Moon : Sun}
                    label="Dark Mode"
                    description="Use dark theme across the app"
                    action={
                        <ToggleSwitch
                            enabled={settings.darkMode}
                            onToggle={(val) => setSettings({ ...settings, darkMode: val })}
                        />
                    }
                />
                <SettingsItem
                    icon={Globe}
                    label="Language"
                    description="English (India)"
                    onClick={() => { }}
                />
            </SettingsSection>

            {/* Role-Specific Settings */}
            {user?.role === ROLES.USER && <UserSettings settings={settings} setSettings={setSettings} />}
            {user?.role === ROLES.ORGANIZER && <OrganizerSettings settings={settings} setSettings={setSettings} />}
            {user?.role === ROLES.ADMIN && <AdminSettings settings={settings} setSettings={setSettings} />}

            {/* Support & Help */}
            <SettingsSection title="Support" description="Get help and resources" icon={HelpCircle}>
                <SettingsItem
                    icon={MessageSquare}
                    label="Contact Support"
                    description="Reach out to our support team"
                    onClick={() => { }}
                />
                <SettingsItem
                    icon={FileText}
                    label="Documentation"
                    description="Read our help guides"
                    onClick={() => { }}
                />
                <SettingsItem
                    icon={Download}
                    label="Download My Data"
                    description="Export your account data"
                    onClick={() => { }}
                />
            </SettingsSection>

            {/* Danger Zone */}
            <SettingsSection title="Account" description="Manage your account" icon={AlertTriangle}>
                <SettingsItem
                    icon={LogOut}
                    label="Log Out"
                    description="Sign out of your account"
                    onClick={handleLogout}
                    danger
                />
                <SettingsItem
                    icon={Trash2}
                    label="Delete Account"
                    description="Permanently delete your account and all data"
                    onClick={() => { }}
                    danger
                />
            </SettingsSection>

            {/* Password Modal */}
            <PasswordModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />
        </div>
    );
}
