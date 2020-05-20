import { useQuery } from '@apollo/react-hooks';
import { useFieldState } from 'informed';

import { useCartContext } from '../../../context/cart';

export const usePaymentMethods = props => {
    const { queries } = props;
    const { getPaymentMethodsQuery } = queries;
    const [{ cartId }] = useCartContext();

    const { data, loading } = useQuery(getPaymentMethodsQuery, {
        variables: { cartId }
    });

    const { value: currentSelectedPaymentMethod } = useFieldState(
        'selectedPaymentMethod'
    );

    const availablePaymentMethods =
        (data && data.cart.available_payment_methods) || [];

    const freeIsAvailable = availablePaymentMethods.find(
        ({ code }) => code === 'free'
    );

    const initialSelectedMethod =
        (availablePaymentMethods.length && availablePaymentMethods[0].code) ||
        null;

    return {
        availablePaymentMethods,
        currentSelectedPaymentMethod: freeIsAvailable
            ? 'free'
            : currentSelectedPaymentMethod,
        initialSelectedMethod,
        isLoading: loading
    };
};
