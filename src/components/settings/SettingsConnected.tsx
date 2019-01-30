import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IAppState } from '../../store/createStore';
import Settings from './Settings';
import { toggleSettingAction } from './SettingsOperations';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    settings: state.settings,
    navigation: ownProps.navigation
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    onSettingToggle: toggleSettingAction
}, dispatch);

const SettingsConnected = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default SettingsConnected;