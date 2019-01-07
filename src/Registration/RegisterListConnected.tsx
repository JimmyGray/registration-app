import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IAppState } from '../store/createStore';
import { selectRegisterAction } from '../UIOperations';
import RegisterList from './RegisterList';
import { addRegisterAction } from './RegisterListOperations';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    registerList: state.registerList,
    navigation: ownProps.navigation
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    addRegister: addRegisterAction,
    selectRegister: selectRegisterAction
}, dispatch);

const RegisterListConnected = connect(mapStateToProps, mapDispatchToProps)(RegisterList);

export default RegisterListConnected;