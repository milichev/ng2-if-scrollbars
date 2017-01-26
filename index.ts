import {NgModule} from '@angular/core';
import {IfScrollbarsDirective, getScrollState} from './IfScrollbars';

@NgModule({
    declarations: [IfScrollbarsDirective],
    exports: [IfScrollbarsDirective]
})
class IfScrollbarsModule {
}

export {
    IfScrollbarsDirective,
    getScrollState,
    IfScrollbarsModule
};
