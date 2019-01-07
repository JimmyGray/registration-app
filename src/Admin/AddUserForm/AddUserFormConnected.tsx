import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUserAction } from '../AdminOperations';
import AddUserForm from './AddUserForm';

const mapStateToProps = (_: any, ownProps: any) => ({
    navigation: ownProps.navigation
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    onAddUser: addUserAction
}, dispatch);

const AddUserFormConnected = connect(mapStateToProps, mapDispatchToProps)(AddUserForm);

export default AddUserFormConnected;