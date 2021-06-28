import { NestFactory } from '@nestjs/core';
import getConnection from 'src/infra/repositories/shared/getConnection';
import { AppModule } from './app.module';
import { ConnectionInterceptor } from './interceptors/connection.interceptor';

async function bootstrap() {
  try {
    await getConnection();
  } catch (error) {
    console.log('Fail to connect to database');
    console.error(error);
    process.exit(1);
  }
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ConnectionInterceptor())
  await app.listen(3000);
}
bootstrap();
