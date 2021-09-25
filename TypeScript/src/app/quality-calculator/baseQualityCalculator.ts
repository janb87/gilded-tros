import { Product } from '../models/product';
import { QualityCalculator } from './interfaces/qualityCalculator';

export abstract class BaseQualityCalculator implements QualityCalculator {
    constructor(public readonly product: Product) {}
    protected maxQuality = 50;
    protected minQuality = 0;

    public abstract getNextSellIn: () => number;
    public abstract getNextQuality: () => number;
}
