import { connect } from 'react-redux';
import { IAppState } from '../../store/createStore';
import Allergies from './Allergies';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    users: state.users,
    navigation: ownProps.navigation
});

const AllergiesConnected = connect(mapStateToProps)(Allergies);

export default AllergiesConnected;