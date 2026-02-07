import { motion } from 'framer-motion';
import { Building2, MapPin, Shield, Edit2 } from 'lucide-react';

/**
 * College Info Card Component
 * Displays college details in a premium card format
 */
function CollegeInfoCard({ user, onEdit }) {
    return (
        <motion.div
            className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
        >
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-3">
                    <div className="p-2 bg-brand-100/10 rounded-lg">
                        <Building2 className="w-5 h-5 text-brand-200" />
                    </div>
                    College Details
                </h3>
                {onEdit && (
                    <motion.button
                        onClick={onEdit}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Edit details"
                    >
                        <Edit2 className="w-4 h-4 text-slate-400" />
                    </motion.button>
                )}
            </div>

            <div className="space-y-4">
                {/* Institution Name */}
                <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">
                        Institution
                    </p>
                    <p className="font-semibold text-slate-900">{user?.college?.name || 'Not specified'}</p>
                </div>

                {/* Location Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">
                            Location
                        </p>
                        <p className="font-medium text-slate-900 text-sm flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-brand-200" />
                            {user?.college?.state || 'N/A'}
                        </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">
                            Pincode
                        </p>
                        <p className="font-medium text-slate-900 text-sm">
                            {user?.college?.pincode || 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Admin Role */}
                <div className="p-4 bg-gradient-to-r from-brand-50 to-purple-50 rounded-xl border border-brand-100/30">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">
                        Your Role
                    </p>
                    <p className="font-semibold text-brand-200 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        {user?.position || 'Admin'}
                    </p>
                </div>
            </div>

            {/* Edit Button */}
            <motion.button
                onClick={onEdit}
                className="w-full mt-5 py-3 border-2 border-brand-200 text-brand-200 rounded-xl font-semibold hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Building2 className="w-4 h-4" />
                Edit Details
            </motion.button>
        </motion.div>
    );
}

export default CollegeInfoCard;
