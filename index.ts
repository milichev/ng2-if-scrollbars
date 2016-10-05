import {NgModule} from '@angular/core';
import IfScrollbarsDirective, {getScrollState} from './lib/IfScrollbars';

export {
    IfScrollbarsDirective,
    getScrollState
};

@NgModule({
    declarations: [IfScrollbarsDirective],
    exports: [IfScrollbarsDirective]
})
export class IfScrollbarsModule {
}
