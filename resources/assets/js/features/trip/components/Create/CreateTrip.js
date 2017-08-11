import React from 'react';
import { connect } from 'react-redux';
import createTripDispatch from '../../actions';
import { bindActionCreators } from 'redux';
import Input from '../../../../app/components/Input';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Map from '../map';

class CreateTrip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startPoint: {
                address: '',
                place: null,
                lat: null,
                lng: null,
            },
            endPoint: {
                address: '',
                place: null,
                lat: null,
                lng: null,
            }
        };

        this.onChangeStartPoint = this.changeStartPoint.bind(this);
        this.onChangeEndPoint = this.changeEndPoint.bind(this);

        this.onSelectStartPoint = this.onSelectStartPoint.bind(this);
        this.onSelectEndPoint = this.onSelectEndPoint.bind(this);
    }

    changeStartPoint(address) {
        this.setState({
            startPoint: {address: address}
        });
    }

    changeEndPoint(address) {
        this.setState({
            endPoint: {address: address}
        });
    }

    onSelectStartPoint(address) {
        this.selectGeoPoint('start', address);
    }

    onSelectEndPoint(address) {
        this.selectGeoPoint('end', address);
    }

    selectGeoPoint(type, address) {
        this.setState({
            [type + 'Point']: {
                address: address,
                place: null
            }
        });

        geocodeByAddress(address)
            .then(results => {
                this.setState({
                    [type + 'Point']: {
                        place: results[0],
                        address: address,
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    }
                });
            })
            .catch(error => {
                this.setState({
                    [type + 'Point']: {
                        place: null,
                        address: address,
                        lat: null,
                        lng: null
                    }
                })
            });
    }

    onSubmit(e) {
        e.preventDefault();
        //let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJpYXQiOjE1MDIzODIxMjMsImV4cCI6MTUwMjk4NjkyMywibmJmIjoxNTAyMzgyMTIzLCJqdGkiOiIwbkdsejZzcFQzWjlleVhRIn0.otg9BJNfZa4rytNA5n--cUaOTGYl8-YVSBf0sWO5f7w';
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJpYXQiOjE1MDI0NDkwMTMsImV4cCI6MTUwMzA1MzgxMywibmJmIjoxNTAyNDQ5MDEzLCJqdGkiOiJCZWR1dE9wOTAxUzhCQjVqIn0.RZC3NxU8Sws2hBEfGMzc-5El1WX_skrYnF36kTmc9I8';
        let date = new Date(e.target['start_at'].value).getTime() / 1000;

        this.props.createTripDispatch({
            vehicle_id: e.target['vehicle_id'].value,
            start_at: Math.round(date),
            end_at: 1513036800,
            price: e.target['price'].value,
            seats: e.target['seats'].value,
            from: this.state.startPoint.place,
            to: this.state.endPoint.place,
        }, token);
    }

    render() {
        const {errors} = this.props;

        const placesCssClasses = {
            root: 'form-group',
            input: 'form-control',
            autocompleteContainer: 'autocomplete-container'
        };

        const startPoint = {
            value: this.state.startPoint.address,
            onChange: this.onChangeStartPoint,
        };

        const endPoint = {
            value: this.state.endPoint.address,
            onChange: this.onChangeEndPoint,
        };

        return (
            <div>
                <div className="col-md-6">
                    <form role="form" className="card trip-create-from" action="/api/trips/create" method="POST" onSubmit={this.onSubmit.bind(this)}>
                        <div className="card-header">
                            Create Trip
                        </div>
                        <div className="card-block">
                            <div className={"form-group row " + (errors.vehicle_id ? 'has-danger' : '')}>
                                <label className="form-control-label text-muted col-sm-4" htmlFor="vehicle_id">Select car</label>
                                <div className="col-sm-8">
                                    <select name="vehicle_id" className="form-control" id="vehicle_id" >
                                        <option value="1">1</option>
                                    </select>
                                    <div className="form-control-feedback">{ errors.vehicle_id }</div>
                                </div>
                            </div>
                            <Input
                                type="datetime-local"
                                name="start_at"
                                id="start_at"
                                required={false}
                                error={errors.start_at}>Trip start time
                            </Input>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                required={false}
                                error={errors.price}>Price
                            </Input>
                            <Input
                                type="number"
                                name="seats"
                                id="seats"
                                required={false}
                                error={errors.seats}>Available seats
                            </Input>

                            <div className={"form-group row " + (this.props.errors.from ? 'has-danger' : '')}>
                                <label className="form-control-label text-muted col-sm-4">Start Point</label>
                                <div className="col-sm-8">
                                    <PlacesAutocomplete inputProps={startPoint} classNames={placesCssClasses}
                                                        onSelect={this.onSelectStartPoint}
                                                        onEnterKeyDown={this.onSelectStartPoint}
                                    />
                                    <div className="form-control-feedback">{ this.props.errors.from }</div>
                                </div>
                            </div>

                            <div className={"form-group row " + (this.props.errors.to ? 'has-danger' : '')}>
                                <label className="form-control-label text-muted col-sm-4">End Point</label>
                                <div className="col-sm-8">
                                    <PlacesAutocomplete inputProps={endPoint} classNames={placesCssClasses}
                                                        onSelect={this.onSelectEndPoint}
                                                        onEnterKeyDown={this.onSelectEndPoint}
                                    />
                                    <div className="form-control-feedback">{ this.props.errors.to }</div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Create new trip</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-12">
                    <div className="google-map">
                        <Map
                            key={Date.now()}
                            from={[this.state.startPoint.lat, this.state.startPoint.lng]}
                            to={[this.state.endPoint.lat, this.state.endPoint.lng]} />
                    </div>
                </div>
            </div>
        )
    }
}

const CreateTripDispatch = connect(
    (state) => ({
        errors: state.trip.create.errors
    }),
    (dispatch) => bindActionCreators({createTripDispatch}, dispatch)
)(CreateTrip);

export default CreateTripDispatch;
