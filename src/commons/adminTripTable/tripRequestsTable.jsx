import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import Table from '../../commons/table';
import TripStatusDropdown from './tripStatusDropdown';

class TripRequestsTable extends Component {
    filterTripsByUser(user) {
        if (!user) return this.props.trips;
        return this.props.trips.filter(trip => trip.user.id === user.id);
    }

    prepareTableHeaders() {
        const headers = {};
        if (!this.props.user) {
            headers.firstname = 'First name';
            headers.lastname = 'Last name';
        }
        headers.destination = 'Destination';
        headers.wishStartDate = 'Start date';
        headers.wishEndDate = 'End date';
        headers.status = 'Status';
        return headers;
    }

    prepareTableContent(trips) {
        return trips.map(trip => {
            const row = {
                id: trip.id,
                destination: trip.destination.name,
                wishStartDate: moment(trip.wishStartDate).format('YYYY-MM-DD'),
                wishEndDate: moment(trip.wishEndDate).format('YYYY-MM-DD'),
                status: <TripStatusDropdown trip={trip} />
            };

            if (!this.props.user) {
                row.firstname = trip.user.firstname;
                row.lastname = trip.user.lastname;
            }

            return row;
        });
    }

    render() {
        const trips = this.filterTripsByUser(this.props.user);
        const dateFields = { from: 'wishStartDate', to: 'wishEndDate' };

        return (
            <Table
                search
                dateFields={dateFields}
                columnNames={this.prepareTableHeaders()}
                items={this.prepareTableContent(trips)}
                itemKey="id"
                link={{
                    columnName: 'firstname',
                    prefix: '/admin/users/'
                }}
            />
        );
    }
}


TripRequestsTable.propTypes = {
    trips: PropTypes.array.isRequired,
    user: PropTypes.object
};

export default TripRequestsTable;
