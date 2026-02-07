import { motion } from 'framer-motion';

/**
 * Status Badge Component
 * A reusable badge for displaying various status indicators
 */
function StatusBadge({
    status,
    size = 'md', // 'sm', 'md', 'lg'
    animate = false,
    icon: Icon,
    customColors
}) {
    const statusConfig = {
        // User/Organizer statuses
        active: {
            bg: 'bg-emerald-100',
            text: 'text-emerald-700',
            ring: 'ring-emerald-200',
            label: 'Active'
        },
        pending: {
            bg: 'bg-amber-100',
            text: 'text-amber-700',
            ring: 'ring-amber-200',
            label: 'Pending'
        },
        approved: {
            bg: 'bg-emerald-100',
            text: 'text-emerald-700',
            ring: 'ring-emerald-200',
            label: 'Approved'
        },
        rejected: {
            bg: 'bg-red-100',
            text: 'text-red-700',
            ring: 'ring-red-200',
            label: 'Rejected'
        },
        suspended: {
            bg: 'bg-slate-100',
            text: 'text-slate-600',
            ring: 'ring-slate-200',
            label: 'Suspended'
        },
        // Event statuses
        upcoming: {
            bg: 'bg-blue-100',
            text: 'text-blue-700',
            ring: 'ring-blue-200',
            label: 'Upcoming'
        },
        ongoing: {
            bg: 'bg-emerald-100',
            text: 'text-emerald-700',
            ring: 'ring-emerald-200',
            label: 'Ongoing'
        },
        completed: {
            bg: 'bg-slate-100',
            text: 'text-slate-600',
            ring: 'ring-slate-200',
            label: 'Completed'
        },
        cancelled: {
            bg: 'bg-red-100',
            text: 'text-red-700',
            ring: 'ring-red-200',
            label: 'Cancelled'
        },
        // Position types
        teacher: {
            bg: 'bg-blue-100',
            text: 'text-blue-700',
            ring: 'ring-blue-200',
            label: 'Teacher'
        },
        student: {
            bg: 'bg-emerald-100',
            text: 'text-emerald-700',
            ring: 'ring-emerald-200',
            label: 'Student'
        }
    };

    const sizeConfig = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm'
    };

    const normalizedStatus = status?.toLowerCase().replace(/_/g, '');
    const config = customColors || statusConfig[normalizedStatus] || {
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        ring: 'ring-slate-200',
        label: status
    };

    return (
        <motion.span
            className={`inline-flex items-center gap-1.5 ${sizeConfig[size]} ${config.bg} ${config.text} rounded-full font-semibold ring-1 ${config.ring}`}
            animate={animate ? { scale: [1, 1.05, 1] } : {}}
            transition={animate ? { duration: 2, repeat: Infinity } : {}}
        >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {config.label || status}
        </motion.span>
    );
}

export default StatusBadge;
