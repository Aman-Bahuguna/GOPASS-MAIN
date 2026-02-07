import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Mail,
    Calendar,
    Building2,
    MapPin,
    FileText,
    UserCheck,
    UserX,
    ExternalLink,
    Clock,
    Phone,
    Briefcase
} from 'lucide-react';
import { StatusBadge, ActionButton } from '../common';

/**
 * Organizer Details Modal Component
 * Full-screen modal showing complete organizer information
 */
function OrganizerDetailsModal({
    isOpen,
    onClose,
    organizer,
    onApprove,
    onReject,
    onViewIdCard,
    isPending = false
}) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('details'); // 'details', 'idcard', 'activity'

    if (!organizer) return null;

    const handleApprove = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        onApprove?.(organizer.id);
        setIsProcessing(false);
        onClose();
    };

    const handleReject = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        onReject?.(organizer.id);
        setIsProcessing(false);
        onClose();
    };

    const tabs = [
        { id: 'details', label: 'Details' },
        { id: 'idcard', label: 'ID Card' },
        { id: 'activity', label: 'Activity' }
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

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

                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-200 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-brand-200/30">
                                    {organizer.fullName?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{organizer.fullName}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <StatusBadge status={organizer.position} size="sm" />
                                        {organizer.isAdminApproved ? (
                                            <StatusBadge status="approved" size="sm" />
                                        ) : (
                                            <StatusBadge status="pending" size="sm" animate />
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
                                            layoutId="activeTab"
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
                                        {/* Contact Info */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                                Contact Information
                                            </h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                                    <Mail className="w-5 h-5 text-brand-200" />
                                                    <div>
                                                        <p className="text-xs text-slate-400">Email</p>
                                                        <p className="font-medium text-slate-900">{organizer.email}</p>
                                                    </div>
                                                </div>
                                                {organizer.phone && (
                                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                                        <Phone className="w-5 h-5 text-brand-200" />
                                                        <div>
                                                            <p className="text-xs text-slate-400">Phone</p>
                                                            <p className="font-medium text-slate-900">{organizer.phone}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* College Info */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                                College Details
                                            </h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                                    <Building2 className="w-5 h-5 text-brand-200" />
                                                    <div>
                                                        <p className="text-xs text-slate-400">Institution</p>
                                                        <p className="font-medium text-slate-900">{organizer.college?.name || 'N/A'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                                    <MapPin className="w-5 h-5 text-brand-200" />
                                                    <div>
                                                        <p className="text-xs text-slate-400">Location</p>
                                                        <p className="font-medium text-slate-900">
                                                            {organizer.college?.state || 'N/A'}, {organizer.college?.pincode || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                                    <Briefcase className="w-5 h-5 text-brand-200" />
                                                    <div>
                                                        <p className="text-xs text-slate-400">Position</p>
                                                        <p className="font-medium text-slate-900 capitalize">
                                                            {organizer.position?.toLowerCase() || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Application Info */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                                Application Details
                                            </h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                                    <Calendar className="w-5 h-5 text-brand-200" />
                                                    <div>
                                                        <p className="text-xs text-slate-400">Applied On</p>
                                                        <p className="font-medium text-slate-900">
                                                            {formatDate(organizer.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                                {organizer.approvedAt && (
                                                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                                                        <UserCheck className="w-5 h-5 text-emerald-600" />
                                                        <div>
                                                            <p className="text-xs text-emerald-500">Approved On</p>
                                                            <p className="font-medium text-emerald-700">
                                                                {formatDate(organizer.approvedAt)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'idcard' && (
                                    <motion.div
                                        key="idcard"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-4"
                                    >
                                        <div className="p-4 bg-slate-50 rounded-xl">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-5 h-5 text-brand-200" />
                                                    <span className="font-medium text-slate-700">ID Card Document</span>
                                                </div>
                                                {organizer.idCardUrl && (
                                                    <motion.button
                                                        onClick={() => onViewIdCard?.(organizer.idCardUrl, organizer.fullName)}
                                                        className="flex items-center gap-1 text-brand-200 text-sm font-medium"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Open Full
                                                    </motion.button>
                                                )}
                                            </div>

                                            {organizer.idCardUrl ? (
                                                <div
                                                    className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center cursor-pointer hover:from-slate-300 hover:to-slate-400 transition-colors"
                                                    onClick={() => onViewIdCard?.(organizer.idCardUrl, organizer.fullName)}
                                                >
                                                    <div className="text-center">
                                                        <FileText className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                                                        <span className="text-slate-500">Click to view full size</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
                                                    <div className="text-center">
                                                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                                                        <span className="text-slate-400">No ID card uploaded</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                            <p className="text-sm text-amber-700">
                                                <strong>Verification Note:</strong> Please verify that the name on the ID card matches
                                                the applicant's name and that the institution details are correct.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'activity' && (
                                    <motion.div
                                        key="activity"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-4"
                                    >
                                        {/* Timeline */}
                                        <div className="relative">
                                            <div className="space-y-4">
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-3 h-3 rounded-full bg-brand-200" />
                                                        <div className="w-0.5 h-full bg-slate-200" />
                                                    </div>
                                                    <div className="pb-6">
                                                        <p className="font-medium text-slate-900">Application Submitted</p>
                                                        <p className="text-sm text-slate-500">{formatDate(organizer.createdAt)}</p>
                                                    </div>
                                                </div>

                                                {organizer.isAdminApproved ? (
                                                    <div className="flex gap-4">
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-slate-900">Approved</p>
                                                            <p className="text-sm text-slate-500">
                                                                {organizer.approvedAt ? formatDate(organizer.approvedAt) : 'N/A'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-4">
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-slate-900">Awaiting Approval</p>
                                                            <p className="text-sm text-slate-500">Pending your review</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {organizer.isAdminApproved && (
                                            <div className="p-4 bg-slate-50 rounded-xl">
                                                <h4 className="font-medium text-slate-700 mb-2">Events Created</h4>
                                                <p className="text-2xl font-bold text-brand-200">
                                                    {organizer.eventsCount || 0}
                                                </p>
                                                <p className="text-sm text-slate-500">Total events organized</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer Actions (for pending organizers) */}
                        {isPending && (
                            <div className="p-6 border-t border-slate-100 bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <ActionButton
                                        onClick={handleReject}
                                        icon={UserX}
                                        label="Reject"
                                        variant="danger"
                                        fullWidth
                                        disabled={isProcessing}
                                    />
                                    <ActionButton
                                        onClick={handleApprove}
                                        icon={UserCheck}
                                        label="Approve"
                                        variant="success"
                                        fullWidth
                                        loading={isProcessing}
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default OrganizerDetailsModal;
