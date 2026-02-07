import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Settings,
    Bell,
    UserPlus,
    Calendar,
    MessageCircle,
    AlertCircle,
    Mail,
    Smartphone,
    Check
} from 'lucide-react';
import { ActionButton } from '../common';

/**
 * Notification Settings Modal
 * Configure notification preferences
 */
function NotificationSettings({
    isOpen,
    onClose,
    settings = {},
    onSave,
    loading = false
}) {
    const [config, setConfig] = useState({
        email: settings.email ?? true,
        push: settings.push ?? true,
        newOrganizer: settings.newOrganizer ?? true,
        organizerApproved: settings.organizerApproved ?? true,
        newEvent: settings.newEvent ?? true,
        eventCancelled: settings.eventCancelled ?? true,
        messages: settings.messages ?? true,
        systemAlerts: settings.systemAlerts ?? true,
        digest: settings.digest ?? 'daily' // 'none' | 'daily' | 'weekly'
    });

    const handleToggle = (key) => {
        setConfig(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleDigestChange = (value) => {
        setConfig(prev => ({ ...prev, digest: value }));
    };

    const handleSave = () => {
        onSave?.(config);
    };

    const notificationTypes = [
        { key: 'newOrganizer', label: 'New Organizer Requests', icon: UserPlus, description: 'When someone registers as an organizer' },
        { key: 'organizerApproved', label: 'Organizer Status Changes', icon: Check, description: 'When organizers are approved or rejected' },
        { key: 'newEvent', label: 'New Events', icon: Calendar, description: 'When organizers create new events' },
        { key: 'eventCancelled', label: 'Event Updates', icon: AlertCircle, description: 'When events are cancelled or modified' },
        { key: 'messages', label: 'Messages', icon: MessageCircle, description: 'Direct messages from organizers' },
        { key: 'systemAlerts', label: 'System Alerts', icon: Bell, description: 'Important system notifications' }
    ];

    const digestOptions = [
        { value: 'none', label: 'No Digest' },
        { value: 'daily', label: 'Daily Digest' },
        { value: 'weekly', label: 'Weekly Digest' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-brand-100/20 rounded-xl">
                                        <Settings className="w-5 h-5 text-brand-200" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">Notification Settings</h3>
                                        <p className="text-sm text-slate-500">Customize your preferences</p>
                                    </div>
                                </div>
                                <motion.button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </motion.button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Delivery Methods */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Delivery Methods</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-slate-400" />
                                                <div>
                                                    <p className="font-medium text-slate-900 text-sm">Email Notifications</p>
                                                    <p className="text-xs text-slate-500">Receive notifications via email</p>
                                                </div>
                                            </div>
                                            <ToggleSwitch
                                                checked={config.email}
                                                onChange={() => handleToggle('email')}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <Smartphone className="w-5 h-5 text-slate-400" />
                                                <div>
                                                    <p className="font-medium text-slate-900 text-sm">Push Notifications</p>
                                                    <p className="text-xs text-slate-500">Browser push notifications</p>
                                                </div>
                                            </div>
                                            <ToggleSwitch
                                                checked={config.push}
                                                onChange={() => handleToggle('push')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Notification Types */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Notification Types</h4>
                                    <div className="space-y-2">
                                        {notificationTypes.map((type) => (
                                            <div
                                                key={type.key}
                                                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <type.icon className="w-5 h-5 text-slate-400" />
                                                    <div>
                                                        <p className="font-medium text-slate-900 text-sm">{type.label}</p>
                                                        <p className="text-xs text-slate-500">{type.description}</p>
                                                    </div>
                                                </div>
                                                <ToggleSwitch
                                                    checked={config[type.key]}
                                                    onChange={() => handleToggle(type.key)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Email Digest */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Email Digest</h4>
                                    <p className="text-xs text-slate-500 mb-3">
                                        Receive a summary of all notifications instead of individual emails
                                    </p>
                                    <div className="flex gap-2">
                                        {digestOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => handleDigestChange(option.value)}
                                                className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-colors ${config.digest === option.value
                                                        ? 'bg-brand-200 text-white'
                                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 p-6 pt-4 bg-slate-50 border-t border-slate-100">
                                <ActionButton
                                    onClick={onClose}
                                    label="Cancel"
                                    variant="secondary"
                                    fullWidth
                                    disabled={loading}
                                />
                                <ActionButton
                                    onClick={handleSave}
                                    label="Save Settings"
                                    variant="primary"
                                    fullWidth
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

/**
 * Toggle Switch Component
 */
function ToggleSwitch({ checked, onChange }) {
    return (
        <motion.button
            onClick={onChange}
            className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-brand-200' : 'bg-slate-300'
                }`}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                animate={{ left: checked ? '24px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
        </motion.button>
    );
}

export default NotificationSettings;
