import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock,
    Eye,
    Mail,
    Calendar,
    Building2,
    MapPin,
    FileText,
    UserCheck,
    UserX,
    ExternalLink
} from 'lucide-react';
import { StatusBadge } from '../common';

/**
 * Premium Pending Organizer Card Component
 * Displays detailed information about a pending organizer with approve/reject actions
 */
function PendingOrganizerCard({
    organizer,
    index,
    onApprove,
    onReject,
    onViewDetails,
    onViewIdCard
}) {
    const [showDetails, setShowDetails] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [actionType, setActionType] = useState(null);

    const handleApprove = async () => {
        setIsProcessing(true);
        setActionType('approve');
        await new Promise(resolve => setTimeout(resolve, 1000));
        onApprove(organizer.id);
        setIsProcessing(false);
        setActionType(null);
    };

    const handleReject = async () => {
        setIsProcessing(true);
        setActionType('reject');
        await new Promise(resolve => setTimeout(resolve, 1000));
        onReject(organizer.id);
        setIsProcessing(false);
        setActionType(null);
    };

    const handleViewIdCard = () => {
        if (onViewIdCard && organizer.idCardUrl) {
            onViewIdCard(organizer.idCardUrl, organizer.fullName);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30, scale: 0.95 }}
            transition={{ delay: 0.1 * index, type: 'spring', stiffness: 100 }}
            layout
            className="group relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300"
        >
            {/* Status indicator bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />

            <div className="p-6">
                <div className="flex items-start gap-4">
                    {/* Avatar with gradient */}
                    <motion.div
                        className="relative flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-200 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-200/30">
                            {organizer.fullName.charAt(0).toUpperCase()}
                        </div>
                        <motion.div
                            className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Clock className="w-3 h-3 text-white" />
                        </motion.div>
                    </motion.div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-lg text-slate-900">{organizer.fullName}</h4>
                            <StatusBadge status={organizer.position} size="sm" />
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{organizer.email}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1.5 text-xs text-slate-400">
                                <Calendar className="w-3.5 h-3.5" />
                                Applied {new Date(organizer.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={() => setShowDetails(!showDetails)}
                            className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="Toggle details"
                        >
                            <Eye className={`w-5 h-5 ${showDetails ? 'text-brand-200' : 'text-slate-400'}`} />
                        </motion.button>
                        {onViewDetails && (
                            <motion.button
                                onClick={() => onViewDetails(organizer)}
                                className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title="Open full details"
                            >
                                <ExternalLink className="w-5 h-5 text-slate-400" />
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                                        <Building2 className="w-4 h-4 text-brand-200" />
                                        College
                                    </div>
                                    <p className="text-slate-900 font-semibold">{organizer.college?.name || 'N/A'}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                                        <MapPin className="w-4 h-4 text-brand-200" />
                                        Location
                                    </div>
                                    <p className="text-slate-900 font-semibold">
                                        {organizer.college?.state || 'N/A'} - {organizer.college?.pincode || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* ID Card Section */}
                            {organizer.idCardUrl && (
                                <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                                    <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-brand-200" />
                                        ID Card Preview
                                    </p>
                                    <motion.div
                                        className="h-40 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center cursor-pointer hover:from-slate-300 hover:to-slate-400 transition-colors"
                                        onClick={handleViewIdCard}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <div className="text-center">
                                            <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                                            <span className="text-slate-500 text-sm">Click to view ID Card</span>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100">
                    <motion.button
                        onClick={handleApprove}
                        disabled={isProcessing}
                        className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200/50 transition-all disabled:opacity-50"
                        whileHover={!isProcessing ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!isProcessing ? { scale: 0.98 } : {}}
                    >
                        {isProcessing && actionType === 'approve' ? (
                            <motion.div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                        ) : (
                            <>
                                <UserCheck className="w-5 h-5" />
                                Approve
                            </>
                        )}
                    </motion.button>
                    <motion.button
                        onClick={handleReject}
                        disabled={isProcessing}
                        className="flex-1 py-3 bg-white border-2 border-red-200 hover:bg-red-50 text-red-600 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        whileHover={!isProcessing ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!isProcessing ? { scale: 0.98 } : {}}
                    >
                        {isProcessing && actionType === 'reject' ? (
                            <motion.div
                                className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                        ) : (
                            <>
                                <UserX className="w-5 h-5" />
                                Reject
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default PendingOrganizerCard;
