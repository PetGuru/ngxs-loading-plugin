import { Injectable, Inject } from '@angular/core';
import {
  State,
  Store,
  Actions,
  ofActionDispatched,
  ofActionCompleted,
  StateContext,
  Action,
  createSelector
} from '@ngxs/store';

import { NGXS_LOADING_PLUGIN_OPTIONS } from './loading.module';
import { Loading } from './loading.actions';

@State<Record<string, boolean>>({
  name: 'loading',
  defaults: {}
})
@Injectable()
export class LoadingState {
  constructor(
    @Inject(NGXS_LOADING_PLUGIN_OPTIONS) private options: any,
    private store: Store,
    private actions$: Actions
  ) {
    this.options.map((options) => {
      Object.values(options.actions).map((action: any) => {
        const name = `${options.prefix}${action.prototype.constructor.name}`;

        this.actions$.pipe(
          ofActionDispatched(action),
        ).subscribe(() => this.store.dispatch(new Loading.Start(action, name)));

        this.actions$.pipe(
          ofActionCompleted(action),
        ).subscribe(() => this.store.dispatch(new Loading.Complete(action, name)));
      });
    })

  }

  @Action(Loading.Start as any)
  loadingStart(ctx: StateContext<Record<string, boolean>>, action: Loading.Start) {
    ctx.patchState({
      [action.key]: true
    });
  }

  @Action(Loading.Complete as any)
  loadingComplete(ctx: StateContext<Record<string, boolean>>, action: Loading.Complete) {
    ctx.patchState({
      [action.key]: false
    });
  }

  static loading(loadingKey: string) {
    return createSelector([LoadingState], (state: Record<string, boolean>) => {
      return state[loadingKey];
    });
  }
}