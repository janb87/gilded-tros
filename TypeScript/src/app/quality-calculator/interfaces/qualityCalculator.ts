import { Product } from '../../models/product';
import { ProductType } from '../../models/productType';

export interface QualityCalculatorConstructor {
    new (product: Product): QualityCalculator;
    isQualityCalculatorInstance?: boolean;
    qualityCalculatorProperties?: QualityCalculatorProperties;
}

export interface QualityCalculatorProperties {
    productType: ProductType;
}

export interface QualityCalculator {
    getNextSellIn: () => number;
    getNextQuality: () => number;
}
