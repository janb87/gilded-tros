import { Item } from '../../item';
import { getProductType } from '../mapping/getProductType';
import { ProductType } from './productType';

/**
 * More complete implementation of the Item class
 * TODO: talk to the QA guy to see if
 *    - we can add the type property
 *    - mark all properties as read-only
 *    - use an object as input for the constructor (to avoid for example passing quality and sellIn in the wrong order)
 *    - replace toString with print (prevent overwriting default methods from the Ojbect.prototype)
 */
export class Product implements Item {
    public constructor(item: Item) {
        this.name = item.name;
        this.quality = item.quality;
        this.sellIn = item.sellIn;
        this.type = getProductType(item.name);
    }

    public readonly name: string;
    public readonly sellIn: number;
    public readonly quality: number;
    public readonly type: ProductType;

    public print(): string {
        return Item.prototype.toString.call(this);
    }

    /**
     * DEPRECATED: use print method
     */
    public toString(): string {
        return Item.prototype.toString.call(this);
    }
}
