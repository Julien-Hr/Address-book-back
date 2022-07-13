import { Body, Controller, Get, Ip, Patch, Post, Req } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { contactDto } from './dto/contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private contactService: ContactsService) {}
  @Get()
  getAllContacts() {
    return this.contactService.findAll();
  }

  @Post()
  async createContact(@Ip() ip: string, @Body() body: contactDto) {
    return this.contactService.create(body, ip);
  }

  @Patch()
  updateOne(@Body() body: { id: string; address: string }) {
    return this.contactService.UpdateOne(body.id, body.address);
  }
}
