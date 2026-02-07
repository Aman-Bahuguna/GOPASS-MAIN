import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Calendar,
    Clock,
    MapPin,
    Users,
    DollarSign,
    Tag,
    User,
    ExternalLink,
    XCircle,
    Star,
    Download
} from 'lucide-react';
import { StatusBadge, ActionButton } from '../common';

/**
 * Event Details Modal Component
 * Full-screen modal showing complete event information
 */
function EventDetailsModal({
    isOpen,
    onClose,
    event,
    onCancelEvent,
    onFeatureEvent,
    onDownloadAttendees,
    onViewRegistrations
}) {
    const [activeTab, setActiveTab] = useState('details'); // 'details', 'registrations', 'analytics'
    const [isCancelling, setIsCancelling] = useState(false);

    if (!event) return null;

    const handleCancelEvent = async () => {
        setIsCancelling(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        onCancelEvent?.(event.id);
        setIsCancelling(false);
        onClose();
    };

    const tabs = [
        { id: 'details', label: 'Details' },
        { id: 'registrations', label: 'Registrations' },
        { id: 'analytics', label: 'Analytics' }
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const fillPercentage = event.capacity > 0
        ? Math.min((event.registeredCount / event.capacity) * 100, 100)
        : 0;

    const canCancel = event.status === 'UPCOMING' || event.status === 'ONGOING';

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="relative p-6 border-b border-slate-100">
                            <motion.button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </motion.button>

                            <div className="flex items-start gap-4 pr-8">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-200 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-brand-200/30">
                                    <Calendar className="w-7 h-7" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-slate-900 pr-4">{event.title}</h3>
                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                        <StatusBadge status={event.status} size="sm" />
                                        {event.category && (
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                                                {event.category}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-slate-100">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-3 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                            ? 'text-brand-200'
                                            : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="eventActiveTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-200"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <AnimatePresence mode="wait">
                                {activeTab === 'details' && (
                                    <motion.div
                                        key="details"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        {/* Description */}
                                        {event.description && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                                    About
                                                </h4>
                                                <p className="text-slate-700 leading-relaxed">{event.description}</p>
                                            </div>
                                        )}

                                        {/* Date & Time */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                                Date & Time
                                            </h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                                    <Calendar className="w-5 h-5 text-brand-200" />
                                                    <div>
                                                        <p className="text-xs text-slate-400">Start Date</p>
                                                        <p className="font-medium text-slate-900">{formatDate(event.date)}</p>
                                                    </div>
                                                </div>
                                                {event.endDate && (
                                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                                        <Calendar className="w-5 h-5 text-brand-200" />
                                                        <div>
                                                            <p className="text-xs text-slate-400">End Date</p>
                                                            <p className="font-medium text-slate-900">{formatDate(event.endDate)}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                                    <Clock className="w-5 h-5 text-brand-200" />
                                                    <div>
                                                        <p className="text-xs text-slate-400">Time</p>
                                                        <p className="font-medium text-slate-900">
                                                            {formatTime(event.date)} - {event.endDate && formatTime(event.endDate)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                                Location
                                            </h4>
                                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                                <MapPin className="w-5 h-5 text-brand-200" />
                                                <div>
                                                    <p className="text-xs text-slate-400">Venue</p>
                                                    <p className="font-medium text-slate-900">{event.venue || 'TBA'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pricing & Capacity */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                                Pricing & Capacity
                                            </h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 bg-slate-50 rounded-xl">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <DollarSign className="w-4 h-4 text-brand-200" />
                                                        <span className="text-xs text-slate-400">Price</span>
                                                    </div>
                                                    <p className="font-bold text-lg text-slate-900">
                                                        {event.fee > 0 ? `₹${event.fee}` : 'Free'}
                                                    </p>
                                                </div>
                                                <div className="p-3 bg-slate-50 rounded-xl">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Users className="w-4 h-4 text-brand-200" />
                                                        <span className="text-xs text-slate-400">Capacity</span>
                                                    </div>
                                                    <p className="font-bold text-lg text-slate-900">{event.capacity}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        {event.tags && event.tags.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                                    Tags
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {event.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-3 py-1 bg-brand-50 text-brand-200 rounded-full text-sm font-medium"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'registrations' && (
                                    <motion.div
                                        key="registrations"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        {/* Registration Progress */}
                                        <div className="p-4 bg-gradient-to-r from-brand-50 to-purple-50 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-slate-700">Registration Progress</span>
                                                <span className="text-brand-200 font-bold">
                                                    {event.registeredCount}/{event.capacity}
                                                </span>
                                            </div>
                                            <div className="h-3 bg-white rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${fillPercentage}%` }}
                                                    transition={{ duration: 0.5 }}
                                                    className={`h-full rounded-full ${fillPercentage >= 90 ? 'bg-red-400' :
                                                            fillPercentage >= 70 ? 'bg-amber-400' :
                                                                'bg-emerald-400'
                                                        }`}
                                                />
                                            </div>
                                            <p className="text-sm text-slate-500 mt-2">
                                                {event.capacity - event.registeredCount} spots remaining
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="space-y-3">
                                            <ActionButton
                                                onClick={() => onViewRegistrations?.(event)}
                                                icon={Users}
                                                label="View All Registrations"
                                                variant="secondary"
                                                fullWidth
                                            />
                                            <ActionButton
                                                onClick={() => onDownloadAttendees?.(event)}
                                                icon={Download}
                                                label="Download Attendee List"
                                                variant="secondary"
                                                fullWidth
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                            <p className="text-sm text-blue-700">
                                                View and manage all registered attendees for this event.
                                                You can also export the list for offline use.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'analytics' && (
                                    <motion.div
                                        key="analytics"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-4 bg-slate-50 rounded-xl text-center">
                                                <p className="text-2xl font-bold text-brand-200">{event.registeredCount}</p>
                                                <p className="text-sm text-slate-500">Registrations</p>
                                            </div>
                                            <div className="p-4 bg-slate-50 rounded-xl text-center">
                                                <p className="text-2xl font-bold text-emerald-600">
                                                    {fillPercentage.toFixed(0)}%
                                                </p>
                                                <p className="text-sm text-slate-500">Fill Rate</p>
                                            </div>
                                            <div className="p-4 bg-slate-50 rounded-xl text-center">
                                                <p className="text-2xl font-bold text-purple-600">
                                                    ₹{(event.fee * event.registeredCount).toLocaleString()}
                                                </p>
                                                <p className="text-sm text-slate-500">Revenue</p>
                                            </div>
                                            <div className="p-4 bg-slate-50 rounded-xl text-center">
                                                <p className="text-2xl font-bold text-amber-600">--</p>
                                                <p className="text-sm text-slate-500">Avg. Rating</p>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="p-4 bg-slate-50 rounded-xl">
                                            <p className="text-sm text-slate-500">
                                                More detailed analytics will be available after the event is completed.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50">
                            <div className="flex items-center gap-3">
                                {onFeatureEvent && (
                                    <ActionButton
                                        onClick={() => onFeatureEvent?.(event)}
                                        icon={Star}
                                        label="Feature"
                                        variant="secondary"
                                    />
                                )}
                                {canCancel && onCancelEvent && (
                                    <ActionButton
                                        onClick={handleCancelEvent}
                                        icon={XCircle}
                                        label="Cancel Event"
                                        variant="danger"
                                        loading={isCancelling}
                                        className="flex-1"
                                    />
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default EventDetailsModal;
