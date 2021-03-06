import * as actions from './actionTypes';

export const setNotifications = (data) => {
    return _.reduce(data, (collection, notification) => {
            collection['entities'][notification.id] = notification;
            collection['notifications'].push(notification.id);

            return collection;
        }, {
            type: actions.NOTIFICATION_SET_LIST,
            entities: {},
            notifications: []
        });
};

export const markAsReadNotification = (id) => ({
    type: actions.NOTIFICATION_MARK_AS_READ,
    id
});

export const setCountUnreadNotifications = (count) => ({
    type: actions.NOTIFICATION_SET_COUNT,
    count
});

export const addNotification = (notification) => {
    return {
        type: actions.NOTIFICATION_ADD,
        notification: notification
    };
};
