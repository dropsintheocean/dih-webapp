import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import { retrieve, update, destroy } from '../../../../actions/userActions';
import { retrieve as retrieveAccount } from '../../../../actions/accountActions';
import { pushNotification } from '../../../../actions/notificationActions';
import Segment from '../../../../commons/Segment';
import Segments from '../../../../commons/Segments';
import Header from '../../../../commons/pageHeader';
import Navbar from '../../../../commons/navbar';

const createHandlers = (dispatch) => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
        },
        update(user) {
            return dispatch(update(user));
        },
        destroy(user) {
            return dispatch(destroy(user));
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        },
        retrieveAccount() {
            return dispatch(retrieveAccount());
        }
    }
);

class User extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            loading: true,
            pages: [
                {
                    name: 'View',
                    uri: `/admin/users/${this.props.params.userId}`
                },
                {
                    name: 'Edit',
                    uri: `/admin/users/${this.props.params.userId}/edit`
                },
                {
                    name: 'Trips',
                    uri: `/admin/users/${this.props.params.userId}/trips`
                }
            ]
        };
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.userId)
            .then(() => {
                this.setState({ loading: false });
            });
    }

    onUpdate(user) {
        const userId = parseInt(this.props.params.userId, 10);
        this.handlers.update({ id: userId, ...user })
            .then(response => {
                const message = 'User changes saved!';
                const { error } = response;
                if (!error) this.handlers.notification(message, 'success');
            })
            .then(() => this.handlers.retrieve(this.props.params.userId))
            .then(() => {
                if (this.props.account.id === userId) {
                    this.handlers.retrieveAccount(); // Update sidebar
                }
            })
            .then(() => browserHistory.push(`/admin/users/${userId}`));
    }

    prepareInitialValues(user) {
        return { ...user, birth: moment(user.birth).format('YYYY-MM-DD') };
    }

    render() {
        return (
            <Segments loading={this.state.loading}>
                <Segment>
                    <Header
                        icon="user"
                        content={`${this.props.user.firstname} ${this.props.user.lastname}`}
                        subContent="Manage user"
                    />
                </Segment>
                <Navbar pages={this.state.pages} />
                {React.cloneElement(this.props.children, {
                    initialValues: this.prepareInitialValues(this.props.user),
                    user: this.props.user,
                    showAdminFields: true,
                    onSubmit: e => this.onUpdate(e)
                })}
            </Segments>
        );
    }
}

const mapStateToProps = store => ({
    user: store.userState.user,
    account: store.accountState.account
});

User.propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(User);
