export function buildOrderUrl(pricelistId: string, period: string): string {
  const params = new URLSearchParams({
    pricelist: pricelistId,
    order_period: period,
  });
  return `/order?${params.toString()}`;
}
