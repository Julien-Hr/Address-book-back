import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ContactsModule,
    MongooseModule.forRoot(process.env.BDD_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
