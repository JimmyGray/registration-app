import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IAppState } from '../../store/createStore';
import { selectRegisterAction } from '../../UIOperations';
import RegisterList from './RegisterList';
import { addRegisterAction, removeRegisterAction } from './RegisterListOperations';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    registerList: state.registerList,
    navigation: ownProps.navigation
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    addRegister: addRegisterAction,
    removeRegister: removeRegisterAction,
    selectRegister: selectRegisterAction
}, dispatch);

const RegisterListConnected = connect(mapStateToProps, mapDispatchToProps)(RegisterList);

export default RegisterListConnected;