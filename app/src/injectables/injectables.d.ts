interface ILink {
    title: string;
    view: any;
    isUrl?: boolean;
    selected?: boolean;
}
/* tslint:disable:interface-name */
/**
 * Wrapper interface for the Position interface, adding documentation to
 * the members.
 */
interface GeolocationPosition extends Position {
    /**
     * Contains the GeolocationPositionCoordinates for the
     * position.
     */
    coords: GeolocationPositionCoordinates;

    /**
     * A number, representing when the position
     * was acquired.
     */
    timestamp: number;
}

/**
 * Wrapper interface for the PositionError interface, adding documentation
 * to the members.
 */
interface GeolocationPositionError extends PositionError, Error {
    /**
     * Returns the error code indicating whether the position is
     * unavailable, permission was denied, or a timeout occurred.
     */
    code: number;

    /**
     * Returns an error message containing the details of the error.
     */
    message: string;

    /**
     * The position acquisition failed because the position of the
     * device could not be found.
     * value = 2;
     */
    POSITION_UNAVAILABLE: number;

    /**
     * The position acquisition failed because the app does not have
     * sufficient permiossion to use the Geolocation service.
     * value = 1;
     */
    PERMISSION_DENIED: number;

    /**
     * The position acquisition failed because the timeout specified
     * in the position options was reached before the position could
     * be found.
     * value = 3;
     */
    TIMEOUT: number;
}

/**
 * Describes an object that stores coordinate information for a
 * geolocation position.
 */
interface GeolocationPositionCoordinates extends Coordinates {
    /**
     * Geographic latitude coordinate in decimal degrees.
     */
    latitude: number;

    /**
     * Geographic longitude coordinate in decimal degrees.
     */
    longitude: number;

    /**
     * Denotes the height of position in meters. Can be
     * null, indicating the device does not provide altitude
     * information.
     */
    altitude: number;

    /**
     * Provides the accuracy of the latitude and longitude
     * coordinates (in meters).
     */
    accuracy: number;

    /**
     * Denotes the accuracy of the altitude measurement (in meters).
     */
    altitudeAccuracy: number;

    /**
     * Denotes the direction in which the device is travelling in degrees.
     * Range is from 0 (North) to 360. If the device cannot provide heading
     * information, this value is null. If the device is not in motion, this
     * value is NaN.
     */
    heading: number;

    /**
     * Denotes the magnitude of the horizontal velocity vector (in meters/second).
     * Can be null, indicating the device does not provide speed information.
     */
    speed: number;
}

/**
 * Descibes the interface for position options sent to the Geolocation
 * services.
 */
interface GeolocationPositionOptions {
    /**
     * Specifies whether the app wants to get the most accurate position. This
     * can attribute to slower response times and increased power consumption.
     * Defaults to false.
     */
    enableHighAccuracy?: boolean;

    /**
     * Specifies the time (in milliseconds) alotted from when a geolocation
     * acquisition operation starts to when the value is returned. If it takes
     * longer than the timeout, an error will be thrown. Defaults to 0, meaning
     * there is no timeout.
     */
    timeout?: number;

    /**
     * Specifies that the app accepts cached position values when the age of the
     * value is less than the specified time (in milliseconds). Defaults to 0,
     * meaning the geolocation service needs to attempt to retrieve a new location
     * every time it is requested.
     */
    maximumAge?: number;
}
/* tslint:enable:interface-name */