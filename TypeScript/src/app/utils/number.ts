export function getValueWithinBounds({
    value,
    min,
    max,
}: {
    value: number;
    min?: number;
    max?: number;
}): number {
    if (typeof min === 'number' && value < min) {
        return min;
    }
    if (typeof max === 'number' && value > max) {
        return max;
    }
    return value;
}
