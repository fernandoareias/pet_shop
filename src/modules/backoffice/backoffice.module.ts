import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './controllers/customer.controller';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.service';
import { AddressService } from './services/address.service';
import { CreditCardService } from './services/credit.card.service';
import { CustomerService } from './services/customer.service';
import { PetService } from './services/pet.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Customer',
                schema: CustomerSchema,
            },
            {
                name: 'User',
                schema: UserSchema,
            },
        ])
    ],
    controllers: [CustomerController],
    providers: [AccountService, CustomerService, AddressService, CreditCardService, PetService],
})
export class BackofficeModule {}
