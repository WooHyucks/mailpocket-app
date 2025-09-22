import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/utils';

export function useAsyncStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadStoredValue();
  }, [key]);

  const loadStoredValue = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const value = await storage.getItem<T>(key);
      setStoredValue(value !== null ? value : initialValue);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [key, initialValue]);

  const setValue = useCallback(
    async (value: T | ((val: T) => T)) => {
      try {
        setError(null);
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        await storage.setItem(key, valueToStore);
      } catch (err) {
        setError(err as Error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(async () => {
    try {
      setError(null);
      setStoredValue(initialValue);
      await storage.removeItem(key);
    } catch (err) {
      setError(err as Error);
    }
  }, [key, initialValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    loading,
    error,
    refresh: loadStoredValue,
  };
}
