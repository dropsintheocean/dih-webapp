import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Table from '../../../../commons/Table';
import { listForDestinationWithStatus } from '../../../../actions/tripActions';

class VolunteersAtDestinationContainer extends React.Component {

    constructor(props) {
        super(props);
        const createHandlers = (dispatch) => () =>
            dispatch(listForDestinationWithStatus(this.props.destinationId, this.props.status)
        );
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.status === nextProps.status &&
            _.isEqual(this.props.tripsForDestination, nextProps.tripsForDestination)) {
            return false;
        }
        return true;
    }

    noramlizeTripObjectsForTable(items) {
        const cleanObjects = [];
        _.mapKeys(items, value => {
            cleanObjects.push({
                id: value.id,
                status: value.status,
                firstname: value.user.firstname,
                lastname: value.user.lastname,
                email: value.user.email,
                startDate: value.startDate,
                endDate: value.endDate
            });
        });
        return cleanObjects;
    }

    render() {
        this.handlers();
        return (
            <div>
                <p>
                    There are {this.props.tripsForDestination.length} volunteers in this list.
                </p>
                <Table
                    columnNames={{
                        firstname: 'First name',
                        lastname: 'Last name',
                        email: 'E-mail',
                        startDate: 'Start date',
                        endDate: 'End date',
                        status: 'Status'
                    }}
                    items={this.noramlizeTripObjectsForTable(this.props.tripsForDestination)}
                />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    tripsForDestination: store.tripState.tripsForDestination
});

VolunteersAtDestinationContainer.propTypes = {
    tripsForDestination: React.PropTypes.array.isRequired,
    destinationId: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(VolunteersAtDestinationContainer);
