import { ProductType } from '../../models/productType';
import { getValueWithinBounds } from '../../utils/number';
import { BaseQualityCalculator } from '../baseQualityCalculator';
import { QualityCalculator } from '../decorators/qualityCalculatorDecorator';

@QualityCalculator({ productType: ProductType.Other })
export class DefaultQualityCalculator extends BaseQualityCalculator {
    public getNextSellIn = (): number => {
        return this.product.sellIn - 1;
    };

    public getNextQuality = (): number => {
        const decreaseQualityWith = this.getNextSellIn() < 0 ? 2 : 1;
        return getValueWithinBounds({
            value: this.product.quality - decreaseQualityWith,
            min: this.minQuality,
            max: this.maxQuality,
        });
    };
}
