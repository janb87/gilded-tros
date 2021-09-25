import { ProductType } from '../../models/productType';
import { getValueWithinBounds } from '../../utils/number';
import { BaseQualityCalculator } from '../baseQualityCalculator';
import { QualityCalculator } from '../decorators/qualityCalculatorDecorator';

@QualityCalculator({ productType: ProductType.SmellyItem })
export class SmellyItemQualityCalculator extends BaseQualityCalculator {
    public getNextSellIn = (): number => {
        return this.product.sellIn - 1;
    };

    public getNextQuality = (): number => {
        return getValueWithinBounds({
            value: this.product.quality - 2,
            min: this.minQuality,
            max: this.maxQuality,
        });
    };
}
