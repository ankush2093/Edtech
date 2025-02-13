import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// let server: Handler;

// async function bootstrapServerlessServer() {
//      const app = await NestFactory.create(AppModule);
//      app.enableCors();
//      const httpAdapter = app.get(HttpAdapterHost);
//      app.useGlobalPipes(new ValidationPipe({ whitelist: true, stopAtFirstError: true }));
//      app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
//      await configureSwagger(app);
//      await app.init();
//      const expressApp = app.getHttpAdapter().getInstance();
//      return ServerlessExpress({ app: expressApp });
// }

// export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
//      server = server ?? (await bootstrapServerlessServer());
//      return server(event, context, callback);
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, stopAtFirstError: true }),
  );
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
   await configureSwagger(app);
  await app.listen(3500, () => {
    console.log('server run on port 3500');
  });
}

if (process.env.NODE_ENV == 'dev') {
  bootstrap();
}

async function configureSwagger(app: any) {
  if (process.env.SWAGGERUI == 'enable') {
       const options = new DocumentBuilder()
            .setTitle('Nest REST API Dmrat-Backend')
            .setDescription('Nest REST API Dmrat-Backend Description')
            .setVersion('1.0')

            .addBearerAuth(
                 {
                      name: 'access-token',
                      in: 'header',
                      type: 'apiKey',
                 },
                 'access-token',
            )
            .build();
       const document = SwaggerModule.createDocument(app, options);
       document.tags = [
            { name: 'App', description: "Application Core API'S" },
            // { name: 'Authentication', description: "Authentication API'S" },
       ];

       // app.use('/swagger', new SwaggerAuthMiddleware().use);
       SwaggerModule.setup('swagger', app, document);
  }
}
