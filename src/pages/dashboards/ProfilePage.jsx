import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Mail,
    Building2,
    MapPin,
    Calendar,
    Shield,
    Edit3,
    Camera,
    Save,
    X,
    CheckCircle2,
    Clock,
    AlertCircle,
    GraduationCap,
    Briefcase,
    BadgeCheck,
    Ticket,
    CalendarDays,
    Users,
    Award,
    TrendingUp,
    FileText,
    ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES, USER_STATUS, ADMIN_POSITIONS, ORGANIZER_POSITIONS } from '../../utils/constants';

// Profile Stat Card
function ProfileStatCard({ icon: Icon, label, value, color = 'brand' }) {
    const colorClasses = {
        brand: 'bg-brand-100 text-white',
        green: 'bg-green-500 text-white',
        blue: 'bg-blue-500 text-white',
        purple: 'bg-purple-500 text-white',
        amber: 'bg-amber-500 text-white',
    };

    return (
        <motion.div
            className="bg-[#f7f8fa] rounded-2xl p-5 shadow-sm border border-slate-200"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
        </motion.div>
    );
}

// Status Badge Component
function StatusBadge({ status, role, isApproved }) {
    let config = { color: 'bg-slate-100 text-slate-600', label: 'Unknown', icon: AlertCircle };

    if (role === ROLES.ORGANIZER && isApproved === false) {
        config = { color: 'bg-amber-100 text-amber-700', label: 'Pending Event Approval', icon: Clock };
    } else if (status === USER_STATUS.ACTIVE) {
        config = { color: 'bg-green-100 text-green-700', label: 'Active', icon: CheckCircle2 };
    } else if (status === USER_STATUS.PENDING_PLATFORM_VERIFICATION) {
        config = { color: 'bg-blue-100 text-blue-700', label: 'Under Review', icon: Shield };
    }

    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${config.color}`}>
            <Icon className="w-4 h-4" />
            {config.label}
        </span>
    );
}

// Role Badge Component
function RoleBadge({ role }) {
    const config = {
        [ROLES.ADMIN]: { color: 'bg-purple-100 text-purple-700 border-purple-200', label: 'Administrator' },
        [ROLES.ORGANIZER]: { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Event Organizer' },
        [ROLES.USER]: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Member' },
    };

    const { color, label } = config[role] || config[ROLES.USER];

    return (
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${color}`}>
            <Shield className="w-4 h-4" />
            {label}
        </span>
    );
}

