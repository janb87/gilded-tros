import { ProductType } from '../models/productType';
import { stringIncludesCaseInsensitive } from '../utils/string';

export function getProductType(name: string): ProductType {
    if (stringIncludesCaseInsensitive<string>(name, 'Wine')) {
        return ProductType.GoodWine;
    }
    if (stringIncludesCaseInsensitive<string>(name, 'Backstage passes')) {
        return ProductType.BackstagePass;
    }
    if (stringIncludesCaseInsensitive<string>(name, 'B-DAWG Keychain')) {
        return ProductType.Legendary;
    }
    if (
        stringIncludesCaseInsensitive<string[]>(name, [
            'Duplicate Code',
            'Long Methods',
            'Ugly Variable Names',
        ])
    ) {
        return ProductType.SmellyItem;
    }
    return ProductType.Other;
}
