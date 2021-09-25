import { Item } from '../item';
import { mapItemToProduct } from './mapping/mapItemToProduct';
import { Product } from './models/product';
import { getQualityCalculator } from './quality-calculator/qualityCalculatorFactory';

/**
 * Update the quality of a set of items (pure function to prevent side effects, make it more testable)
 * @param items List of items with there current quality and sell in information
 * @returns List of products with the next quality / sell in information
 */
export function updateQuality(items: Item[]): Product[] {
    const products = items.map(mapItemToProduct);

    const updatedProducts = products.map((product) => {
        const { getNextSellIn, getNextQuality } = getQualityCalculator(product);
        return new Product({
            ...product,
            quality: getNextQuality(),
            sellIn: getNextSellIn(),
        });
    });

    return updatedProducts;
}
