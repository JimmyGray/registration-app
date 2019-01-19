import { connect } from 'react-redux';
import { IAppState } from '../store/createStore';
import Reports from './Reports';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    users: state.users,
    navigation: ownProps.navigation
});

const ReportsConnected = connect(mapStateToProps)(Reports);

export default ReportsConnected;