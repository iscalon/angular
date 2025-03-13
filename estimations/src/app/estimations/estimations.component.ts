import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { TaskCompletionProbabilities } from '../model/task-completion-probabilities';
import { MediatorService } from '../services/mediator.service';

@Component({
    selector: 'app-estimations',
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule
    ],
    templateUrl: './estimations.component.html',
    styleUrl: './estimations.component.css'
})
export class EstimationsComponent implements AfterViewInit {

  @ViewChild(MatAccordion) accordion?: MatAccordion;

  form = this.formBuilder.group({
    tasks: this.formBuilder.array([this.createTaskFormGroup('Task #1')])
  });

  constructor(
    private readonly mediator: MediatorService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router) {
  }

  private createTaskFormGroup(taskName?: string): FormGroup {
    const name = taskName ?? `Task #${this.tasks.length + 1}`;
    return this.formBuilder.group(
      {
        taskName: this.formBuilder.control(name),
        bestTime: this.formBuilder.control(null as unknown as number),
        averageTime: this.formBuilder.control(null as unknown as number),
        worstTime: this.formBuilder.control(null as unknown as number)
      });
  }

  get tasks(): FormArray {
    return this.form.get('tasks') as FormArray;
  }

  ngAfterViewInit(): void { }

  addTask() {
    this.tasks.push(this.createTaskFormGroup());
  }

  deleteTask(index: number): void {
    this.tasks.removeAt(index);
  }

  onSubmit(): void {
    const tasks: TaskCompletionProbabilities[] | undefined = this.form.value.tasks;
    if (!tasks) {
      return;
    }

    this.mediator.updateTasks(tasks);
    this.router.navigate(['results']);
  }

  canSubmit(): boolean {
    return this.tasks && this.tasks.length > 0 && this.form.valid;
  }
}
