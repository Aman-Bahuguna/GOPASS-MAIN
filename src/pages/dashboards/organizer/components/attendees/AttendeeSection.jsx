import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Download, ArrowLeft, Mail, Calendar, User, ExternalLink, Filter } from 'lucide-react';
import { getEventRegistrations } from '@/api';

/**
 * AttendeeSection - Premium Attendee management for organizers
 */
export default function AttendeeSection({
    events = [],
    selectedEvent: initialEvent = null,
    attendees: initialAttendees = [],
    onBack
}) {
    const [selectedEvent, setSelectedEvent] = useState(initialEvent);
    const [attendees, setAttendees] = useState(initialAttendees);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (initialEvent && initialEvent.id !== selectedEvent?.id) {
            setSelectedEvent(initialEvent);
            setAttendees(initialAttendees);
        }
    }, [initialEvent, initialAttendees]);

    const handleViewRegistrations = async (evt) => {
        setLoading(true);
        setSelectedEvent(evt);
        try {
            const regs = await getEventRegistrations(evt.id);
            // regs is already extract from .content by eventsApi.js
            setAttendees(regs);
        } catch (err) {
            console.error('Failed to load attendees:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else if (selectedEvent && !initialEvent) {
            setSelectedEvent(null);
            setAttendees([]);
        }
    };

    const filteredAttendees = attendees.filter(reg => {
        const name = reg.user?.fullName?.toLowerCase() || '';
        const email = reg.user?.email?.toLowerCase() || '';
        return name.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
    });

    if (selectedEvent) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* Header Card */}
                <div className="bg-[#f7f8fa] p-6 rounded-3xl border border-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <motion.button
                                onClick={handleBack}
                                className="p-2 hover:bg-slate-200 rounded-xl transition-colors"
                                whileHover={{ x: -3 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-600" />
                            </motion.button>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 line-clamp-1">{selectedEvent.title}</h1>
                                <p className="text-slate-500 text-sm flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    {attendees.length} Registered Attendees
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <motion.button 
                                className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold flex items-center gap-2"
                                whileHover={{ y: -2 }}
                            >
                                <Download className="w-4 h-4" />
                                Export List
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="relative flex-1 min-w-[280px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-200/20 focus:border-brand-200 outline-none transition-all"
                        />
                    </div>
                    <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                        <Filter className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Attendees List */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    {loading ? (
                        <div className="p-20 text-center">
                            <div className="w-12 h-12 border-4 border-brand-200/20 border-t-brand-200 rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-slate-500">Fetching attendees...</p>
                        </div>
                    ) : attendees.length === 0 ? (
                        <div className="p-20 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No Attendees Yet</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">When students register for this event, they will appear here.</p>
                        </div>
                    ) : filteredAttendees.length === 0 ? (
                        <div className="p-20 text-center">
                            <p className="text-slate-500">No attendees found matching "{searchTerm}"</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-left">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Attendee</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Registration Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    <AnimatePresence>
                                        {filteredAttendees.map((reg, idx) => (
                                            <motion.tr 
                                                key={reg.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="hover:bg-slate-50 transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-200 font-bold uppercase ring-2 ring-white">
                                                            {reg.user?.fullName?.charAt(0) || 'U'}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900 group-hover:text-brand-200 transition-colors">
                                                                {reg.user?.fullName || 'Unknown Student'}
                                                            </div>
                                                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                                                <User className="w-3 h-3" />
                                                                ID: {reg.id.substring(0, 8)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <Mail className="w-4 h-4 text-slate-400" />
                                                            {reg.user?.email || 'N/A'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <Calendar className="w-4 h-4 text-slate-400" />
                                                        {new Date(reg.registeredAt).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                        confirmed
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-brand-200">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Attendee Management</h1>
                    <p className="text-slate-500">View and manage registrations for your events.</p>
                </div>
            </div>

            {events.length === 0 ? (
                <div className="bg-[#f7f8fa] rounded-3xl border border-slate-200 p-12 text-center mt-8">
                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900">No Events Found</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mt-2">
                        Create an event first to start tracking registrations.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {events.map((evt, idx) => (
                        <motion.div 
                            key={evt.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-[#f7f8fa] rounded-3xl border border-slate-200 p-5 flex flex-col group active:scale-[0.98] transition-all cursor-pointer"
                            onClick={() => handleViewRegistrations(evt)}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-brand-50 rounded-2xl group-hover:bg-brand-100 transition-colors">
                                    <Users className="w-6 h-6 text-brand-200 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-100">
                                    {evt.totalRegistrations || 0} RSVPs
                                </span>
                            </div>
                            
                            <h3 className="font-bold text-slate-900 group-hover:text-brand-200 transition-colors line-clamp-1">{evt.title}</h3>
                            <p className="text-xs text-slate-500 mt-1 mb-4">
                                ID: {evt.id.substring(0, 8)}...
                            </p>

                            <div className="mt-auto pt-4 border-t border-slate-200/50 flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(evt.startDate || evt.date).toLocaleDateString()}
                                </span>
                                <button className="text-brand-200 text-sm font-bold flex items-center gap-1 group/btn">
                                    View List
                                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

