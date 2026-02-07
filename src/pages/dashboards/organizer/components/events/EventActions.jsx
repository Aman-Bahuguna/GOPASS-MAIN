import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckSquare,
    Square,
    Trash2,
    Download,
    Edit,
    XCircle,
    MoreHorizontal
} from 'lucide-react';

/**
 * EventActions - Bulk action toolbar for events
 * @param {Object} props
 * @param {Array} props.selectedIds - Array of selected event IDs
 * @param {number} props.totalEvents - Total number of events
 * @param {Function} props.onSelectAll - Select all handler
 * @param {Function} props.onDeselectAll - Deselect all handler
 * @param {Function} props.onBulkDelete - Bulk delete handler
 * @param {Function} props.onBulkExport - Bulk export handler
 * @param {Function} props.onBulkStatusChange - Bulk status change handler
 */
export default function EventActions({
    selectedIds = [],
    totalEvents = 0,
    onSelectAll,
    onDeselectAll,
    onBulkDelete,
    onBulkExport,
    onBulkStatusChange
}) {
    const selectedCount = selectedIds.length;
    const isAllSelected = selectedCount === totalEvents && totalEvents > 0;
    const hasSelection = selectedCount > 0;

    return (
        <AnimatePresence>
            {hasSelection && (
                <motion.div
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    className="mb-4"
                >
                    <div className="bg-brand-100/5 border border-brand-200/20 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                        {/* Selection info */}
                        <div className="flex items-center gap-4">
                            {/* Select/Deselect all */}
                            <motion.button
                                onClick={isAllSelected ? onDeselectAll : onSelectAll}
                                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-brand-200 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isAllSelected ? (
                                    <CheckSquare className="w-4 h-4 text-brand-200" />
                                ) : (
                                    <Square className="w-4 h-4" />
                                )}
                                {isAllSelected ? 'Deselect All' : 'Select All'}
                            </motion.button>

                            {/* Selection count */}
                            <div className="h-5 w-px bg-slate-300" />
                            <span className="text-sm text-slate-600">
                                <span className="font-semibold text-brand-200">{selectedCount}</span>
                                {' '}of {totalEvents} selected
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Export */}
                            <motion.button
                                onClick={onBulkExport}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Download className="w-4 h-4" />
                                Export
                            </motion.button>

                            {/* Status change dropdown */}
                            <div className="relative group">
                                <motion.button
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Edit className="w-4 h-4" />
                                    Change Status
                                </motion.button>

                                {/* Dropdown menu */}
                                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                                    {['DRAFT', 'UPCOMING', 'ONGOING', 'COMPLETED'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => onBulkStatusChange?.(status)}
                                            className="w-full px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                                        >
                                            {status.charAt(0) + status.slice(1).toLowerCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Delete */}
                            <motion.button
                                onClick={onBulkDelete}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </motion.button>

                            {/* Clear selection */}
                            <motion.button
                                onClick={onDeselectAll}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <XCircle className="w-5 h-5 text-slate-400" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
