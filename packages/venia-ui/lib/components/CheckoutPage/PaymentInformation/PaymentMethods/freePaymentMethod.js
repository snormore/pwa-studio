import React from 'react';

import { useFreePaymentMethod } from '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/PaymentMethods/useFreePaymentMethod';

import freePaymentMethodOperations from './freePaymentMethod.gql';

const FreePaymentMethod = props => {
    const { onPaymentSuccess, shouldSubmit } = props;

    useFreePaymentMethod({
        onPaymentSuccess,
        shouldSubmit,
        ...freePaymentMethodOperations
    });

    return <div>TODO: Free method body</div>;
};

export default FreePaymentMethod;
