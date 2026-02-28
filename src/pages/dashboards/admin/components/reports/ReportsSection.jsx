import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    BarChart3,
    Download,
    Calendar,
    RefreshCw,
    ChevronRight
} from 'lucide-react';
import { SectionHeader, FilterDropdown, ActionButton } from '../common';
import ReportCard from './ReportCard';
import QuickMetrics from './QuickMetrics';

/**
 * Reports Section Component
 * Dashboard for viewing and generating reports
 */
function ReportsSection({
    metrics = {},
    onGenerateReport,
    onExportReport,
    onViewAllReports,
    loading = false
}) {
    const [timePeriod, setTimePeriod] = useState('month');

    // Time period options
    const periodOptions = [
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'quarter', label: 'This Quarter' },
        { value: 'year', label: 'This Year' }
    ];

    // Available reports
    const reports = [
        {
            id: 'event_summary',
            title: 'Event Summary',
            description: 'Overview of all events with attendance and revenue stats',
            icon: Calendar,
            color: 'blue',
            lastGenerated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'organizer_activity',
            title: 'Organizer Activity',
            description: 'Events created per organizer with performance metrics',
            icon: BarChart3,
            color: 'purple',
            lastGenerated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'registration_trends',
            title: 'Registration Trends',
            description: 'Registration patterns over time with conversion rates',
            icon: FileText,
            color: 'emerald',
            lastGenerated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'revenue_report',
            title: 'Revenue Report',
            description: 'Financial overview with fee collection breakdown',
            icon: FileText,
            color: 'amber',
            lastGenerated: null
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <SectionHeader
                    icon={BarChart3}
                    title="Reports & Analytics"
                    iconBgColor="bg-indigo-100"
                    iconColor="text-indigo-600"
                />
                <div className="flex items-center gap-3">
                    <FilterDropdown
                        label="Period"
                        options={periodOptions}
                        value={timePeriod}
                        onChange={(v) => setTimePeriod(v || 'month')}
                        placeholder="This Month"
                    />
                    {onViewAllReports && (
                        <ActionButton
                            onClick={onViewAllReports}
                            label="View All"
                            variant="secondary"
                            size="sm"
                        />
                    )}
                </div>
            </div>

            {/* Quick Metrics */}
            <QuickMetrics
                metrics={metrics}
                timePeriod={timePeriod}
                loading={loading}
            />

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report, index) => (
                    <ReportCard
                        key={report.id}
                        report={report}
                        index={index}
                        onGenerate={() => onGenerateReport?.(report.id, timePeriod)}
                        onExport={() => onExportReport?.(report.id, timePeriod)}
                    />
                ))}
            </div>

            {/* Custom Report CTA */}
            <motion.div
                className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold text-slate-900">Need a custom report?</h4>
                        <p className="text-sm text-slate-500 mt-1">
                            Generate a customized report with specific date ranges and filters
                        </p>
                    </div>
                    <ActionButton
                        onClick={() => onGenerateReport?.('custom', timePeriod)}
                        label="Create Custom Report"
                        icon={FileText}
                        variant="primary"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default ReportsSection;
