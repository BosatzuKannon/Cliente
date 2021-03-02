import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';


@Injectable({
	providedIn: 'root'
})
export class HelpersValidatorsService {

	requireMatch(control: FormControl): ValidationErrors | null {
		const selection: any = control.value;
		if (typeof selection === 'string') {
			return { requireMatch: true };
		}
		return null;
	}


}
