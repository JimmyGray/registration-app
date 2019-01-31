import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IAppState } from '../../../store/createStore';
import { signInUserAction } from '../Register/RegisterOperations';
import SearchUsers from './SearchUsers';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    users: state.users,
    navigation: ownProps.navigation,
    register: state.ui.register,
    settings: state.settings
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    onSignInUser: signInUserAction
}, dispatch);

const SearchUsersConnected = connect(mapStateToProps, mapDispatchToProps)(SearchUsers);

export default SearchUsersConnected;