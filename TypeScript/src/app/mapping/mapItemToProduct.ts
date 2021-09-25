import { Product } from 'src/app/models/product';
import { Item } from '../../item';

export function mapItemToProduct(item: Item): Product {
    return new Product(item);
}