// Editable Field Component
function EditableField({ label, value, icon: Icon, isEditing, onEdit, type = 'text', options = [] }) {
    const [editValue, setEditValue] = useState(value);

    return (
        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-[#f7f8fa] shadow-sm flex items-center justify-center text-slate-600">
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">{label}</p>
                {isEditing ? (
                    type === 'select' ? (
                        <select
                            value={editValue}
                            onChange={(e) => {
                                setEditValue(e.target.value);
                                onEdit && onEdit(e.target.value);
                            }}
                            className="w-full px-3 py-2 bg-[#f7f8fa] border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-200"
                        >
                            {options.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={type}
                            value={editValue}
                            onChange={(e) => {
                                setEditValue(e.target.value);
                                onEdit && onEdit(e.target.value);
                            }}
                            className="w-full px-3 py-2 bg-[#f7f8fa] border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-200"
                        />
                    )
                ) : (
                    <p className="text-slate-900 font-medium">{value || 'Not set'}</p>
                )}
            </div>
        </div>
    );
}

// User Profile Section - Shows registered events, tickets
function UserProfileSection({ user }) {
    const registeredEvents = user?.registeredEvents?.length || 0;

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ProfileStatCard
                    icon={Ticket}
                    label="Total Tickets"
                    value={registeredEvents}
                    color="brand"
                />
                <ProfileStatCard
                    icon={CalendarDays}
                    label="Events Attended"
                    value={Math.floor(registeredEvents * 0.7)}
                    color="green"
                />
                <ProfileStatCard
                    icon={Award}
                    label="Rewards Earned"
                    value="12"
                    color="purple"
                />
                <ProfileStatCard
                    icon={TrendingUp}
                    label="Activity Score"
                    value="85%"
                    color="blue"
                />
            </div>

            {/* Recent Activity */}
            <div className="bg-[#f7f8fa] rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Interests & Preferences</h3>
                <div className="flex flex-wrap gap-2">
                    {['Technology', 'Music', 'Art', 'Sports', 'Workshops', 'Networking'].map((interest) => (
                        <span
                            key={interest}
                            className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 border border-slate-200"
                        >
                            {interest}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Organizer Profile Section - Shows events created, attendees
function OrganizerProfileSection({ user }) {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ProfileStatCard
                    icon={CalendarDays}
                    label="Events Created"
                    value={user?.isAdminApproved ? "8" : "0"}
                    color="brand"
                />
                <ProfileStatCard
                    icon={Users}
                    label="Total Attendees"
                    value={user?.isAdminApproved ? "1.2K" : "0"}
                    color="green"
                />
                <ProfileStatCard
                    icon={TrendingUp}
                    label="Engagement Rate"
                    value={user?.isAdminApproved ? "94%" : "N/A"}
                    color="purple"
                />
                <ProfileStatCard
                    icon={Award}
                    label="Rating"
                    value={user?.isAdminApproved ? "4.8" : "N/A"}
                    color="amber"
                />
            </div>

            {/* Organizer Info */}
            <div className="bg-[#f7f8fa] rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Organization Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <EditableField
                        label="Position"
                        value={ORGANIZER_POSITIONS.find(p => p.value === user?.position)?.label || user?.position}
                        icon={Briefcase}
                    />
                    <EditableField
                        label="College/Institution"
                        value={user?.college?.name}
                        icon={Building2}
                    />
                    <EditableField
                        label="State"
                        value={user?.college?.state}
                        icon={MapPin}
                    />
                    <EditableField
                        label="Pincode"
                        value={user?.college?.pincode}
                        icon={MapPin}
                    />
                </div>
            </div>

            {/* Approval Status */}
            {!user?.isAdminApproved && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-50 rounded-2xl p-6 border border-amber-200"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-amber-800">Pending Event Creation Approval</h4>
                            <p className="text-sm text-amber-700 mt-1">
                                Your account is active, but you need admin approval to create events.
                                This ensures quality and security for all participants.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

// Admin Profile Section - Shows college management stats
function AdminProfileSection({ user }) {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ProfileStatCard
                    icon={Users}
                    label="Organizers Managed"
                    value="24"
                    color="brand"
                />
                <ProfileStatCard
                    icon={CalendarDays}
                    label="College Events"
                    value="156"
                    color="green"
                />
                <ProfileStatCard
                    icon={BadgeCheck}
                    label="Approvals Given"
                    value="18"
                    color="purple"
                />
                <ProfileStatCard
                    icon={TrendingUp}
                    label="Growth Rate"
                    value="+23%"
                    color="blue"
                />
            </div>

            {/* Admin Info */}
            <div className="bg-[#f7f8fa] rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Administrative Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <EditableField
                        label="Position"
                        value={ADMIN_POSITIONS.find(p => p.value === user?.position)?.label || user?.position}
                        icon={Briefcase}
                    />
                    <EditableField
                        label="College/Institution"
                        value={user?.college?.name}
                        icon={Building2}
                    />
                    <EditableField
                        label="State"
                        value={user?.college?.state}
                        icon={MapPin}
                    />
                    <EditableField
                        label="Pincode"
                        value={user?.college?.pincode}
                        icon={MapPin}
                    />
                </div>
            </div>

            {/* ID Card Preview */}
            {user?.idCardUrl && (
                <div className="bg-[#f7f8fa] rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Verification Document</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden">
                            <img src={user.idCardUrl} alt="ID Card" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="font-medium text-slate-900">ID Card Uploaded</p>
                            <p className="text-sm text-slate-500">Verified by GoPass Platform</p>
                            <span className="inline-flex items-center gap-1 text-green-600 text-sm mt-1">
                                <CheckCircle2 className="w-4 h-4" />
                                Verified
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Main Profile Page Component
export default function ProfilePage({ onNavigate }) {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editedData, setEditedData] = useState({});

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateProfile(editedData);
            setIsEditing(false);
            setEditedData({});
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData({});
    };

    const formattedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        : 'Unknown';

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
                    <p className="text-slate-500 mt-1">Manage your personal information and preferences</p>
                </div>
                <div className="flex items-center gap-3">
                    {isEditing ? (
                        <>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCancel}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors flex items-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-4 py-2 bg-brand-200 text-white rounded-xl font-medium shadow-lg shadow-brand-200/30 flex items-center gap-2 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </motion.button>
                        </>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
                        >
                            <Edit3 className="w-4 h-4" />
                            Edit Profile
                        </motion.button>
                    )}
                </div>
            </motion.div>

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#f7f8fa] rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden"
            >
                {/* Cover Image */}
                <div className="h-36 bg-brand-200 relative">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
                </div>

                {/* Profile Info */}
                <div className="px-8 pb-8 -mt-16 relative">
                    {/* Avatar */}
                    <div className="relative inline-block">
                        <div className="w-32 h-32 rounded-2xl bg-brand-200 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-xl">
                            {user?.fullName?.charAt(0).toUpperCase()}
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-2 right-2 w-8 h-8 bg-[#f7f8fa] rounded-lg shadow-lg flex items-center justify-center text-slate-600 hover:bg-slate-50">
                                <Camera className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Name and Info */}
                    <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{user?.fullName}</h2>
                            <p className="text-slate-500 flex items-center gap-2 mt-1">
                                <Mail className="w-4 h-4" />
                                {user?.email}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <RoleBadge role={user?.role} />
                            <StatusBadge status={user?.status} role={user?.role} isApproved={user?.isAdminApproved} />
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <EditableField
                            label="Full Name"
                            value={user?.fullName || user?.name}
                            icon={User}
                            isEditing={isEditing}
                            onEdit={(val) => setEditedData({ ...editedData, fullName: val })}
                        />
                        <EditableField
                            label="Email Address"
                            value={user?.email}
                            icon={Mail}
                            type="email"
                        />
                        <EditableField
                            label="Member Since"
                            value={formattedDate}
                            icon={Calendar}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Profile Info Details (Role Specific) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                {/* Contact & Social Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#f7f8fa] rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                             <Mail className="w-5 h-5 text-brand-200" />
                             Contact Information
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-medium">Primary Email</p>
                                <p className="text-slate-900 font-medium">{user?.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-medium">Account Status</p>
                                <div className="mt-1 flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${user?.status === USER_STATUS.ACTIVE ? 'bg-green-500' : 'bg-amber-500'}`} />
                                    <span className="text-slate-700 font-medium">{user?.status || 'Pending'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#f7f8fa] rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                             <Shield className="w-5 h-5 text-brand-200" />
                             Account Security
                        </h3>
                        <div className="space-y-3">
                             <button className="w-full py-2 px-4 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-between group">
                                 Change Password
                                 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                             </button>
                             <button className="w-full py-2 px-4 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-between group">
                                 Two-Factor Auth
                                 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                             </button>
                        </div>
                    </div>
                </div>

                {/* Role Specific Stats and Content */}
                <div className="lg:col-span-2">
                    {user?.role === ROLES.USER && <UserProfileSection user={user} />}
                    {user?.role === ROLES.ORGANIZER && <OrganizerProfileSection user={user} />}
                    {user?.role === ROLES.ADMIN && <AdminProfileSection user={user} />}
                </div>
            </motion.div>
        </div>
    );
}
