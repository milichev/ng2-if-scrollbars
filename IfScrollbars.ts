import {Directive, Input, OnDestroy, ElementRef, Renderer, AfterViewInit} from '@angular/core';
import * as _ from 'lodash';

@Directive({
    selector: `[ng2IfScrollbars]`// tslint:disable-line:directive-selector
})
class IfScrollbarsDirective implements OnDestroy, AfterViewInit {
    static verticalClassName = 'ng2-if-scrollbars-vertical';
    static horizontalClassName = 'ng2-if-scrollbars-horizontal';

    @Input('ng2IfScrollbars') className = ''; // tslint:disable-line:no-input-rename
    private destroyers: Function[] = [];
    private previous: {vertical: boolean, horizontal: boolean};

    constructor(private elementRef: ElementRef,
                private renderer: Renderer) {
    }

    ngAfterViewInit(): void {
        let changed = _.debounce(() => window.requestAnimationFrame(() => this.checkScrolls()), 100);

        let observer = new this.elementRef.nativeElement.ownerDocument.defaultView.MutationObserver(changed);
        observer.observe(this.elementRef.nativeElement, {
            childList: true,
            attributes: true,
            subtree: true
        });


        this.destroyers.push(() => observer.disconnect());
        this.destroyers.push(this.renderer.listen(window, 'resize', changed));
    }

    ngOnDestroy(): void {
        while (this.destroyers.length) {
            this.destroyers.shift()();
        }
    }

    private checkScrolls() {
        let element = this.elementRef.nativeElement;
        let scrolls = getScrollState(element);

        if (!this.previous || this.previous.vertical !== scrolls.vertical || this.previous.horizontal !== scrolls.horizontal) {
            if (this.className) {
                this.renderer.setElementClass(element, this.className, scrolls.vertical || scrolls.horizontal);
            }

            this.renderer.setElementClass(element, IfScrollbarsDirective.verticalClassName, scrolls.vertical);
            this.renderer.setElementClass(element, IfScrollbarsDirective.horizontalClassName, scrolls.horizontal);

            this.previous = scrolls;
        }
    }
}

/**
 * Returns an object with boolean values specifying if scrollbars are visible on the element.
 *
 * @param {Element} element
 * @returns {{vertical: boolean, horizontal: boolean}}
 */
function getScrollState(element: Element): {vertical: boolean, horizontal: boolean} {
    let style = element.ownerDocument.defaultView.getComputedStyle(element, undefined);
    let horizontal = style.overflowX === 'scroll' || (style.overflowX === 'auto' && element.clientWidth < element.scrollWidth);
    let vertical = style.overflowY === 'scroll' || (style.overflowY === 'auto' && element.clientHeight < element.scrollHeight);
    return {
        vertical,
        horizontal
    };
}

export {getScrollState, IfScrollbarsDirective}
