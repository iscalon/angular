import { NgClass } from '@angular/common';
import { AfterViewInit, Directive, inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee-service';
import { Subscription } from 'rxjs';

/* S'applique à toutes les balises <a> qui ont un 'routerLink' */
@Directive({
  selector: 'a[routerLink]',
  hostDirectives: [NgClass],
})
export class EmployeeAvailability implements AfterViewInit, OnDestroy {
  private readonly ngClassRef = inject(NgClass);
  private readonly routerLinkRef = inject(RouterLink);
  private readonly employeeService = inject(EmployeeService);

  private subscriptions = new Subscription();

  ngAfterViewInit() {
    const href = this.routerLinkRef.href;
    if (!href) {
      return;
    }
    if (!href.startsWith('/employees/details')) {
      return;
    }
    const urlTree = this.routerLinkRef.urlTree;
    if (!urlTree) {
      return;
    }
    const primaryChild = urlTree.root.children['primary'];
    if (!primaryChild) {
      return;
    }
    const lastSegment = primaryChild.segments.at(-1);
    if (!lastSegment) {
      return;
    }
    const employeeId = +lastSegment.path;
    if (!employeeId) {
      return;
    }

    this.subscriptions.add(
      this.employeeService.getEmployee(employeeId).subscribe((employee) => {
        this.ngClassRef.ngClass = {
          'not-available': !employee.isAvailable,
        };
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
