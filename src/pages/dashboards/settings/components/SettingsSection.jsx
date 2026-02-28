import { motion } from 'framer-motion';

/**
 * Settings Section Component
 * A container for grouping related settings with header
 */
export default function SettingsSection({ title, description, icon: Icon, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
            <div className="px-6 py-5 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shadow-lg shadow-brand-100/20">
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-slate-900">{title}</h3>
                        {description && <p className="text-sm text-slate-500">{description}</p>}
                    </div>
                </div>
            </div>
            <div className="divide-y divide-slate-200">
                {children}
            </div>
        </motion.div>
    );
}
