import { Item } from '../item';
import { mapItemToProduct } from './mapping/mapItemToProduct';
import { getQualityCalculator } from './quality-calculator/qualityCalculatorFactory';

/**
 * Update the quality of a set of items (pure function to prevent side effects, make it more testable)
 * @param items List of items with there current quality and sell in information
 * @returns Same list of items with the next quality / sell in information
 */
export function updateQuality(items: Item[]): Item[] {
    const products = items.map(mapItemToProduct);

    const updatedProducts = products.map((product) => {
        const { getNextSellIn, getNextQuality } = getQualityCalculator(product);
        return {
            ...product,
            quality: getNextQuality(),
            sellIn: getNextSellIn(),
        };
    });

    const updatedItems = updatedProducts.map((product) => {
        const item = { ...product };
        delete item.type;
        return item;
    });

    return updatedItems;
}
