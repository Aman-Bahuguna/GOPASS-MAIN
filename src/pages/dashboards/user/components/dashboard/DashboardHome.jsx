import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Ticket, CheckCircle2, Heart } from 'lucide-react';

import WelcomeSection from './WelcomeSection';
import { StatsGrid } from '../stats';
import { EventsSection } from '../events';
import { TicketsSection } from '../tickets';
import {
    MyTicketsWidget,
    DiscoverCard,
    QuickTips,
    UpcomingReminder
} from '../sidebar';
import { LoadingState, ErrorState } from '../common';

/**
 * Main dashboard home component integrating all sections
 */
function DashboardHome({
    user,
    stats,
    events = [],
    registrations = [],
    favorites = [],
    loading = false,
    error = null,
    onRegister,
    onViewDetails,
    onToggleFavorite,
    onViewTicket,
    onExploreEvents,
    onRefreshStats,
    onRefreshEvents
}) {
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Build stats data for the grid
    const statsData = [
        {
            id: 'upcoming',
            icon: Calendar,
            label: 'Upcoming Events',
            value: stats?.upcomingEvents || 0,
            color: 'blue'
        },
        {
            id: 'registrations',
            icon: Ticket,
            label: 'My Registrations',
            value: stats?.registeredEvents || 0,
            trend: stats?.registrationsTrend,
            color: 'brand'
        },
        {
            id: 'attended',
            icon: CheckCircle2,
            label: 'Events Attended',
            value: stats?.attendedEvents || 0,
            color: 'green'
        }
    ];

    // Get next upcoming registration for reminder
    const nextUpcoming = registrations
        .filter(reg => reg.event && new Date(reg.event.date) > new Date())
        .sort((a, b) => new Date(a.event.date) - new Date(b.event.date))[0];

    const handleViewTicket = (registration) => {
        setSelectedTicket(registration);
        onViewTicket?.(registration);
    };

    if (loading) {
        return (
            <div className="space-y-8">
                {/* Welcome skeleton */}
                <motion.div
                    className="h-24 bg-[#f7f8fa] rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="p-6 flex items-center gap-4">
                        <div className="w-14 h-14 bg-slate-100 rounded-2xl relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 -translate-x-full"
                                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(202,240,248,0.4) 40%, rgba(144,224,239,0.3) 50%, rgba(202,240,248,0.4) 60%, transparent 100%)' }}
                                animate={{ translateX: ['-100%', '200%'] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="h-5 bg-slate-100 rounded-lg w-48 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 -translate-x-full"
                                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(202,240,248,0.4) 40%, rgba(144,224,239,0.3) 50%, rgba(202,240,248,0.4) 60%, transparent 100%)' }}
                                    animate={{ translateX: ['-100%', '200%'] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                                />
                            </div>
                            <div className="h-3 bg-slate-100 rounded-lg w-64 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 -translate-x-full"
                                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(202,240,248,0.4) 40%, rgba(144,224,239,0.3) 50%, rgba(202,240,248,0.4) 60%, transparent 100%)' }}
                                    animate={{ translateX: ['-100%', '200%'] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats skeleton */}
                <LoadingState variant="stat" count={3} />

                {/* Main content skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <LoadingState variant="card" count={4} />
                    </div>
                    <div className="space-y-6">
                        <LoadingState variant="ticket" count={3} />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <ErrorState
                title="Unable to load dashboard"
                message={error}
                onRetry={onRefreshStats}
            />
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <WelcomeSection
                user={user}
            />

            {/* Stats Grid */}
            <StatsGrid
                stats={statsData}
                onRefresh={onRefreshStats}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Events Section - Main Column */}
                <div className="lg:col-span-2">
                    <EventsSection
                        events={events}
                        registrations={registrations}
                        favorites={favorites}
                        onRegister={onRegister}
                        onViewDetails={onViewDetails}
                        onToggleFavorite={onToggleFavorite}
                        onViewAll={onExploreEvents}
                        onRefresh={onRefreshEvents}
                        maxDisplay={6}
                    />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Next Event Reminder */}
                    {nextUpcoming && (
                        <UpcomingReminder
                            registration={nextUpcoming}
                            onViewTicket={handleViewTicket}
                        />
                    )}

                    {/* My Tickets Widget */}
                    <MyTicketsWidget
                        registrations={registrations}
                        onViewTicket={handleViewTicket}
                        maxDisplay={3}
                    />

                    {/* Discover Card */}
                    <DiscoverCard
                        onExplore={onExploreEvents}
                    />

                    {/* Quick Tips */}
                    <QuickTips />
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;
