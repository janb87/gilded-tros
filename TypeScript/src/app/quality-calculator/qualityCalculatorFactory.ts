import { Product } from '../models/product';
import { BackstagePassQualityCalculator } from './implementations/backstagePassQualityCalculator';
import { DefaultQualityCalculator } from './implementations/defaultQualityCalculator';
import { GoodWineQualityCalculator } from './implementations/goodWineQualityCalculator';
import { LegendaryQualityCalculator } from './implementations/legendaryQualityCalculator';
import { SmellyItemQualityCalculator } from './implementations/smellyItemQualityCalculator';
import {
    QualityCalculator,
    QualityCalculatorConstructor,
} from './interfaces/qualityCalculator';

const IMPLEMENTATIONS: QualityCalculatorConstructor[] = [
    DefaultQualityCalculator,
    GoodWineQualityCalculator,
    LegendaryQualityCalculator,
    BackstagePassQualityCalculator,
    SmellyItemQualityCalculator,
];

export class MissingQualityCalculatorError extends Error {}
export class MultipleQualityCalculatorsError extends Error {}

export function getQualityCalculator(product: Product): QualityCalculator {
    const matchingImplementations = IMPLEMENTATIONS.filter((implementation) => {
        return (
            implementation.isQualityCalculatorInstance === true &&
            implementation.qualityCalculatorProperties?.productType ===
                product.type
        );
    });
    if (matchingImplementations.length === 0) {
        throw new MissingQualityCalculatorError(
            `No implementation found for ${product.name} with type ${product.type}`
        );
    }
    if (matchingImplementations.length > 1) {
        throw new MultipleQualityCalculatorsError(
            `${product.name} with type ${product.type} has multiple implementations`
        );
    }
    const [QualityCalculatorImplementation] = matchingImplementations;
    return new QualityCalculatorImplementation(product);
}
