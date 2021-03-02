import { NumberOnlyDirective } from './number-only/number-only.directive';
import { NgModule } from '@angular/core';
import { UpperCaseDirective } from './upper-case/upper-case.directive';

@NgModule({

	declarations: [
		NumberOnlyDirective,
		UpperCaseDirective,
	],
	exports: [
		NumberOnlyDirective,
		UpperCaseDirective,
	]
})

export class DirectiveModule { }
