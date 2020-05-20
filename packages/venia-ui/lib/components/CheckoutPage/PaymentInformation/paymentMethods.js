import React from 'react';
import { shape, string, bool, func } from 'prop-types';
import { RadioGroup } from 'informed';

import { usePaymentMethods } from '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/usePaymentMethods';

import { mergeClasses } from '../../../classify';
import Radio from '../../RadioGroup/radio';
import FreePaymentMethod from './PaymentMethods/freePaymentMethod';

import CreditCard from './creditCard';
import paymentMethodOperations from './paymentMethods.gql';
import defaultClasses from './paymentMethods.css';

const PAYMENT_METHOD_COMPONENTS_BY_CODE = {
    braintree: CreditCard
    // checkmo: CheckMo,
    // etc
};

const PaymentMethods = props => {
    const {
        classes: propClasses,
        shouldSubmit,
        setDoneEditing,
        onPaymentSuccess,
        onPaymentError,
        resetShouldSubmit
    } = props;

    const classes = mergeClasses(defaultClasses, propClasses);

    const talonProps = usePaymentMethods({
        ...paymentMethodOperations
    });

    const {
        availablePaymentMethods,
        currentSelectedPaymentMethod,
        initialSelectedMethod,
        isLoading
    } = talonProps;

    if (isLoading) {
        return null;
    }

    // In the case of "free" don't render the radios.
    if (currentSelectedPaymentMethod === 'free') {
        return (
            <FreePaymentMethod
                onPaymentSuccess={onPaymentSuccess}
                shouldSubmit={shouldSubmit}
            />
        );
    }

    const radios = availablePaymentMethods.map(({ code, title }) => {
        // If we don't have an implementation for a method type, ignore it.
        if (!Object.keys(PAYMENT_METHOD_COMPONENTS_BY_CODE).includes(code)) {
            return;
        }

        const isSelected = currentSelectedPaymentMethod === code;
        const Component = PAYMENT_METHOD_COMPONENTS_BY_CODE[code] || null;

        return (
            <div key={code} className={classes.payment_method}>
                <Radio
                    label={title}
                    value={code}
                    classes={{
                        label: classes.radio_label
                    }}
                    checked={isSelected}
                />
                {isSelected && (
                    <Component
                        onPaymentSuccess={onPaymentSuccess}
                        onPaymentError={onPaymentError}
                        resetShouldSubmit={resetShouldSubmit}
                        setDoneEditing={setDoneEditing}
                        shouldSubmit={shouldSubmit}
                    />
                )}
            </div>
        );
    });

    return (
        <div className={classes.root}>
            <RadioGroup
                field="selectedPaymentMethod"
                initialValue={initialSelectedMethod}
            >
                {radios}
            </RadioGroup>
        </div>
    );
};

export default PaymentMethods;

PaymentMethods.propTypes = {
    classes: shape({
        root: string,
        payment_method: string,
        radio_label: string
    }),
    shouldSubmit: bool,
    selectedPaymentMethod: string,
    onPaymentSuccess: func,
    onPaymentError: func,
    resetShouldSubmit: func
};
