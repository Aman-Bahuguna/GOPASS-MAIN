import { motion } from 'framer-motion';
import {
    Download,
    RefreshCw,
    Clock,
    ChevronRight,
    FileSpreadsheet,
    FileText as FilePdf
} from 'lucide-react';

/**
 * Report Card Component
 * Individual report card with generate and export actions
 */
function ReportCard({ report, index, onGenerate, onExport, loading = false }) {
    const colorConfig = {
        blue: {
            bg: 'bg-blue-100',
            text: 'text-blue-600',
            solid: 'bg-blue-500'
        },
        purple: {
            bg: 'bg-purple-100',
            text: 'text-purple-600',
            solid: 'bg-purple-500'
        },
        emerald: {
            bg: 'bg-emerald-100',
            text: 'text-emerald-600',
            solid: 'bg-emerald-500'
        },
        amber: {
            bg: 'bg-amber-100',
            text: 'text-amber-600',
            solid: 'bg-amber-500'
        }
    };

    const config = colorConfig[report.color] || colorConfig.blue;
    const Icon = report.icon;

    const formatLastGenerated = (dateString) => {
        if (!dateString) return 'Never generated';

        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffDays === 0) return 'Generated today';
        if (diffDays === 1) return 'Generated yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 overflow-hidden group"
        >
            {/* Header accent */}
            <div className={`h-2 ${config.solid}`} />

            <div className="p-5">
                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <motion.div
                        className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                        <Icon className={`w-6 h-6 ${config.text}`} />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 group-hover:text-brand-200 transition-colors">
                            {report.title}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                            {report.description}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            {formatLastGenerated(report.lastGenerated)}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
                    <motion.button
                        onClick={onGenerate}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <RefreshCw className="w-4 h-4" />
                                Generate
                            </>
                        )}
                    </motion.button>

                    {/* Export dropdown */}
                    <div className="relative group/export">
                        <motion.button
                            onClick={onExport}
                            className="flex items-center gap-2 py-2.5 px-4 bg-brand-100 hover:bg-brand-200 text-white rounded-xl text-sm font-medium transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Download className="w-4 h-4" />
                            Export
                        </motion.button>

                        {/* Export format options */}
                        <motion.div
                            className="absolute bottom-full right-0 mb-2 w-40 bg-[#f7f8fa] rounded-xl shadow-lg border border-slate-200 overflow-hidden opacity-0 invisible group-hover/export:opacity-100 group-hover/export:visible transition-all z-10"
                        >
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                                <FilePdf className="w-4 h-4 text-red-500" />
                                Export as PDF
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                                <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                                Export as Excel
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ReportCard;
