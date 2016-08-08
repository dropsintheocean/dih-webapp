import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Header from '../../commons/pageHeader';
import Table from '../../commons/table';
import { listForUser } from '../../actions/tripActions';
import { TRIP_STATUSES } from '../../constants';

const createHandlers = (dispatch) => (userId) => dispatch(listForUser(userId));

class Trips extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers(this.props.account.id);
    }

    normalizeTripObjectsForTable(items) {
        return items.filter(value => (value.status !== TRIP_STATUSES.CLOSED))
        .map(value => (
            {
                id: value.id,
                status: value.status,
                destinationName: value.destination.name,
                startDate: moment(value.startDate).format('YYYY-MM-DD'),
                endDate: value.endDate ? moment(value.endDate).format('YYYY-MM-DD') : 'Not set'
            }
        ));
    }

    render() {
        const dateFields = { from: 'startDate', to: 'endDate' };
        const filters = [
            {
                color: 'empty',
                label: 'Pending',
                value: TRIP_STATUSES.PENDING,
                group: 'Trip status',
                field: 'status'
            },
            {
                color: 'olive',
                label: 'Accepted',
                value: TRIP_STATUSES.ACCEPTED,
                group: 'Trip status',
                field: 'status'
            },
            {
                color: 'green',
                label: 'Active',
                value: TRIP_STATUSES.ACTIVE,
                group: 'Trip status',
                field: 'status'
            },
            {
                color: 'teal',
                label: 'Present',
                value: TRIP_STATUSES.PRESENT,
                group: 'Trip status',
                field: 'status'
            },
            {
                color: 'blue',
                label: 'Left',
                value: TRIP_STATUSES.LEFT,
                group: 'Trip status',
                field: 'status'
            },
            {
                color: 'red',
                label: 'Rejected',
                value: TRIP_STATUSES.REJECTED,
                group: 'Trip status',
                field: 'status'
            }
        ];

        return (
            <div className="ui segments">
                <div className="ui segment">
                    <Header
                        content="Trips"
                        subContent="View and edit your trips"
                        icon="plane"
                    />
                </div>
                <div className="ui blue segment">
                    <Table
                        columnNames={{
                            destinationName: 'Destination',
                            startDate: 'Start date',
                            endDate: 'End date',
                            status: 'Status'
                        }}
                        itemKey="id"
                        link={{
                            columnName: 'destinationName',
                            prefix: '/trips/'
                        }}
                        items={this.normalizeTripObjectsForTable(this.props.tripsForUser)}
                        search
                        filters={filters}
                        dateFields={dateFields}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    tripsForUser: store.tripState.tripsForUser,
    account: store.accountState.account
});

Trips.propTypes = {
    tripsForUser: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Trips);
