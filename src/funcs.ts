export function getCurrentPage(take: number, skip: number): number {
  if (skip === 0) {
    return 1;
  } else {
    return Math.ceil(skip / take) + 1;
  }
}
