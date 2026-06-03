// Performance optimization utilities

/**
 * Memoizes the result of a function call
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();

  return ((...args: any[]) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Creates a promise that resolves after a delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retries a function call with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (maxRetries <= 1) throw error;

    await delay(delayMs);
    return retryWithBackoff(fn, maxRetries - 1, delayMs * 2);
  }
}

/**
 * Batches multiple function calls
 */
export function batch<T, R>(
  fn: (items: T[]) => Promise<R[]>,
  items: T[],
  batchSize: number = 10
): Promise<R[]> {
  const batches: T[][] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }

  return Promise.all(batches.map(fn)).then((results) => results.flat());
}

/**
 * Measures the performance of a function
 */
export async function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();

  try {
    const result = await fn();
    const end = performance.now();
    console.log(`${name} took ${(end - start).toFixed(2)}ms`);
    return result;
  } catch (error) {
    const end = performance.now();
    console.error(`${name} failed after ${(end - start).toFixed(2)}ms`);
    throw error;
  }
}
