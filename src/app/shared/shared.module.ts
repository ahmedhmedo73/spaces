import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';

let modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  DialogModule,
  VirtualScrollerModule,
  ButtonModule,
  ToastModule,
  SkeletonModule
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class SharedModule {}
