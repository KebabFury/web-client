import { Observable } from 'rxjs';

class StorageState {
  public constructor(private readonly _storage: Storage) {}

  public getItem(key: string): string | undefined {
    return this._storage.getItem(key) || undefined;
  }

  public setItem(key: string, value: string | undefined = undefined): void {
    const oldValue = this.getItem(key);

    if (oldValue !== value) {
      if (value !== undefined) {
        this._storage.setItem(key, value);
      } else {
        this._storage.removeItem(key);
      }

      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
          newValue: value,
          oldValue: oldValue,
        })
      );
    }
  }
}

export const LocalStorageState = new StorageState(localStorage);

export function fromStorageState<T extends string>(
  key: string
): Observable<T | undefined> {
  return new Observable<T | undefined>(subscriber => {
    subscriber.next(LocalStorageState.getItem(key) as T | undefined);

    function handler(evt: StorageEvent) {
      if (evt.key === key && evt.oldValue !== evt.newValue) {
        subscriber.next(evt.newValue as T | undefined);
      }
    }

    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('storage', handler);
    };
  });
}
