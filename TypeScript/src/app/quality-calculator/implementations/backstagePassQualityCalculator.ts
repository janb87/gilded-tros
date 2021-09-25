import { ProductType } from '../../models/productType';
import { getValueWithinBounds } from '../../utils/number';
import { BaseQualityCalculator } from '../baseQualityCalculator';
import { QualityCalculator } from '../decorators/qualityCalculatorDecorator';

@QualityCalculator({ productType: ProductType.BackstagePass })
export class BackstagePassQualityCalculator extends BaseQualityCalculator {
    public getNextSellIn = (): number => {
        return this.product.sellIn - 1;
    };

    public getNextQuality = (): number => {
        const nextSellIn = this.getNextSellIn();
        if (nextSellIn < 0) {
            return 0;
        }
        return getValueWithinBounds({
            value: this.product.quality + this.getQualityIncrease(),
            min: this.minQuality,
            max: this.maxQuality,
        });
    };

    private getQualityIncrease = (): number => {
        const { sellIn } = this.product;
        if (sellIn >= 0 && sellIn <= 5) {
            return 3;
        }
        if (sellIn > 5 && sellIn <= 10) {
            return 2;
        }
        return 1;
    };
}
