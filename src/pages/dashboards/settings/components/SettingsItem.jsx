import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/**
 * Settings Item Component
 * Individual setting row with icon, label, description, and action
 */
export default function SettingsItem({
    icon: Icon,
    label,
    description,
    action,
    onClick,
    danger = false,
    subtitle = null
}) {
    return (
        <motion.div
            className={`p-4 hover:bg-slate-50 transition-colors ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
            whileHover={onClick ? { x: 4 } : {}}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${danger ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <p className={`font-medium ${danger ? 'text-red-600' : 'text-slate-900'}`}>{label}</p>
                        {description && <p className="text-sm text-slate-500">{description}</p>}
                        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
                    </div>
                </div>
                {action || (onClick && <ChevronRight className="w-5 h-5 text-slate-400" />)}
            </div>
        </motion.div>
    );
}
