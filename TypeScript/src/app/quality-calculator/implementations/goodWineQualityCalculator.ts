import { ProductType } from '../../models/productType';
import { getValueWithinBounds } from '../../utils/number';
import { BaseQualityCalculator } from '../baseQualityCalculator';
import { QualityCalculator } from '../decorators/qualityCalculatorDecorator';

@QualityCalculator({ productType: ProductType.GoodWine })
export class GoodWineQualityCalculator extends BaseQualityCalculator {
    public getNextSellIn = (): number => {
        return this.product.sellIn - 1;
    };

    public getNextQuality = (): number => {
        const increaseQualityWith = this.getNextSellIn() < 0 ? 2 : 1;
        return getValueWithinBounds({
            value: this.product.quality + increaseQualityWith,
            min: this.minQuality,
            max: this.maxQuality,
        });
    };
}
