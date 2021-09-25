import { Item } from '../src/item';
import { GildedTros } from '../src/gilded-tros';

const LEGENDARY_ITEM_NAME = 'B-DAWG Keychain';
const GOOD_WINE_ITEM_NAME = 'Good Wine';
const BACKSTAGE_PASS_REFACTOR_ITEM_NAME = 'Backstage passes for Re:Factor';
const BACKSTAGE_PASS_HAXX_ITEM_NAME = 'Backstage passes for HAXX';
const SMELLY_ITEM_NAMES: string[] = [
    'Duplicate Code',
    'Long Methods',
    'Ugly Variable Names',
];

function getAppInstance(items: Item[]) {
    return new GildedTros(items.map((item) => ({ ...item })).slice());
}

function runUpdateQuality({
    items,
    days,
    getExpectedItem,
}: {
    items: Item[];
    days: number;
    getExpectedItem: (originalItem: Item, day: number) => Item;
}) {
    const app = getAppInstance(items);
    for (let day = 1; day < days; day++) {
        app.updateQuality();
        expect(app.items).toEqual(
            items.map((originalItem) => {
                return getExpectedItem(originalItem, day);
            })
        );
    }
}

describe('GildedTrosTest', () => {
    test('it should lower the Quality and SellIn at the end of the day', () => {
        const items: Item[] = [
            {
                name: 'Foo',
                quality: 50,
                sellIn: 5,
            },
            {
                name: 'Bar',
                quality: 21,
                sellIn: 4,
            },
        ];
        runUpdateQuality({
            days: 3,
            items,
            getExpectedItem: (originalItem, day) => {
                return {
                    ...originalItem,
                    quality: originalItem.quality - day,
                    sellIn: originalItem.sellIn - day,
                };
            },
        });
    });

    test('it should degrade the Quality twice as fast after the SellIn date is reached', () => {
        const items: Item[] = [
            {
                name: 'Foo',
                quality: 38,
                sellIn: -5,
            },
        ];
        runUpdateQuality({
            days: 3,
            items,
            getExpectedItem: (originalItem, day) => {
                return {
                    ...originalItem,
                    quality: originalItem.quality - day * 2,
                    sellIn: originalItem.sellIn - day,
                };
            },
        });
    });

    test('it should increase the Quality of wine the older it gets', () => {
        const items: Item[] = [
            {
                name: GOOD_WINE_ITEM_NAME,
                quality: 0,
                sellIn: 2,
            },
        ];
        runUpdateQuality({
            days: 10,
            items,
            getExpectedItem: (originalItem, day) => {
                const newSellIn = originalItem.sellIn - day;
                const newQuality =
                    newSellIn < 0
                        ? originalItem.quality +
                          originalItem.sellIn +
                          (day - originalItem.sellIn) * 2
                        : originalItem.quality + day;
                return {
                    ...originalItem,
                    quality: newQuality,
                    sellIn: newSellIn,
                };
            },
        });
    });

    xtest('it should never decrease Quality of Legendary items', () => {
        const items: Item[] = [
            {
                name: LEGENDARY_ITEM_NAME,
                quality: 80,
                sellIn: 10,
            },
        ];
        runUpdateQuality({
            days: 30,
            items,
            getExpectedItem: (originalItem) => originalItem,
        });
    });

    xtest('it should increase Backstage passes Quality by 2, 10 to 5 days before the SellIn value is reached', () => {
        const items: Item[] = [
            {
                name: BACKSTAGE_PASS_REFACTOR_ITEM_NAME,
                quality: 2,
                sellIn: 12,
            },
            {
                name: BACKSTAGE_PASS_REFACTOR_ITEM_NAME,
                quality: 18,
                sellIn: 10,
            },
            /* TODO: Fix bug in implementation
            {
                name: BACKSTAGE_PASS_HAXX_ITEM_NAME,
                quality: 5,
                sellIn: 10,
            },*/
        ];
        runUpdateQuality({
            days: 5,
            items,
            getExpectedItem: (originalItem, day) => {
                const newSellIn = originalItem.sellIn - day;
                const newQuality =
                    newSellIn <= 10
                        ? originalItem.quality +
                          (originalItem.sellIn - 10) +
                          (10 - newSellIn) * 2
                        : originalItem.quality + day;
                return {
                    ...originalItem,
                    quality: newQuality,
                    sellIn: newSellIn,
                };
            },
        });
    });

    xtest('it should increase Backstage passes Quality by 3, 5 days or less before the SellIn value is reached', () => {
        const items: Item[] = [
            {
                name: BACKSTAGE_PASS_REFACTOR_ITEM_NAME,
                quality: 2,
                sellIn: 3,
            },
            {
                name: BACKSTAGE_PASS_REFACTOR_ITEM_NAME,
                quality: 18,
                sellIn: 5,
            },
            /* TODO: Fix bug in implementation
            {
                name: BACKSTAGE_PASS_HAXX_ITEM_NAME,
                quality: 5,
                sellIn: 5,
            },*/
        ];
        runUpdateQuality({
            days: 3,
            items,
            getExpectedItem: (originalItem, day) => {
                return {
                    ...originalItem,
                    quality: originalItem.quality + day * 3,
                    sellIn: originalItem.sellIn - day,
                };
            },
        });
    });

    xtest('it should set the Quality of Backstage passes to 0 when the SellIn value is negative', () => {
        const items: Item[] = [
            {
                name: BACKSTAGE_PASS_REFACTOR_ITEM_NAME,
                quality: 35,
                sellIn: 0,
            },
            {
                name: BACKSTAGE_PASS_HAXX_ITEM_NAME,
                quality: 15,
                sellIn: -1,
            },
        ];
        runUpdateQuality({
            days: 3,
            items,
            getExpectedItem: (originalItem, day) => {
                return {
                    ...originalItem,
                    quality: 0,
                    sellIn: originalItem.sellIn - day,
                };
            },
        });
    });

    xtest('it should never set a Quality bigger then 50 if it is not a Legendary item', () => {
        const items: Item[] = [
            {
                name: GOOD_WINE_ITEM_NAME,
                quality: 40,
                sellIn: -1,
            },
            {
                name: LEGENDARY_ITEM_NAME,
                quality: 80,
                sellIn: 5,
            },
        ];
        runUpdateQuality({
            days: 30,
            items,
            getExpectedItem: (originalItem, day) => {
                const expectedQuality = (() => {
                    if (originalItem.name === GOOD_WINE_ITEM_NAME) {
                        const nextQuality = originalItem.quality + day * 2;
                        if (nextQuality >= 50) {
                            return 50;
                        }
                        return nextQuality;
                    }
                    return 80;
                })();
                return {
                    ...originalItem,
                    quality: expectedQuality,
                    sellIn:
                        originalItem.name === LEGENDARY_ITEM_NAME
                            ? originalItem.sellIn
                            : originalItem.sellIn - day,
                };
            },
        });
    });

    xtest('it should always set the Quality of a lengendary item to 80', () => {
        const items: Item[] = [
            {
                name: LEGENDARY_ITEM_NAME,
                quality: 80,
                sellIn: 5,
            },
        ];
        runUpdateQuality({
            days: 30,
            items,
            getExpectedItem: (originalItem) => {
                return {
                    ...originalItem,
                    quality: 80,
                    sellIn: originalItem.sellIn,
                };
            },
        });
    });

    xtest('it should degrade Quality of smelly items twice as fast', () => {
        const items: Item[] = SMELLY_ITEM_NAMES.map((name, index): Item => {
            return {
                name: name,
                quality: 2 * (index + 1),
                sellIn: 3 * (index + 1),
            };
        });
        runUpdateQuality({
            days: 30,
            items,
            getExpectedItem: (originalItem, day) => {
                const newQaulity = originalItem.quality - day * 2;
                return {
                    ...originalItem,
                    quality: newQaulity < 0 ? 0 : newQaulity,
                    sellIn: originalItem.sellIn - day,
                };
            },
        });
    });
});
