import { Product } from '../../models/product';

export interface QualityCalculatorConstructor {
    new (product: Product): QualityCalculator;
}

export interface QualityCalculator {
    getNextSellIn: () => number;
    getNextQuality: () => number;
}
