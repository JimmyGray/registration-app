import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IAppState } from '../store/createStore';
import Admin from './Admin';
import { removeUserAction } from './AdminOperations';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    users: state.users,
    navigation: ownProps.navigation
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    onRemoveUser: removeUserAction
}, dispatch);


const AdminConnected = connect(mapStateToProps, mapDispatchToProps)(Admin);

export default AdminConnected;