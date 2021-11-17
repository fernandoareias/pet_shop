/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { CreateCustomerContract } from '../contracts/customer.contract';
import { CreateCustomerDto } from '../dtos/create.customer.dto';
import { Customer } from '../models/customer.models';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {

  constructor(private readonly accountService: AccountService,
    private readonly customerService: CustomerService) {


  }

  @Get()
  async get() {
    return "batata";
  }

  @Get(':document')
  getById(@Param('document') document) {
    return 'Obter os clientes ' + document;
    }   
    
  @Post()
  //@UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    try {
      const user = await this.accountService.create(new User(model.document, model.password, true));
      const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user);
      return await this.customerService.create(customer);

    } catch (error) {
      // Rollback manual, remove o user/customer criado com erro
      return "Houve um error";
    }
   
    
  }

  
  @Put(':document')
  //@UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  put(@Param('document') document, @Body() body: Customer) {
    return {
      customer: document,
      data: body,
    };
  }
  
  @Delete(':document')
  delete(@Param('document') document) {
    return 'Obter os clientes';
  }
}
