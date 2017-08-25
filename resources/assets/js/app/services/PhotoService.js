import DRIVER_AVATAR_DEFAULT from 'app/images/user/driver_default.png';
import PASSENGER_AVATAR_DEFAULT from 'app/images/user/passenger_default.png';

export const getDriverAvatar = (driver) => {
    return driver.photo ? driver.photo : DRIVER_AVATAR_DEFAULT;
};

export const getPassengerAvatar = (passenger) => {
    return passenger.photo ? passenger.photo : PASSENGER_AVATAR_DEFAULT;
};

export const getUserAvatar = (user) => {
    return getPassengerAvatar(user);
};
