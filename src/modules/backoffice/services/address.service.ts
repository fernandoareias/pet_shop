/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Promise, Model } from "mongoose"
import { Address } from "../models/address.model"
import { Customer } from "../models/customer.models"


@Injectable()
export class AddressService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {
        
        
    }
async addBillingAddress(document: string, data: Address): Promise<Customer>{
    return await this.model.findOneAndUpdate({ document }, {
        $set: {
            billingAddress: data,
        },
    }, { upsert: true });
}

async addShippingAddress(document: string, data: Address): Promise<Customer>{
    return await this.model.findOneAndUpdate({ document }, {
        $set: {
            shippingAddress: data,
        },
    }, { upsert: true });
}
}