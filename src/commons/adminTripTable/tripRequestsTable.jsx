import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import Table from '../../commons/table';
import TripStatusDropdown from './tripStatusDropdown';

class TripRequestsTable extends Component {
    getTrips() {
        let trips = this.props.trips;
        if (this.props.userId) {
            trips = this.filterTripsByUser(trips, this.props.userId);
        }
        if (this.props.destinationId) {
            trips = this.filterTripsByDestination(trips, this.props.destinationId);
        }
        return trips;
    }

    filterTripsByUser(trips, userId) {
        return trips.filter(trip => trip.user.id === userId);
    }

    filterTripsByDestination(trips, destinationId) {
        return trips.filter(trip => trip.destinationId === destinationId);
    }

    prepareTableHeaders() {
        const headers = {};
        if (!this.props.userId) {
            headers.firstname = 'First name';
            headers.lastname = 'Last name';
        }

        if (!this.props.destinationId) {
            headers.destination = 'Destination';
        }

        headers.startDate = 'Start date';
        headers.endDate = 'End date';
        headers.status = 'Status';
        return headers;
    }

    prepareTableContent(trips) {
        return trips.map(trip => {
            const row = {
                id: trip.id,
                userId: trip.userId,
                startDate: moment(trip.startDate).format('YYYY-MM-DD'),
                endDate: trip.endDate ? moment(trip.endDate).format('YYYY-MM-DD') : 'Not set',
                status: <TripStatusDropdown trip={trip} />
            };

            if (!this.props.userId) {
                row.firstname = trip.user.firstname;
                row.lastname = trip.user.lastname;
            }

            if (!this.props.destinationId) {
                row.destination = trip.destination.name;
            }

            return row;
        });
    }

    linkKey() {
        if (!this.props.userId) {
            return 'userId';
        }

        return 'id';
    }

    linkElement() {
        if (!this.props.userId) {
            return {
                columnName: 'firstname',
                prefix: '/admin/users/',
                suffix: '/trips'
            };
        }

        return {
            columnName: 'destination',
            prefix: '/admin/trips/'
        };
    }

    render() {
        const trips = this.getTrips();
        const dateFields = { from: 'startDate', to: 'endDate' };

        return (
            <Table
                search
                dateFields={dateFields}
                columnNames={this.prepareTableHeaders()}
                items={this.prepareTableContent(trips)}
                itemKey="id"
                linkKey={this.linkKey()}
                link={this.linkElement()}
            />
        );
    }
}


TripRequestsTable.propTypes = {
    trips: PropTypes.array.isRequired,
    userId: PropTypes.number,
    destinationId: PropTypes.number
};

export default TripRequestsTable;
