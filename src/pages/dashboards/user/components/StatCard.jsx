import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

// Stat Card Component
function StatCard({ icon: Icon, label, value, trend, color, delay }) {
    const colorClasses = {
        blue: 'bg-blue-500',
        green: 'bg-emerald-500',
        purple: 'bg-purple-500',
        orange: 'bg-orange-500',
        brand: 'bg-brand-100',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.4 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            className="bg-[#f7f8fa] rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group"
        >
            {/* Background decoration */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${colorClasses[color]} opacity-10 group-hover:opacity-20 transition-opacity`} />

            <div className="relative flex items-start justify-between">
                <div>
                    <p className="text-slate-500 text-sm font-medium">{label}</p>
                    <p className="text-4xl font-bold text-slate-900 mt-2">{value}</p>
                    {trend && (
                        <div className="flex items-center gap-1 mt-2 text-emerald-600 text-sm">
                            <TrendingUp className="w-4 h-4" />
                            <span>+{trend}% this month</span>
                        </div>
                    )}
                </div>
                <div className={`w-14 h-14 rounded-2xl ${colorClasses[color]} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                </div>
            </div>
        </motion.div>
    );
}

export default StatCard;
