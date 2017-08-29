import React from 'react';
import {Input} from 'app/components/Controls/index.js';
import { Button } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addSeats} from '../actions';
import {getTranslate} from 'react-localize-redux';
import {createTripRules} from 'app/services/TripService';
import Validator from 'app/services/Validator';

class StepTwo extends React.Component {
    constructor() {
        super();
        this.state = {
            price: '',
            seats: '',
            errors: {}
        };

        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSeatsChange = this.onSeatsChange.bind(this);
        this.onNext = this.onNext.bind(this);
    }

    componentWillMount() {
        this.setState({
            price: this.props.tripWizard.price || '',
            seats: this.props.tripWizard.seats || ''
        });
    }

    onPriceChange(e) {
        const value = e.target.value.match(/[0-9]+/),
            price = value && !isNaN(+value[0]) ? +value[0] : (value && value.length !== 0 ? this.state.price : '');
        this.setState({price});
    }

    onSeatsChange(e) {
        const value = +e.target.value,
            seats = value && !isNaN(value) && value > 0 ? value : (value <= 0 ? '' : this.state.seats);
        this.setState({seats});
    }

    onNext() {
        const toBeValidated = {
                price: this.state.price,
                seats: this.state.seats
            },
            {price, seats} = createTripRules(),
            validated = Validator.validate({
                price, seats
            }, toBeValidated);

        if (validated.valid) {
            this.props.addSeats(this.state);
        } else {
            this.setState({errors: validated.errors});
        }
    }

    render() {
        const {price, seats, errors} = this.state;

        return (
            <div className="row">
                <div className="col-md-4 col-sm-6">
                    <Input
                        id="price"
                        ico="fa-circle-o"
                        value={price}
                        onChange={this.onPriceChange}
                        error={errors.price}
                    >Цена за место</Input>
                </div>
                <div className="col-md-4 col-sm-6">
                    <Input
                        id="seats"
                        value={seats}
                        onChange={this.onSeatsChange}
                        error={errors.seats}
                    >Количество мест</Input>
                </div>
                <div className="col-md-4 col-sm-12">
                    <Button color="warning" size="lg" role="button" onClick={this.onNext}>Продолжить</Button>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        tripWizard: state.tripWizard,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({addSeats}, dispatch)
)(StepTwo);
