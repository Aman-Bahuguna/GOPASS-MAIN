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
            className="bg-ui-200 rounded-2xl border border-ui-400/20 overflow-hidden"
        >
            <div className="p-6 border-b border-ui-400/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center shadow-lg shadow-brand-100/20">
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-white">{title}</h3>
                        {description && <p className="text-sm text-ui-500">{description}</p>}
                    </div>
                </div>
            </div>
            <div className="divide-y divide-ui-400/20">
                {children}
            </div>
        </motion.div>
    );
}
