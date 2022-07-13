import { HttpException, HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from '../contacts.controller';
import { ContactsService } from '../contacts.service';
import { contactDto } from '../dto/contact.dto';
import { IContact } from '../interfaces/contact.interface';

describe('ContactsController', () => {
  let contactController: ContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ContactsController],
      providers: [
        ContactsService,
        { provide: getModelToken('Contacts'), useValue: jest.fn() },
      ],
    }).compile();

    contactController = module.get<ContactsController>(ContactsController);
  });

  it('should be defined', () => {
    expect(contactController).toBeDefined();
  });

  describe('contacts', () => {
    const contacts = async (): Promise<IContact[]> => [
      {
        _id: 1,
        name: 'Doe',
        firstname: 'John',
        address: '1 street unknown',
        mail: 'john.doe@test.com',
        creationDate: new Date(),
        ip: '::1',
      },
    ];

    test('should return contact saved', async () => {
      jest
        .spyOn(contactController, 'getAllContacts')
        .mockImplementation(() => contacts());

      expect(await contactController.getAllContacts()).toStrictEqual(
        await contacts(),
      );
    });

    test('should create contact !', async () => {
      const newContact: contactDto = {
        name: 'Doe',
        firstname: 'John',
        mail: 'john.doe@test.com',
        address: '1 street unknown',
      };

      jest
        .spyOn(contactController, 'createContact')
        .mockImplementation(() => contacts()[0]);
      expect(await contactController.createContact('::1', newContact)).toBe(
        contacts()[0],
      );
    });

    test('should update contact !', async () => {
      const result = 'Updated !';

      jest
        .spyOn(contactController, 'updateOne')
        .mockImplementation(async () => result);

      expect(
        await contactController.updateOne({
          id: '1',
          address: '2 street unknown',
        }),
      ).toBe(result);
    });
  });
});
