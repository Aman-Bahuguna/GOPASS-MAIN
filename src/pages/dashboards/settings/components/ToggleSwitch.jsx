import { motion } from 'framer-motion';

/**
 * Toggle Switch Component
 * A reusable animated toggle switch for boolean settings
 */
export default function ToggleSwitch({ enabled, onToggle, disabled = false }) {
    return (
        <motion.button
            onClick={() => !disabled && onToggle(!enabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } ${enabled ? 'bg-brand-200' : 'bg-slate-300'}`}
            whileTap={!disabled ? { scale: 0.95 } : {}}
        >
            <motion.div
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                animate={{ x: enabled ? 26 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
        </motion.button>
    );
}
