import { getValueWithinBounds } from '../../utils/number';
import { BaseQualityCalculator } from '../baseQualityCalculator';

export class DefaultQualityCalculator extends BaseQualityCalculator {
    public getNextSellIn = (): number => {
        return this.product.sellIn - 1;
    };

    public getNextQuality = (): number => {
        return getValueWithinBounds({
            value: this.product.quality - 1,
            min: this.minQuality,
            max: this.maxQuality,
        });
    };
}
