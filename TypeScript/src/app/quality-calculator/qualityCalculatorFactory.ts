import { Product } from '../models/product';
import { DefaultQualityCalculator } from './implementations/defaultQualityCalculator';
import { QualityCalculator } from './interfaces/qualityCalculator';

export function getQualityCalculator(product: Product): QualityCalculator {
    return new DefaultQualityCalculator(product);
}
