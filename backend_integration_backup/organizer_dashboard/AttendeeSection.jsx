import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * AttendeeSection - displays organizer's events and lets you view
 * the attendee list for a specific event. Uses mock registrations.
 *
 * Props:
 * - events: array of event objects
 */
export default function AttendeeSection({
    events = [],
    selectedEvent: propEvent = null,
    attendees: propAttendees = [],
    onBack: propBack,
}) {
    const [selectedEvent, setSelectedEvent] = useState(propEvent);
    const [attendees, setAttendees] = useState(propAttendees);
    const [loading, setLoading] = useState(false);

    // sync props into local state when provided by parent
    useEffect(() => {
        if (propEvent) setSelectedEvent(propEvent);
    }, [propEvent]);

    useEffect(() => {
        if (propAttendees) setAttendees(propAttendees);
    }, [propAttendees]);

    const handleViewRegistrations = async (evt) => {
        setSelectedEvent(evt);
        setLoading(true);
        try {
            const { getEventRegistrations } = await import('@/api');
            const regs = await getEventRegistrations(evt.id);
            setAttendees(regs || []);
        } catch (error) {
            console.error('Failed to load attendees:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setSelectedEvent(null);
        setAttendees([]);
        if (propBack) propBack();
    };

    if (selectedEvent) {
        return (
            <div className="space-y-6">
                <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 text-sm"
                >
                    &larr; Back to events
                </button>
                <h3 className="text-xl font-bold text-slate-900">Attendees for {selectedEvent.title}</h3>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-10 h-10 border-4 border-brand-100 border-t-brand-200 rounded-full animate-spin mb-4" />
                        <p className="text-slate-500">Loading attendee list...</p>
                    </div>
                ) : attendees.length === 0 ? (
                    <p className="text-slate-500">No registrations yet</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-slate-100">
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Email</th>
                                    <th className="px-4 py-2 text-left">Registered At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendees.map((reg) => (
                                    <tr key={reg.ticketId || reg.id} className="border-t">
                                        <td className="px-4 py-2 font-medium text-slate-700">
                                            {reg.studentName || reg.user?.fullName || 'Unknown'}
                                        </td>
                                        <td className="px-4 py-2 text-slate-600">
                                            {reg.studentEmail || reg.user?.email || '—'}
                                        </td>
                                        <td className="px-4 py-2 text-slate-500 text-sm">
                                            {reg.registrationDate || reg.registeredAt
                                                ? new Date(reg.registrationDate || reg.registeredAt).toLocaleString()
                                                : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Your Events</h3>
            {events.length === 0 ? (
                <p className="text-slate-500">You have no events.</p>
            ) : (
                <div className="space-y-4">
                    {events.map((evt) => (
                        <div key={evt.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow">
                            <div>
                                <h4 className="font-semibold text-slate-900">{evt.title}</h4>
                                <p className="text-sm text-slate-500">{new Date(evt.date).toLocaleDateString()}</p>
                            </div>
                            <button
                                onClick={() => handleViewRegistrations(evt)}
                                className="px-4 py-2 bg-brand-200 text-white rounded-lg hover:bg-brand-300 text-sm"
                            >
                                View Registrations
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
