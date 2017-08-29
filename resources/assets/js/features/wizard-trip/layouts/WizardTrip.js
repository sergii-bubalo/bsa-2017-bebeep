import React from 'react';
import LangService from 'app/services/LangService';
import * as lang from '../lang/WizardTrip.json';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';
import {INIT, STEP_ONE, STEP_TWO, STEP_THREE} from '../services/WizardTripService';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {completeTrip} from '../actions';
import '../styles/wizard-trip.scss';

class WizardTrip extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.step === STEP_THREE) {
            this.props.completeTrip();
        }
    }

    render() {
        const {step} = this.props;

        return (
            <div className="container wizard-trip">
                <div className={"wizard-trip__step" + (step === INIT
                        ? ' wizard-trip__step_active'
                        : ''
                    )}
                >
                    <StepOne />
                </div>
                <div className={"wizard-trip__step" + (step === STEP_ONE
                        ? ' wizard-trip__step_active'
                        : ''
                    )}
                >
                    <StepTwo />
                </div>
                <div className={"wizard-trip__step" + (step === STEP_TWO
                        ? ' wizard-trip__step_active'
                        : ''
                    )}
                >
                    <StepThree />
                </div>
                <div className={"wizard-trip__step" + (step === STEP_THREE
                        ? ' wizard-trip__step_active'
                        : ''
                )}
                >
                    complete!
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        step: state.tripWizard.step
    }),
    dispatch => bindActionCreators({completeTrip}, dispatch)
)(WizardTrip);
