import { connect } from 'react-redux';
import { IAppState } from '../../store/createStore';
import Attendances from './Attendances';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    registerEntries: state.registerEntries,
    navigation: ownProps.navigation
});

const AttendancesConnected = connect(mapStateToProps)(Attendances);

export default AttendancesConnected;