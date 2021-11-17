/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { CreateCustomerContract } from '../contracts/customer.contract';
import { CreateCustomerDto } from '../dtos/create.customer.dto';
import { QueryDto } from '../dtos/query.dto';
import { Address } from '../models/address.model';
import { CreditCard } from '../models/credit-card.model';
import { Customer } from '../models/customer.models';
import { Pet } from '../models/pet.models';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { AddressService } from '../services/address.service';
import { CreditCardService } from '../services/credit.card.service';
import { CustomerService } from '../services/customer.service';
import { PetService } from '../services/pet.service';

@Controller('v1/customers')
export class CustomerController {

  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
    private readonly addressService: AddressService,
    private readonly creditCardService: CreditCardService,
    private readonly petService: PetService) {


  }

  @Get()
  async getAll() {
    return this.customerService.findAll();
  }

  @Get(':document')
  async getByDocument(@Param('document') document) {
    return  await this.customerService.find(document);
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

  @Post(':document/address/billing')
  async addBillingAddress(@Param('document') document , @Body() model: Address) {
    try {
      return await this.addressService.addBillingAddress(document, model);
    } catch (error) {
      // Rollback manual, remove o user/customer criado com erro
      return "Houve um error";
    }
  }

  

  @Post(':document/address/shipping')
  async addShippingAddress(@Param('document') document , @Body() model: Address) {
    try {
      return await this.addressService.addShippingAddress(document, model);
    } catch (error) {
      // Rollback manual, remove o user/customer criado com erro
      return "Houve um error";
    }
  }

  @Post(':document/pets/')
  async addPets(@Param('document') document , @Body() model: Pet) {
    try {
      return await this.petService.createPet(document, model);
    } catch (error) {
      // Rollback manual, remove o user/customer criado com erro
      return "Não foi possível criar o pet.";
    }
  }

  @Post('query')
  async query(@Body() model: QueryDto) {
    try {
      return await this.customerService.query(model);
    } catch (error) {
      // Rollback manual, remove o user/customer criado com erro
      return "Não foi possível criar o pet.";
    }
  }

  @Post(':document/credit-cards')
  async creditCard(@Param('document') document, @Body() model: CreditCard) {
    try {
      return await this.creditCardService.saveOrUpdateCreditCard(document, model);
    } catch (error) {
      // Rollback manual, remove o user/customer criado com erro
      return "Não foi possível criar o pet.";
    }
  }

  @Put(':document/pets/:id')
  async updatePets(@Param('document') document, @Param('id') id, @Body() model: Pet) {
    try {
      return await this.petService.updatePet(document, id, model);
    } catch (error) {
      // Rollback manual, remove o user/customer criado com erro
      return "Não foi possível atualizar o pet.";
    }
  }
  
  @Delete(':document')
  async delete(@Param('document') document) {
    return await this.customerService.removeCustomer(document);
  }
}
