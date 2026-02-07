import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Users,
    Search,
    ChevronLeft,
    ChevronRight,
    Filter,
    Download,
    Mail,
    MoreVertical,
    CheckCircle2,
    Clock,
    ExternalLink,
    UserX
} from 'lucide-react';
import { StatusBadge, ActionButton, SearchInput, FilterDropdown } from '../common';

/**
 * All Organizers Modal Component
 * Full-screen modal showing all organizers with pagination and filters
 */
function AllOrganizersModal({
    isOpen,
    onClose,
    organizers = [],
    onViewDetails,
    onRevokeApproval,
    onSendMessage,
    onExport
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState(null);
    const [positionFilter, setPositionFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrganizers, setSelectedOrganizers] = useState([]);
    const itemsPerPage = 10;

    // Filter options
    const statusOptions = [
        { value: 'approved', label: 'Approved' },
        { value: 'pending', label: 'Pending' }
    ];

    const positionOptions = [
        { value: 'TEACHER', label: 'Teacher' },
        { value: 'STUDENT', label: 'Student' }
    ];

    // Filtered organizers
    const filteredOrganizers = useMemo(() => {
        let result = [...organizers];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(org =>
                org.fullName?.toLowerCase().includes(query) ||
                org.email?.toLowerCase().includes(query)
            );
        }

        if (statusFilter) {
            result = result.filter(org =>
                statusFilter === 'approved' ? org.isAdminApproved : !org.isAdminApproved
            );
        }

        if (positionFilter) {
            result = result.filter(org => org.position === positionFilter);
        }

        return result;
    }, [organizers, searchQuery, statusFilter, positionFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredOrganizers.length / itemsPerPage);
    const paginatedOrganizers = filteredOrganizers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset page when filters change
    const handleFilterChange = (setter) => (value) => {
        setter(value);
        setCurrentPage(1);
    };

    // Selection handlers
    const toggleSelectAll = () => {
        if (selectedOrganizers.length === paginatedOrganizers.length) {
            setSelectedOrganizers([]);
        } else {
            setSelectedOrganizers(paginatedOrganizers.map(org => org.id));
        }
    };

    const toggleSelect = (id) => {
        setSelectedOrganizers(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    const isSelected = (id) => selectedOrganizers.includes(id);
    const isAllSelected = paginatedOrganizers.length > 0 &&
        selectedOrganizers.length === paginatedOrganizers.length;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleClose = () => {
        setSearchQuery('');
        setStatusFilter(null);
        setPositionFilter(null);
        setCurrentPage(1);
        setSelectedOrganizers([]);
        onClose();
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
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed inset-4 md:inset-8 lg:inset-12 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-100/20 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-brand-200" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">All Organizers</h2>
                                    <p className="text-sm text-slate-500">
                                        {filteredOrganizers.length} total organizers
                                    </p>
                                </div>
                            </div>
                            <motion.button
                                onClick={handleClose}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </motion.button>
                        </div>

                        {/* Filters Bar */}
                        <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 border-b border-slate-100">
                            <SearchInput
                                value={searchQuery}
                                onChange={handleFilterChange(setSearchQuery)}
                                placeholder="Search organizers..."
                                className="flex-1 min-w-[200px]"
                            />
                            <FilterDropdown
                                label="Status"
                                options={statusOptions}
                                value={statusFilter}
                                onChange={handleFilterChange(setStatusFilter)}
                                placeholder="All Status"
                            />
                            <FilterDropdown
                                label="Position"
                                options={positionOptions}
                                value={positionFilter}
                                onChange={handleFilterChange(setPositionFilter)}
                                placeholder="All Positions"
                            />
                            {onExport && (
                                <ActionButton
                                    onClick={() => onExport(filteredOrganizers)}
                                    icon={Download}
                                    label="Export"
                                    variant="secondary"
                                    size="sm"
                                />
                            )}
                        </div>

                        {/* Bulk Actions Bar */}
                        <AnimatePresence>
                            {selectedOrganizers.length > 0 && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="flex items-center gap-3 px-4 py-3 bg-brand-50 border-b border-brand-100"
                                >
                                    <span className="text-sm font-medium text-brand-200">
                                        {selectedOrganizers.length} selected
                                    </span>
                                    <div className="flex-1" />
                                    <ActionButton
                                        onClick={() => {
                                            selectedOrganizers.forEach(id => onSendMessage?.({ id }));
                                        }}
                                        icon={Mail}
                                        label="Message All"
                                        variant="secondary"
                                        size="sm"
                                    />
                                    <ActionButton
                                        onClick={() => setSelectedOrganizers([])}
                                        label="Clear"
                                        variant="ghost"
                                        size="sm"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Table */}
                        <div className="flex-1 overflow-auto">
                            <table className="w-full">
                                <thead className="sticky top-0 bg-white border-b border-slate-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                checked={isAllSelected}
                                                onChange={toggleSelectAll}
                                                className="w-4 h-4 rounded border-slate-300 text-brand-200 focus:ring-brand-200"
                                            />
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            Organizer
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            Position
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            Joined
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            Events
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {paginatedOrganizers.map((organizer, index) => (
                                        <motion.tr
                                            key={organizer.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                            className={`hover:bg-slate-50 transition-colors ${isSelected(organizer.id) ? 'bg-brand-50/50' : ''
                                                }`}
                                        >
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected(organizer.id)}
                                                    onChange={() => toggleSelect(organizer.id)}
                                                    className="w-4 h-4 rounded border-slate-300 text-brand-200 focus:ring-brand-200"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-200 to-purple-500 flex items-center justify-center text-white font-bold">
                                                        {organizer.fullName?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900">{organizer.fullName}</p>
                                                        <p className="text-sm text-slate-500">{organizer.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <StatusBadge status={organizer.position} size="sm" />
                                            </td>
                                            <td className="px-4 py-3">
                                                {organizer.isAdminApproved ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        Approved
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium">
                                                        <Clock className="w-3 h-3" />
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-500">
                                                {formatDate(organizer.createdAt)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-900 font-medium">
                                                {organizer.eventsCount || 0}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <motion.button
                                                        onClick={() => onViewDetails?.(organizer)}
                                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                                        whileHover={{ scale: 1.1 }}
                                                        title="View details"
                                                    >
                                                        <ExternalLink className="w-4 h-4 text-slate-400" />
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => onSendMessage?.(organizer)}
                                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                                        whileHover={{ scale: 1.1 }}
                                                        title="Send message"
                                                    >
                                                        <Mail className="w-4 h-4 text-slate-400" />
                                                    </motion.button>
                                                    {organizer.isAdminApproved && (
                                                        <motion.button
                                                            onClick={() => onRevokeApproval?.(organizer)}
                                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                            whileHover={{ scale: 1.1 }}
                                                            title="Revoke approval"
                                                        >
                                                            <UserX className="w-4 h-4 text-red-400" />
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>

                            {paginatedOrganizers.length === 0 && (
                                <div className="py-16 text-center">
                                    <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                    <p className="text-slate-500">No organizers found</p>
                                    {(searchQuery || statusFilter || positionFilter) && (
                                        <button
                                            onClick={() => {
                                                setSearchQuery('');
                                                setStatusFilter(null);
                                                setPositionFilter(null);
                                            }}
                                            className="mt-2 text-brand-200 text-sm font-medium hover:underline"
                                        >
                                            Clear filters
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50">
                                <p className="text-sm text-slate-500">
                                    Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                                    {Math.min(currentPage * itemsPerPage, filteredOrganizers.length)} of{' '}
                                    {filteredOrganizers.length} organizers
                                </p>
                                <div className="flex items-center gap-2">
                                    <motion.button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 hover:bg-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </motion.button>
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }
                                        return (
                                            <motion.button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === pageNum
                                                        ? 'bg-brand-200 text-white'
                                                        : 'hover:bg-slate-200 text-slate-600'
                                                    }`}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {pageNum}
                                            </motion.button>
                                        );
                                    })}
                                    <motion.button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 hover:bg-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default AllOrganizersModal;
