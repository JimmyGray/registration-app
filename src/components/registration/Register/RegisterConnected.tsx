import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IAppState } from '../../../store/createStore';
import Register from './Register';
import { deleteEntryAction, signOutUserAction } from './RegisterOperations';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    users: state.users,
    navigation: ownProps.navigation,
    registerEntries: state.registerEntries,
    register: state.ui.register
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    onSignOutUser: signOutUserAction,
    onDeleteEntry: deleteEntryAction
}, dispatch);

const RegisterConnected = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterConnected;