import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Ticket, ArrowRight } from 'lucide-react';
import TicketCard from './TicketCard';
import TicketDetailModal from './TicketDetailModal';
import EmptyTicketsState from './EmptyTicketsState';
import { SectionHeader, LoadingState } from '../common';

/**
 * Tickets section container with tabs, list, and detail modal
 */
function TicketsSection({
    registrations = [],
    loading = false,
    onBrowseEvents,
    showHeader = true,
    maxDisplay = 3,
    showViewAll = true,
    className = ''
}) {
    const [selectedTab, setSelectedTab] = useState('upcoming');
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Separate upcoming vs past tickets
    const { upcomingTickets, pastTickets, allTickets } = useMemo(() => {
        const now = new Date();
        const upcoming = [];
        const past = [];

        registrations.forEach(reg => {
            // Handle both nested and flat event data
            const eventObj = reg.event || reg;
            
            // Extract date with extensive fallbacks
            const eventDateStr = 
                eventObj.endDate || 
                eventObj.startDate || 
                eventObj.date || 
                eventObj.eventDate || 
                reg.startDate || 
                reg.date ||
                reg.registrationDate;

            const eventDate = eventDateStr ? new Date(eventDateStr) : null;
            
            // If date is missing, invalid, or in the future -> Upcoming
            if (!eventDate || isNaN(eventDate.getTime()) || eventDate >= now) {
                upcoming.push(reg);
            } else {
                // Only put in past if we are CERTAIN it's a past date
                past.push(reg);
            }
        });

        // Sort upcoming by date ascending (invalid/null dates at the end), past by date descending
        upcoming.sort((a, b) => {
            const getD = (r) => {
                const o = r.event || r;
                const d = o.startDate || o.date || r.startDate || r.date;
                return d ? new Date(d).getTime() : Infinity;
            };
            return getD(a) - getD(b);
        });
        past.sort((a, b) => {
            const getD = (r) => {
                const o = r.event || r;
                const d = o.startDate || o.date || r.startDate || r.date;
                return d ? new Date(d).getTime() : 0;
            };
            return getD(b) - getD(a);
        });

        return {
            upcomingTickets: upcoming,
            pastTickets: past,
            allTickets: registrations
        };
    }, [registrations]);

    const displayTickets = useMemo(() => {
        let tickets;
        switch (selectedTab) {
            case 'upcoming':
                tickets = upcomingTickets;
                break;
            case 'past':
                tickets = pastTickets;
                break;
            default:
                tickets = allTickets;
        }
        return maxDisplay ? tickets.slice(0, maxDisplay) : tickets;
    }, [selectedTab, upcomingTickets, pastTickets, allTickets, maxDisplay]);

    const totalCount = selectedTab === 'upcoming'
        ? upcomingTickets.length
        : selectedTab === 'past'
            ? pastTickets.length
            : allTickets.length;

    const hasMore = totalCount > displayTickets.length;

    const handleViewTicket = (registration) => {
        setSelectedTicket(registration);
    };

    const tabs = [
        { id: 'upcoming', label: 'Upcoming', count: upcomingTickets.length },
        { id: 'past', label: 'Past', count: pastTickets.length },
        { id: 'all', label: 'All', count: allTickets.length }
    ];

    if (loading) {
        return (
            <div className={className}>
                <LoadingState variant="ticket" count={3} />
            </div>
        );
    }

    return (
        <div className={className}>
            {/* Header */}
            {showHeader && (
                <SectionHeader
                    icon={Ticket}
                    title="My Tickets"
                    count={totalCount}
                    showAction={false}
                />
            )}

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
                {tabs.map((tab) => (
                    <motion.button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedTab === tab.id
                            ? 'bg-brand-100 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        whileTap={{ scale: 0.98 }}
                    >
                        {tab.label}
                        {tab.count > 0 && (
                            <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${selectedTab === tab.id
                                ? 'bg-[#f7f8fa]/20'
                                : 'bg-slate-200'
                                }`}>
                                {tab.count}
                            </span>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Tickets List */}
            {displayTickets.length > 0 ? (
                <div className="space-y-3">
                    {displayTickets.map((reg, index) => (
                        <TicketCard
                            key={reg.id}
                            registration={reg}
                            index={index}
                            onViewTicket={handleViewTicket}
                        />
                    ))}

                    {/* View All Button */}
                    {hasMore && showViewAll && (
                        <motion.button
                            className="w-full py-3 text-brand-200 hover:text-brand-100 text-sm font-medium flex items-center justify-center gap-1 hover:bg-brand-50 rounded-xl transition-colors"
                            whileHover={{ scale: 1.02 }}
                        >
                            View all {totalCount} tickets
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    )}
                </div>
            ) : (
                <EmptyTicketsState
                    title={selectedTab === 'upcoming' ? 'No upcoming events' : 'No tickets yet'}
                    message={selectedTab === 'upcoming'
                        ? 'Register for events to see them here'
                        : 'Register for an event to get started!'}
                    onCTA={onBrowseEvents}
                />
            )}

            {/* Ticket Detail Modal */}
            {selectedTicket && (
                <TicketDetailModal
                    registration={selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                />
            )}
        </div>
    );
}

export default TicketsSection;
