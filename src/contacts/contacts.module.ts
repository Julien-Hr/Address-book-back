import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { contactSchema } from './schema/contacts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contacts', schema: contactSchema }]),
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
  // exports: [ContactsService],
})
export class ContactsModule {}
