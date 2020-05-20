import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useCartContext } from '../../../../context/cart';

export const useFreePaymentMethod = props => {
    const { mutations, onPaymentSuccess, queries, shouldSubmit } = props;
    const { setFreePaymentMethodMutation } = mutations;
    const { getPaymentInformationQuery } = queries;

    const [{ cartId }] = useCartContext();

    const { data } = useQuery(getPaymentInformationQuery, {
        variables: { cartId }
    });

    const [setPaymentMethod] = useMutation(setFreePaymentMethodMutation);

    const availablePaymentMethods = data
        ? data.cart.available_payment_methods
        : [];

    const selectedPaymentMethod =
        (data && data.cart.selected_payment_method.code) || null;

    useEffect(() => {
        const setFreeIfAvailable = async () => {
            const freeIsAvailable = !!availablePaymentMethods.find(
                ({ code }) => code === 'free'
            );
            if (freeIsAvailable) {
                if (selectedPaymentMethod !== 'free') {
                    await setPaymentMethod({
                        variables: {
                            cartId
                        }
                    });
                }
                // If free is already selected we can just display the summary.
                onPaymentSuccess();
            } else {
                // TODO: What happens if a user submits but free is not available?
                throw new Error('Free is not an available option');
            }
        };

        if (shouldSubmit) {
            setFreeIfAvailable();
        }
    }, [
        availablePaymentMethods,
        cartId,
        onPaymentSuccess,
        selectedPaymentMethod,
        setPaymentMethod,
        shouldSubmit
    ]);

    return {};
};
