import moment from 'moment';

import { securedRequest } from 'app/services/RequestService';

const CreateTripService = {

    sendCreatedTrip(data) {
        const request = '/api/v1/trips';

        return securedRequest.post(request, data)
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            )
    }
};

export default CreateTripService;
