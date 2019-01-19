import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { User } from '../../../Entity/User';
import { IAppState } from '../../../store/createStore';
import { addUserAction } from '../../AdminOperations';
import AllergiesForm from './AllergiesForm';

const mapStateToProps = (_: IAppState, ownProps: any) => ({
    navigation: ownProps.navigation,
    user: ownProps.navigation.getParam('user') as User
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    onAddUser: addUserAction
}, dispatch);

const AllergiesFormConnected = connect(mapStateToProps, mapDispatchToProps)(AllergiesForm);

export default AllergiesFormConnected;