import {
    findMatchingProductOption,
    findMatchingProductOptionValue
} from '../productVariants';

import { product, variant } from '../__fixtures__/product';

describe('findMatchingProductOption', () => {
    const findMatch = findMatchingProductOption;

    test('it finds matches successfully', () => {
        const variantOption = variant.options[0];

        const result = findMatch({ product, variantOption });

        expect(result).toBeInstanceOf(Object);
    });

    test('it returns undefined when no match is found', () => {
        const variantOption = Object.assign({}, variant.options[0], {
            label: 'NO_MATCH '
        });

        const result = findMatch({ product, variantOption });

        expect(result).toBeUndefined();
    });
});

describe('findMatchingProductOptionValue', () => {
    const findMatch = findMatchingProductOptionValue;

    test('it finds matches successfully', () => {
        const variantOption = variant.options[0];

        const result = findMatch({ product, variantOption });

        expect(result).toBeInstanceOf(Object);
        expect(result.option).toBeDefined();
        expect(result.value).toBeDefined();
    });

    test('it returns the correct object when no match is found due to no matching option', () => {
        const variantOption = Object.assign({}, variant.options[0], {
            label: 'NO_MATCH '
        });

        const result = findMatch({ product, variantOption });

        expect(result).toBeInstanceOf(Object);
        expect(result.option).toBeUndefined();
        expect(result.value).toBeUndefined();
    });

    test('it returns the correct object when no match is found due to no matching value', () => {
        const variantOption = Object.assign({}, variant.options[0], {
            value: 'NO_MATCH '
        });

        const result = findMatch({ product, variantOption });

        expect(result).toBeInstanceOf(Object);
        expect(result.option).toBeDefined();
        expect(result.value).toBeUndefined();
    });
});
