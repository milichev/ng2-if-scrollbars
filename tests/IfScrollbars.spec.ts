///<reference path="../typings/index.d.ts" />

import {Component, Renderer} from '@angular/core';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import IfScrollbarsDirective, {directiveName} from '../IfScrollbars';
import * as _ from 'lodash';
import mockModule from './mockModule';
import {TestBed, ComponentFixture, async} from '@angular/core/testing';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('IfScrollbars', () => {

    let cmp: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let cmpEl: Element;
    let mutationObserverMock;
    let debounce: Function;
    let undo: Function[];

    @Component({
        selector: 'ng2-test',
        template: `
<div
    id="cmp"
    [ng2IfScrollbars]
    [style.height]="height"
    [style.width]="width"
    style="
        overflow: auto;
        border: 1px solid #999; 
    ">
    <div style="
        height: 150px;
        width: 150px;
        border: 1px solid #77f; 
    "></div>
</div>
`
    })
    class TestComponent {
        height = '200px';
        width = '200px';

        constructor(public renderer: Renderer) {
        }
    }

    beforeEach(done => {

        TestBed.configureTestingModule({
            declarations: [
                IfScrollbarsDirective,
                TestComponent
            ],
            imports: [],
            providers: []
        });

        mutationObserverMock = {
            observe: jasmine.createSpy('observe'),
            disconnect: jasmine.createSpy('disconnect'),
            _changed: jasmine.createSpy('_changed')
        };

        undo = [];

        undo.push(mockModule(window, {

            requestAnimationFrame: jasmine.createSpy('requestAnimationFrame')
                .and.callFake(fn => fn()),

            MutationObserver: jasmine.createSpy('MutationObserver')
                .and.callFake((changed) => {
                    mutationObserverMock._changed.and.callFake(changed);
                    return mutationObserverMock;
                })

        }));

        undo.push(mockModule(_, {
            debounce: jasmine.createSpy('debounce')
                .and.callFake((fn, delay) => {
                    debounce = () => setTimeout(fn, 1);
                    return debounce;
                })
        }));

        fixture = TestBed.createComponent(TestComponent);
        fixture.whenStable()
            .then(() => {
                fixture.detectChanges();
                cmp = fixture.componentInstance;
                cmpEl = fixture.nativeElement.querySelector('#cmp');

                done();
            });
    });

    afterEach(() => {
        while (undo.length) {
            undo.shift()();
        }
    });

    it('should declare consts', () => {
        expect(directiveName).toBe('ng2IfScrollbars');
        expect(IfScrollbarsDirective.horizontalClassName).toBe('ng2-if-scrollbars-horizontal');
        expect(IfScrollbarsDirective.verticalClassName).toBe('ng2-if-scrollbars-vertical');

        expect(cmpEl.ownerDocument.defaultView).toBe(global);
    });

    it('should wire mutation observer', async(() => {
        expect(_.debounce).toHaveBeenCalledWith(jasmine.any(Function), 100);
        expect(MutationObserver).toHaveBeenCalledWith(debounce);
    }));

    it('should not add scroll classes', async(() => {
        mutationObserverMock._changed();
        setTimeout(
            () => {
                expect(cmpEl).not.toHaveClass(IfScrollbarsDirective.horizontalClassName);
                expect(cmpEl).not.toHaveClass(IfScrollbarsDirective.verticalClassName);
            },
            50);

    }));

    it('should add vertical scroll class', async(() => {
        cmp.height = '100px';
        fixture.detectChanges();
        mutationObserverMock._changed();
        setTimeout(
            () => {
                expect(cmpEl).not.toHaveClass(IfScrollbarsDirective.horizontalClassName);
                expect(cmpEl).toHaveClass(IfScrollbarsDirective.verticalClassName);
            },
            50);
    }));

    it('should add both scroll classes', async(() => {
        cmp.height = '100px';
        cmp.width = '100px';
        fixture.detectChanges();
        mutationObserverMock._changed();
        setTimeout(
            () => {
                expect(cmpEl).toHaveClass(IfScrollbarsDirective.horizontalClassName);
                expect(cmpEl).toHaveClass(IfScrollbarsDirective.verticalClassName);
            },
            50);
    }));

    it('should add horzontal scroll class', async(() => {
        cmp.width = '100px';
        fixture.detectChanges();
        mutationObserverMock._changed();
        setTimeout(
            () => {
                expect(cmpEl).toHaveClass(IfScrollbarsDirective.horizontalClassName);
                expect(cmpEl).not.toHaveClass(IfScrollbarsDirective.verticalClassName);
            },
            50);
    }));

    it('should not do nothing if no changes', async(() => {
        cmp.width = '100px';
        fixture.detectChanges();
        mutationObserverMock._changed();
        setTimeout(
            () => {
                let renderer = cmp.renderer;
                spyOn(renderer, 'setElementClass').and.callThrough();

                mutationObserverMock._changed();

                setTimeout(() => expect(renderer.setElementClass).not.toHaveBeenCalled(), 50);
            },
            50);
    }));

    it('should disconnect observer', async(() => {
        fixture.destroy();
        expect(mutationObserverMock.disconnect).toHaveBeenCalled();
    }));

});

