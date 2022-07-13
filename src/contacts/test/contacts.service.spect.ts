import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from '../contacts.service';
import { contactDto } from '../dto/contact.dto';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        { provide: getModelToken('Contacts'), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  // it('Add new contact', async () => {
  //   const user1: contactDto = {
  //     name: 'user1',
  //     firstname: 'user1',
  //     mail: 'user1@test.com',
  //     address: '1 street Reunion Island',
  //   };
  //   const newUser = await service.create(user1, ':1');
  //   expect(newUser).not.toBeNull();
  // });

  it('get users', async () => {
    expect(await service.findAll()).not.toBeNull();
  });
});
