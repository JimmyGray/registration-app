import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IAppState } from '../../store/createStore';
import { deleteEntryAction, signOutUserAction } from '../RegisterListOperations';
import Register from './Register';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    register: state.register,
    users: state.users,
    navigation: ownProps.navigation,
    registrationId: state.ui.register,
    registerList: state.registerList
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    onSignOutUser: signOutUserAction,
    onDeleteEntry: deleteEntryAction
}, dispatch);

const RegisterConnected = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterConnected;