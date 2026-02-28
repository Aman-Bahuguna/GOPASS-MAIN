import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart as PieChartIcon, RefreshCw } from 'lucide-react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { FilterDropdown } from '../common';

/**
 * Analytics Dashboard Component
 * Comprehensive analytics view with multiple chart types
 */
function AnalyticsDashboard({
    eventsData = [],
    registrationsData = [],
    categoriesData = [],
    revenueData = [],
    timePeriod = 'month',
    onPeriodChange,
    loading = false,
    className = ''
}) {
    const [activeChart, setActiveChart] = useState('all');

    // Period options
    const periodOptions = [
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'quarter', label: 'This Quarter' },
        { value: 'year', label: 'This Year' }
    ];

    // Sample data if none provided
    const defaultEventsData = eventsData.length ? eventsData : [
        { label: 'Jan', value: 12 },
        { label: 'Feb', value: 19 },
        { label: 'Mar', value: 15 },
        { label: 'Apr', value: 25 },
        { label: 'May', value: 22 },
        { label: 'Jun', value: 30 }
    ];

    const defaultRegistrationsData = registrationsData.length ? registrationsData : [
        { label: 'Week 1', value: 120 },
        { label: 'Week 2', value: 180 },
        { label: 'Week 3', value: 150 },
        { label: 'Week 4', value: 220 },
        { label: 'Week 5', value: 280 },
        { label: 'Week 6', value: 250 }
    ];

    const defaultCategoriesData = categoriesData.length ? categoriesData : [
        { label: 'Technical', value: 35 },
        { label: 'Cultural', value: 25 },
        { label: 'Sports', value: 20 },
        { label: 'Workshop', value: 15 },
        { label: 'Others', value: 5 }
    ];

    const defaultRevenueData = revenueData.length ? revenueData : [
        { label: 'Hackathon', value: 45000 },
        { label: 'Workshop A', value: 32000 },
        { label: 'Cultural Fest', value: 28000 },
        { label: 'Sports Meet', value: 18000 },
        { label: 'Tech Talk', value: 12000 }
    ];

    const chartTabs = [
        { id: 'all', label: 'All Charts' },
        { id: 'events', label: 'Events', icon: BarChart3 },
        { id: 'registrations', label: 'Registrations', icon: TrendingUp },
        { id: 'categories', label: 'Categories', icon: PieChartIcon }
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Analytics Overview</h3>
                    <p className="text-sm text-slate-500">Visual insights for your college events</p>
                </div>
                <div className="flex items-center gap-3">
                    <FilterDropdown
                        label="Period"
                        options={periodOptions}
                        value={timePeriod}
                        onChange={onPeriodChange}
                        placeholder="This Month"
                    />
                    {loading && (
                        <RefreshCw className="w-5 h-5 text-slate-400 animate-spin" />
                    )}
                </div>
            </div>

            {/* Chart Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {chartTabs.map((tab) => (
                    <motion.button
                        key={tab.id}
                        onClick={() => setActiveChart(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${activeChart === tab.id
                                ? 'bg-brand-200 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {tab.icon && <tab.icon className="w-4 h-4" />}
                        {tab.label}
                    </motion.button>
                ))}
            </div>

            {/* Charts Grid */}
            <div className={`grid gap-6 ${activeChart === 'all' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
                }`}>
                {/* Events by Month */}
                {(activeChart === 'all' || activeChart === 'events') && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <BarChart3 className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900">Events by Month</h4>
                                <p className="text-xs text-slate-500">Number of events created each month</p>
                            </div>
                        </div>
                        <BarChart
                            data={defaultEventsData}
                            height={200}
                            colorScheme="brand"
                        />
                    </motion.div>
                )}

                {/* Registration Trends */}
                {(activeChart === 'all' || activeChart === 'registrations') && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900">Registration Trends</h4>
                                <p className="text-xs text-slate-500">Weekly registration patterns</p>
                            </div>
                        </div>
                        <LineChart
                            data={defaultRegistrationsData}
                            height={200}
                            lineColor="#10B981"
                            areaColor="rgba(16, 185, 129, 0.1)"
                        />
                    </motion.div>
                )}

                {/* Category Distribution */}
                {(activeChart === 'all' || activeChart === 'categories') && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <PieChartIcon className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900">Category Distribution</h4>
                                <p className="text-xs text-slate-500">Events by category</p>
                            </div>
                        </div>
                        <PieChart
                            data={defaultCategoriesData}
                            size={180}
                            donut
                            colorScheme="rainbow"
                        />
                    </motion.div>
                )}

                {/* Top Events by Revenue */}
                {(activeChart === 'all' || activeChart === 'events') && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <BarChart3 className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900">Top Events by Revenue</h4>
                                <p className="text-xs text-slate-500">Highest earning events</p>
                            </div>
                        </div>
                        <BarChart
                            data={defaultRevenueData}
                            horizontal
                            colorScheme="rainbow"
                            showLabels
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default AnalyticsDashboard;
