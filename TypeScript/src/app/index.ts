import { Item } from '../item';
import { mapItemToProduct } from './mapping/mapItemToProduct';

/**
 * Update the quality of a set of products (pure function to prevent side effects, make it more testable)
 * @param items List of products with there current quality and sell in information
 * @returns Same list of products with the next quality / sell in information
 */
export function updateQuality(items: Item[]): Item[] {
    const products = items.map(mapItemToProduct);

    // TODO get quality calculator from the factory

    return products;
}
