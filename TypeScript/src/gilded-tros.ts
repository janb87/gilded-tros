import { updateQuality } from './app';
import { Item } from './item';

export class GildedTros {
    constructor(public items: Array<Item>) {}

    public updateQuality(): void {
        const nextItems = updateQuality(this.items);
        this.items = nextItems;
    }
}
