import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Bell,
    Key,
    Moon,
    Sun,
    LogOut,
    Trash2,
    Download,
    AlertTriangle,
    Shield,
    Palette,
    Mail,
    Volume2,
    VolumeX,
    Calendar,
    Zap,
    Users,
    FileText,
    CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { ROLES } from '../../../utils/constants';

// Import components
import {
    ToggleSwitch,
    SettingsSection,
    SettingsItem,
    PasswordModal,
    DeleteAccountModal
} from './components';

// Settings storage key
const SETTINGS_STORAGE_KEY = 'gopass_settings';

/**
 * Load settings from localStorage
 */
const loadSettings = (userId) => {
    try {
        const stored = localStorage.getItem(`${SETTINGS_STORAGE_KEY}_${userId}`);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};

/**
 * Save settings to localStorage
 */
const saveSettings = (userId, settings) => {
    try {
        localStorage.setItem(`${SETTINGS_STORAGE_KEY}_${userId}`, JSON.stringify(settings));
    } catch (error) {
        console.error('Failed to save settings:', error);
    }
};

/**
 * Default settings configuration
 */
const getDefaultSettings = () => ({
    // Notifications (Working)
    emailNotifications: true,
    soundEffects: true,

    // Appearance (Working)
    darkMode: false,

    // User-specific (Working)
    eventReminders: true,
    recommendations: true,
    autoDownload: false,

    // Organizer-specific (Working)
    registrationAlerts: true,
    attendeeUpdates: true,
    autoReports: false,

    // Admin-specific (Working)
    newOrganizerAlerts: true,
    moderationAlerts: true,
});

/**
 * User-specific Settings Section
 */
function UserSettings({ settings, updateSetting }) {
    return (
        <SettingsSection
            title="Event Preferences"
            description="Customize your event experience"
            icon={Calendar}
        >
            <SettingsItem
                icon={Bell}
                label="Event Reminders"
                description="Get notified 24 hours before your registered events"
                action={
                    <ToggleSwitch
                        enabled={settings.eventReminders}
                        onToggle={(val) => updateSetting('eventReminders', val)}
                    />
                }
            />
            <SettingsItem
                icon={Zap}
                label="Recommended Events"
                description="Receive personalized event suggestions based on your interests"
                action={
                    <ToggleSwitch
                        enabled={settings.recommendations}
                        onToggle={(val) => updateSetting('recommendations', val)}
                    />
                }
            />
            <SettingsItem
                icon={Download}
                label="Auto-download Tickets"
                description="Automatically download tickets after successful registration"
                action={
                    <ToggleSwitch
                        enabled={settings.autoDownload}
                        onToggle={(val) => updateSetting('autoDownload', val)}
                    />
                }
            />
        </SettingsSection>
    );
}

/**
 * Organizer-specific Settings Section
 */
function OrganizerSettings({ settings, updateSetting }) {
    return (
        <SettingsSection
            title="Event Management"
            description="Configure event notification settings"
            icon={Calendar}
        >
            <SettingsItem
                icon={Bell}
                label="Registration Alerts"
                description="Get notified when someone registers for your event"
                action={
                    <ToggleSwitch
                        enabled={settings.registrationAlerts}
                        onToggle={(val) => updateSetting('registrationAlerts', val)}
                    />
                }
            />
            <SettingsItem
                icon={Users}
                label="Attendee Updates"
                description="Receive updates about attendee activity and check-ins"
                action={
                    <ToggleSwitch
                        enabled={settings.attendeeUpdates}
                        onToggle={(val) => updateSetting('attendeeUpdates', val)}
                    />
                }
            />
            <SettingsItem
                icon={FileText}
                label="Auto-generate Reports"
                description="Automatically create attendance reports after events end"
                action={
                    <ToggleSwitch
                        enabled={settings.autoReports}
                        onToggle={(val) => updateSetting('autoReports', val)}
                    />
                }
            />
        </SettingsSection>
    );
}

/**
 * Admin-specific Settings Section
 */
function AdminSettings({ settings, updateSetting }) {
    return (
        <SettingsSection
            title="Approval Settings"
            description="Configure organizer approval notifications"
            icon={Shield}
        >
            <SettingsItem
                icon={Bell}
                label="New Organizer Alerts"
                description="Get notified when new organizers need verification"
                action={
                    <ToggleSwitch
                        enabled={settings.newOrganizerAlerts}
                        onToggle={(val) => updateSetting('newOrganizerAlerts', val)}
                    />
                }
            />
            <SettingsItem
                icon={AlertTriangle}
                label="Event Moderation Alerts"
                description="Receive alerts for flagged or reported event content"
                action={
                    <ToggleSwitch
                        enabled={settings.moderationAlerts}
                        onToggle={(val) => updateSetting('moderationAlerts', val)}
                    />
                }
            />
        </SettingsSection>
    );
}

/**
 * Main Settings Page Component
 * Organized settings with only functional options
 */
export default function SettingsPage({ onNavigate }) {
    const { user, logout } = useAuth();

    // Modal states
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Settings state with localStorage persistence
    const [settings, setSettings] = useState(getDefaultSettings());
    const [saveStatus, setSaveStatus] = useState(null); // 'saving' | 'saved' | null

    // Load settings on mount
    useEffect(() => {
        if (user?.id) {
            const savedSettings = loadSettings(user.id);
            if (savedSettings) {
                setSettings(prev => ({ ...prev, ...savedSettings }));
            }
        }
    }, [user?.id]);

    // Update a single setting
    const updateSetting = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);

        // Save to localStorage with feedback
        if (user?.id) {
            setSaveStatus('saving');
            saveSettings(user.id, newSettings);
            setTimeout(() => {
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus(null), 1500);
            }, 300);
        }
    };

    // Handle logout
    const handleLogout = () => {
        logout();
    };

    // Handle account deletion
    const handleDeleteAccount = () => {
        // Clear user settings
        if (user?.id) {
            localStorage.removeItem(`${SETTINGS_STORAGE_KEY}_${user.id}`);
        }
        logout();
    };

    // Export user data
    const handleExportData = () => {
        const userData = {
            profile: {
                name: user?.fullName,
                email: user?.email,
                role: user?.role,
            },
            settings: settings,
            exportedAt: new Date().toISOString(),
        };

        const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gopass-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your account settings and preferences</p>
                </div>

                {/* Save Status Indicator */}
                {saveStatus && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${saveStatus === 'saving'
                            ? 'bg-brand-100/10 text-brand-200 border border-brand-200/20'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200/50'
                            }`}
                    >
                        {saveStatus === 'saving' ? (
                            <>
                                <div className="w-3 h-3 border-2 border-brand-200 border-t-transparent rounded-full animate-spin" />

                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Saved</span>
                            </>
                        )}
                    </motion.div>
                )}
            </motion.div>

            {/* Notification Settings */}
            <SettingsSection
                title="Notifications"
                description="Configure how you receive updates"
                icon={Bell}
            >
                <SettingsItem
                    icon={Mail}
                    label="Email Notifications"
                    description="Receive important updates and reminders via email"
                    action={
                        <ToggleSwitch
                            enabled={settings.emailNotifications}
                            onToggle={(val) => updateSetting('emailNotifications', val)}
                        />
                    }
                />
                <SettingsItem
                    icon={settings.soundEffects ? Volume2 : VolumeX}
                    label="Sound Effects"
                    description="Play sounds for in-app notifications"
                    action={
                        <ToggleSwitch
                            enabled={settings.soundEffects}
                            onToggle={(val) => updateSetting('soundEffects', val)}
                        />
                    }
                />
            </SettingsSection>

            {/* Appearance Settings */}
            <SettingsSection
                title="Appearance"
                description="Customize how the app looks"
                icon={Palette}
            >
                <SettingsItem
                    icon={settings.darkMode ? Moon : Sun}
                    label="Dark Mode"
                    description="Switch between light and dark theme"
                    subtitle={settings.darkMode ? "Dark theme enabled" : "Light theme enabled"}
                    action={
                        <ToggleSwitch
                            enabled={settings.darkMode}
                            onToggle={(val) => updateSetting('darkMode', val)}
                        />
                    }
                />
            </SettingsSection>

            {/* Security Settings */}
            <SettingsSection
                title="Security"
                description="Protect your account"
                icon={Shield}
            >
                <SettingsItem
                    icon={Key}
                    label="Change Password"
                    description="Update your account password"
                    onClick={() => setShowPasswordModal(true)}
                />
            </SettingsSection>

            {/* Role-Specific Settings */}
            {user?.role === ROLES.USER && (
                <UserSettings settings={settings} updateSetting={updateSetting} />
            )}
            {user?.role === ROLES.ORGANIZER && (
                <OrganizerSettings settings={settings} updateSetting={updateSetting} />
            )}
            {user?.role === ROLES.ADMIN && (
                <AdminSettings settings={settings} updateSetting={updateSetting} />
            )}

            {/* Data & Privacy */}
            <SettingsSection
                title="Data & Privacy"
                description="Manage your data"
                icon={Download}
            >
                <SettingsItem
                    icon={Download}
                    label="Export My Data"
                    description="Download a copy of your account data"
                    onClick={handleExportData}
                />
            </SettingsSection>

            {/* Account Actions */}
            <SettingsSection
                title="Account"
                description="Manage your account"
                icon={AlertTriangle}
            >
                <SettingsItem
                    icon={LogOut}
                    label="Log Out"
                    description="Sign out of your account on this device"
                    onClick={handleLogout}
                    danger
                />
                <SettingsItem
                    icon={Trash2}
                    label="Delete Account"
                    description="Permanently delete your account and all associated data"
                    onClick={() => setShowDeleteModal(true)}
                    danger
                />
            </SettingsSection>

            {/* Modals */}
            <PasswordModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />

            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteAccount}
            />
        </div>
    );
}
