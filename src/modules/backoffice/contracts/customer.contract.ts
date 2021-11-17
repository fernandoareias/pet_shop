import { Injectable } from '@nestjs/common';
import { Validation } from 'src/utils/validation';

import { Customer } from '../models/customer.models';
import { Contract } from './contract';


@Injectable()
export class CreateCustomerContract implements Contract{
    errors: any[];

    validate(model: Customer): boolean {
        const validation = new Validation();
        
        validation.hasMinLen(model.name, 5, 'Nome inválido.');
        validation.isEmail(model.email, 'Email inválido');
        validation.hasMinLen(model.document, 2, 'Documento inválido');

        this.errors = validation.errors;

        return validation.isValid();
        
    }

}