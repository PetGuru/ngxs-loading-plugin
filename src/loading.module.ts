import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { LoadingState } from './loading.state';

export const NGXS_LOADING_PLUGIN_OPTIONS = new InjectionToken('NGXS_LOADING_PLUGIN_OPTIONS');

@NgModule({
  imports: [NgxsModule.forFeature([LoadingState])]
})
export class NgxsLoadingPluginModule {
  static forFeature(config?: any): ModuleWithProviders<NgxsLoadingPluginModule> {
    return {
      ngModule: NgxsLoadingPluginModule,
      providers: [
        {
          provide: NGXS_LOADING_PLUGIN_OPTIONS,
          useValue: config,
          multi: true
        }
      ]
    };
  }
}