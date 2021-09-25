import { Item } from '../../item';
import { Product } from '../models/product';

export function mapItemToProduct(item: Item): Product {
    return new Product(item);
}
