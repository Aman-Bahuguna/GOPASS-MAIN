import { useState, useCallback, useMemo } from 'react';

/**
 * useAdminData Hook
 * Centralized data management for admin dashboard
 */
export function useAdminData(initialData = {}) {
    const [organizers, setOrganizers] = useState(initialData.organizers || []);
    const [events, setEvents] = useState(initialData.events || []);
    const [activities, setActivities] = useState(initialData.activities || []);
    const [notifications, setNotifications] = useState(initialData.notifications || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Computed values
    const pendingOrganizers = useMemo(() =>
        organizers.filter(o => !o.isAdminApproved),
        [organizers]
    );

    const approvedOrganizers = useMemo(() =>
        organizers.filter(o => o.isAdminApproved),
        [organizers]
    );

    const stats = useMemo(() => ({
        pendingCount: pendingOrganizers.length,
        approvedCount: approvedOrganizers.length,
        totalOrganizers: organizers.length,
        activeEvents: events.filter(e => e.status === 'active' || e.status === 'ongoing').length,
        totalEvents: events.length,
        unreadNotifications: notifications.filter(n => !n.read).length
    }), [organizers, events, notifications, pendingOrganizers, approvedOrganizers]);

    // Refresh data
    const refresh = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // In real implementation, fetch from API
            // For now, this is a placeholder
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        organizers,
        setOrganizers,
        pendingOrganizers,
        approvedOrganizers,
        events,
        setEvents,
        activities,
        setActivities,
        notifications,
        setNotifications,
        stats,
        loading,
        error,
        refresh
    };
}

/**
 * useOrganizerActions Hook
 * Handles organizer-related actions
 */
export function useOrganizerActions(organizers, setOrganizers, addActivity) {
    const [processing, setProcessing] = useState({});

    const approveOrganizer = useCallback(async (id) => {
        setProcessing(prev => ({ ...prev, [id]: 'approving' }));
        try {
            // In real implementation, call API
            await new Promise(resolve => setTimeout(resolve, 800));

            setOrganizers(prev => prev.map(org =>
                org.id === id ? { ...org, isAdminApproved: true } : org
            ));

            addActivity?.({
                type: 'organizer_approved',
                title: 'Organizer Approved',
                description: `You approved an organizer`,
                timestamp: new Date().toISOString()
            });

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setProcessing(prev => ({ ...prev, [id]: null }));
        }
    }, [setOrganizers, addActivity]);

    const rejectOrganizer = useCallback(async (id, reason) => {
        setProcessing(prev => ({ ...prev, [id]: 'rejecting' }));
        try {
            // In real implementation, call API
            await new Promise(resolve => setTimeout(resolve, 800));

            setOrganizers(prev => prev.filter(org => org.id !== id));

            addActivity?.({
                type: 'organizer_rejected',
                title: 'Organizer Rejected',
                description: `You rejected an organizer${reason ? `: ${reason}` : ''}`,
                timestamp: new Date().toISOString()
            });

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setProcessing(prev => ({ ...prev, [id]: null }));
        }
    }, [setOrganizers, addActivity]);

    const revokeApproval = useCallback(async (id) => {
        setProcessing(prev => ({ ...prev, [id]: 'revoking' }));
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            setOrganizers(prev => prev.map(org =>
                org.id === id ? { ...org, isAdminApproved: false } : org
            ));

            addActivity?.({
                type: 'organizer_rejected',
                title: 'Approval Revoked',
                description: `You revoked organizer approval`,
                timestamp: new Date().toISOString()
            });

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setProcessing(prev => ({ ...prev, [id]: null }));
        }
    }, [setOrganizers, addActivity]);

    const bulkApprove = useCallback(async (ids) => {
        setProcessing(prev => ids.reduce((acc, id) => ({ ...acc, [id]: 'approving' }), prev));
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            setOrganizers(prev => prev.map(org =>
                ids.includes(org.id) ? { ...org, isAdminApproved: true } : org
            ));

            addActivity?.({
                type: 'organizer_approved',
                title: 'Bulk Approval',
                description: `You approved ${ids.length} organizers`,
                timestamp: new Date().toISOString()
            });

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setProcessing({});
        }
    }, [setOrganizers, addActivity]);

    const bulkReject = useCallback(async (ids) => {
        setProcessing(prev => ids.reduce((acc, id) => ({ ...acc, [id]: 'rejecting' }), prev));
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            setOrganizers(prev => prev.filter(org => !ids.includes(org.id)));

            addActivity?.({
                type: 'organizer_rejected',
                title: 'Bulk Rejection',
                description: `You rejected ${ids.length} organizers`,
                timestamp: new Date().toISOString()
            });

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setProcessing({});
        }
    }, [setOrganizers, addActivity]);

    return {
        processing,
        approveOrganizer,
        rejectOrganizer,
        revokeApproval,
        bulkApprove,
        bulkReject
    };
}

/**
 * useNotifications Hook
 * Handles notification state and actions
 */
export function useNotifications(initialNotifications = []) {
    const [notifications, setNotifications] = useState(initialNotifications);

    const unreadCount = useMemo(() =>
        notifications.filter(n => !n.read).length,
        [notifications]
    );

    const markAsRead = useCallback((id) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    }, []);

    const markAllAsRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }, []);

    const deleteNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        setNotifications([]);
    }, []);

    const addNotification = useCallback((notification) => {
        setNotifications(prev => [{
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            read: false,
            ...notification
        }, ...prev]);
    }, []);

    return {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        addNotification
    };
}

export default {
    useAdminData,
    useOrganizerActions,
    useNotifications
};
