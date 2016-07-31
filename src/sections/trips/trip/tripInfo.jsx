import React, { PropTypes } from 'react';

import { TRAVEL_METHODS } from '../../../constants';
import List from '../../../commons/list';
import ListItem from '../../../commons/list/listItem';
import FluidListItem from '../../../commons/list/fluidListItem';
import moment from 'moment';

const MOMENT_FORMAT = 'dddd, MMMM Do YYYY';

const TripInfo = (props) => (
    <List>
        <ListItem
            name="Start date"
            icon="calendar"
            content={props.trip.startDate ?
                moment(props.trip.startDate).format(MOMENT_FORMAT) : 'Not set'}
        />
        <ListItem
            name="End date"
            icon="calendar"
            content={props.trip.endDate ?
                moment(props.trip.endDate).format(MOMENT_FORMAT) : 'Not set'}
        />
        <ListItem
            name="Date of departure towards destinaton"
            icon="calendar"
            content={props.trip.departureDate ?
                moment(props.trip.departureDate).format(MOMENT_FORMAT) : 'Not set'}
        />
        <ListItem
            name="Date of arrival at destination"
            icon="calendar"
            content={props.trip.arrivalDate ?
                moment(props.trip.arrivalDate).format(MOMENT_FORMAT) : 'Not set'}
        />
        <ListItem
            name="Method of travel"
            icon="map"
            content={props.trip.travelMethod}
        />
        <ListItem
            name="Aiport the flight departs from"
            icon="marker"
            content={props.trip.departureAirport}
            hidden={props.trip.travelMethod !== TRAVEL_METHODS.PLANE}
        />
        <ListItem
            name="Flight number"
            icon="plane"
            content={props.trip.flightNumber}
            hidden={props.trip.travelMethod !== TRAVEL_METHODS.PLANE}
        />
        <FluidListItem
            name="Travel information"
            icon="train"
            content={props.trip.otherTravelInformation}
            hidden={props.trip.travelMethod !== TRAVEL_METHODS.OTHER}
        />
        <ListItem
            name="Hotel"
            icon="hotel"
            content={props.trip.hotel}
        />
        <FluidListItem
            name="Notes"
            icon="info circle"
            content={props.trip.notes}
        />
    </List>
);

TripInfo.propTypes = {
    trip: PropTypes.object
};

export default TripInfo;