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
                <div className="h-24 bg-slate-100 rounded-2xl animate-pulse" />

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
