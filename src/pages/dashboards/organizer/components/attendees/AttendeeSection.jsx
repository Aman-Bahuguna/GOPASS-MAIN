import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * AttendeeSection - displays organizer's events and lets you view
 * the attendee list for a specific event.
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

    // sync props into local state when provided by parent
    useEffect(() => {
        if (propEvent) setSelectedEvent(propEvent);
    }, [propEvent]);

    useEffect(() => {
        if (propAttendees) setAttendees(propAttendees);
    }, [propAttendees]);

    const handleViewRegistrations = (evt) => {
        setSelectedEvent(evt);
        import('@/api').then(({ getEventRegistrations }) => {
            const regs = getEventRegistrations(evt.id);
            setAttendees(regs);
        });
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
                {attendees.length === 0 ? (
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
                                    <tr key={reg.id} className="border-t">
                                        <td className="px-4 py-2">{reg.user?.fullName || 'Unknown'}</td>
                                        <td className="px-4 py-2">{reg.user?.email || '—'}</td>
                                        <td className="px-4 py-2">{new Date(reg.registeredAt).toLocaleString()}</td>
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
                        <div key={evt.id} className="flex items-center justify-between bg-[#f7f8fa] p-4 rounded-2xl shadow">
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
