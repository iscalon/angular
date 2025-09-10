import {
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { Loader } from '../components/loader/loader';

@Directive({
  selector: '[loading]',
})
export class LoaderDirective implements OnInit, OnChanges {

  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  @Input() loading = false;
  templateView!: EmbeddedViewRef<unknown>;
  loaderRef?: ComponentRef<Loader>;

  ngOnInit(): void {
    this.templateView = this.templateRef.createEmbeddedView({});
    this.loaderRef = this.viewContainerRef.createComponent(Loader, {
      injector: this.viewContainerRef.injector,
      projectableNodes: [this.templateView.rootNodes],
    });
    this.loaderRef.setInput('loading', this.loading);
  }

  ngOnChanges(): void {
    this.loaderRef?.setInput('loading', this.loading);
  }
}
