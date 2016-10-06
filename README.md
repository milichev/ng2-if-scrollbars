# ng2-if-scrollbars

The Angular 2 directive determines if the DOM element has scrollbars.
When vertical or horizontal scroll bar is visible, it adds `ng2-if-scrollbars-vertical` 
or `ng2-if-scrollbars-horizontal` CSS classes on the element. This is useful when 
the styling is dependent on the scrollbars visibility.

## Installation

```
npm i --save ng2-if-scrollbars
```

## Usage

The package module needs to be imported in the application module where the directive is used:
 
```
import {IfScrollbarsModule} from 'ng2-if-scrollbars';

@NgModule({
    imports: [
        IfScrollbarsModule
    ],
    exports: [
        IfScrollbarsModule
    }
})
export class AppModule {
}

```

Template:

```
<div
    [ng2IfScrollbars]
    style="
        height: 100px; 
        width: 200px; 
        overflow: auto;
    ">
    <div style="
        height: 150px;
        width: 150px;
    "></div>
</div>
```

The `ng2-if-scrollbars-vertical` CSS class will be added on the top `div` element.

The state of scrollbars is updated on the element DOM change or `Window` resize.


## Contribution

Please fork and do your improvements according 
to the [Angular 2 style recommendations](https://angular.io/styleguide).

### Testing

The project contains Karma configuration for unit testing the code. You can run it either with
 
```
npm run test
```

or connecting the `karma.conf.js` 
to [your favourite IDE](https://www.jetbrains.com/help/webstorm/2016.2/running-unit-tests-on-karma.html).

## License

GPL-3.0