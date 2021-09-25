export function stringIncludesCaseInsensitive<
    SearchValue extends string | string[]
>(text: string, searchValue: SearchValue): boolean {
    if (Array.isArray(searchValue)) {
        return searchValue.some((value) =>
            text.toLowerCase().includes(value.toLowerCase())
        );
    }
    return text.toLowerCase().includes(searchValue.toLowerCase());
}
