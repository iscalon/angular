import { DestroyRef, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

export function createSearch<T>(
  control: FormControl<T>,
  debounceTimeInMilliSeconds = 500,
  destroyRef = inject(DestroyRef)
): Observable<T> {
  const destroy$ = new Subject<void>();
  destroyRef.onDestroy(() => destroy$.next());
  return control.valueChanges.pipe(
    debounceTime(debounceTimeInMilliSeconds),
    takeUntil(destroy$)
  );
}
