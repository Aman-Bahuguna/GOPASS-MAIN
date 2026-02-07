import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    FileText,
    Calendar,
    Download,
    Filter,
    Check
} from 'lucide-react';
import { ActionButton } from '../common';

/**
 * Generate Report Modal Component
 * Modal for configuring and generating custom reports
 */
function GenerateReportModal({
    isOpen,
    onClose,
    onGenerate,
    reportType = 'custom',
    loading = false
}) {
    const [config, setConfig] = useState({
        dateFrom: '',
        dateTo: '',
        includeEvents: true,
        includeOrganizers: true,
        includeRegistrations: true,
        includeRevenue: true,
        format: 'pdf'
    });

    const handleChange = (field, value) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerate = () => {
        onGenerate?.(config);
    };

    const handleClose = () => {
        setConfig({
            dateFrom: '',
            dateTo: '',
            includeEvents: true,
            includeOrganizers: true,
            includeRegistrations: true,
            includeRevenue: true,
            format: 'pdf'
        });
        onClose();
    };

    const dataOptions = [
        { key: 'includeEvents', label: 'Event Statistics', description: 'Total events, categories, status breakdown' },
        { key: 'includeOrganizers', label: 'Organizer Data', description: 'Organizer activity and performance' },
        { key: 'includeRegistrations', label: 'Registration Data', description: 'Attendee count and trends' },
        { key: 'includeRevenue', label: 'Revenue Details', description: 'Fee collection and totals' }
    ];

    const formatOptions = [
        { value: 'pdf', label: 'PDF', icon: '📄' },
        { value: 'excel', label: 'Excel', icon: '📊' },
        { value: 'csv', label: 'CSV', icon: '📋' }
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
                        onClick={handleClose}
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
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="relative p-6 pb-4 border-b border-slate-100">
                                <motion.button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </motion.button>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Generate Report</h3>
                                        <p className="text-slate-500 mt-1 text-sm">
                                            Configure your custom report
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Date Range */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 mb-3 block flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Date Range
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs text-slate-500 mb-1 block">From</label>
                                            <input
                                                type="date"
                                                value={config.dateFrom}
                                                onChange={(e) => handleChange('dateFrom', e.target.value)}
                                                className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-200 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 mb-1 block">To</label>
                                            <input
                                                type="date"
                                                value={config.dateTo}
                                                onChange={(e) => handleChange('dateTo', e.target.value)}
                                                className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-200 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Data to Include */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 mb-3 block flex items-center gap-2">
                                        <Filter className="w-4 h-4" />
                                        Include in Report
                                    </label>
                                    <div className="space-y-2">
                                        {dataOptions.map((option) => (
                                            <motion.button
                                                key={option.key}
                                                onClick={() => handleChange(option.key, !config[option.key])}
                                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${config[option.key]
                                                        ? 'bg-brand-50 border-2 border-brand-200'
                                                        : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'
                                                    }`}
                                                whileHover={{ scale: 1.01 }}
                                            >
                                                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${config[option.key] ? 'bg-brand-200' : 'bg-slate-200'
                                                    }`}>
                                                    {config[option.key] && (
                                                        <Check className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 text-sm">{option.label}</p>
                                                    <p className="text-xs text-slate-500">{option.description}</p>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Export Format */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 mb-3 block flex items-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Export Format
                                    </label>
                                    <div className="flex gap-2">
                                        {formatOptions.map((format) => (
                                            <motion.button
                                                key={format.value}
                                                onClick={() => handleChange('format', format.value)}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors ${config.format === format.value
                                                        ? 'bg-brand-200 text-white'
                                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                    }`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span>{format.icon}</span>
                                                {format.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 p-6 pt-4 bg-slate-50 border-t border-slate-100">
                                <ActionButton
                                    onClick={handleClose}
                                    label="Cancel"
                                    variant="secondary"
                                    fullWidth
                                    disabled={loading}
                                />
                                <ActionButton
                                    onClick={handleGenerate}
                                    icon={Download}
                                    label="Generate Report"
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

export default GenerateReportModal;
