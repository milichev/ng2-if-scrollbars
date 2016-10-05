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

Template:

```
<div
    [iexIfScrollbars]
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

# License

GPL-3.0