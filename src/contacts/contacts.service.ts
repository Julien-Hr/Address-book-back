import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { contactDto } from './dto/contact.dto';
import { IContact } from './interfaces/contact.interface';
import * as moment from 'moment-timezone';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel('Contacts') private contactsModel: Model<IContact>,
  ) {}

  async create(contact: contactDto, ip: string): Promise<any> {
    try {
      const { name, firstname, mail, address } = contact;
      const findContact = await this.findOneContact(mail);

      if (findContact)
        throw new HttpException('Email already exist', HttpStatus.CONFLICT);

      return this.contactsModel.create({
        name,
        firstname,
        mail,
        address,
        creationDate: moment().tz(process.env.TIMEZONE_SERVER),
        ip: ip,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async findOneContact(mail: string) {
    return this.contactsModel.findOne({ mail });
  }

  async findAll(): Promise<IContact[]> {
    return await this.contactsModel.find({});
  }

  async UpdateOne(id: string, newAddress: string) {
    if (!id) throw new HttpException('Id vide !', HttpStatus.NOT_FOUND);
    if (!(await this.contactsModel.findById({ _id: id })))
      throw new HttpException('contact introuvable !', HttpStatus.NOT_FOUND);

    try {
      await this.contactsModel.findByIdAndUpdate(
        { _id: id },
        { address: newAddress },
      );
      return 'Updated !';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
