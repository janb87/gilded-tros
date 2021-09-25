import {
    QualityCalculatorProperties,
    QualityCalculatorConstructor,
} from '../interfaces/qualityCalculator';

export function QualityCalculator(properties: QualityCalculatorProperties) {
    return (target: QualityCalculatorConstructor): void => {
        target.isQualityCalculatorInstance = true;
        target.qualityCalculatorProperties = properties;
    };
}
