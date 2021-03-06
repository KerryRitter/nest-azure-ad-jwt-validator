import { AUDIENCE_TOKEN, TENANT_TOKEN } from './constants';
import { DynamicModule, Global, HttpModule, Module } from '@nestjs/common';

import { AzureActiveDirectoryGuard } from './guards/azure-active-directory.guard';
import { AzureTokenValidationService } from './azure-token-validation/azure-token-validation.service';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [AzureTokenValidationService, AzureActiveDirectoryGuard],
  exports: [AzureTokenValidationService, AzureActiveDirectoryGuard],
})
export class NestAzureAdJwtValidatorModule {
  static forRoot(tenantId: string, applicationId: string): DynamicModule {
    return {
      module: NestAzureAdJwtValidatorModule,
      providers: [
        AzureTokenValidationService,
        AzureActiveDirectoryGuard,
        {
          provide: AUDIENCE_TOKEN,
          useValue: applicationId,
        },
        {
          provide: TENANT_TOKEN,
          useValue: tenantId,
        },
      ],
      exports: [AzureTokenValidationService, AzureActiveDirectoryGuard],
    };
  }
}
