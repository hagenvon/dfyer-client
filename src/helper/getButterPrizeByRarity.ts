export function getButterPrizeByRarity(rarity: number = 100): number {
    if (rarity < 10) {
        return 50
    }

    if (rarity < 20) {
        return 40
    }

    if (rarity < 30) {
        return 35
    }

    return 30
}