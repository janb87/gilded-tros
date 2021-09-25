import { ProductType } from '../../models/productType';
import { getValueWithinBounds } from '../../utils/number';
import { BaseQualityCalculator } from '../baseQualityCalculator';
import { QualityCalculator } from '../decorators/qualityCalculatorDecorator';

@QualityCalculator({ productType: ProductType.Legendary })
export class LegendaryQualityCalculator extends BaseQualityCalculator {
    protected override maxQuality = 80;
    protected override minQuality = 80;

    public getNextSellIn = (): number => {
        return this.product.sellIn;
    };

    public getNextQuality = (): number => {
        return getValueWithinBounds({
            value: this.product.quality - 1,
            min: this.minQuality,
            max: this.maxQuality,
        });
    };
}
