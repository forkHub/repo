// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

const settings: AppSettings = {
  'clientId': '15ec004b-6b42-48c1-a14a-5c8075a6db9a',
  'clientSecret': 'YOUR_CLIENT_SECRET_HERE_IF_USING_APP_ONLY',
  'tenantId': 'YOUR_TENANT_ID_HERE_IF_USING_APP_ONLY',
  'authTenant': 'common',
  'graphUserScopes': [
    'user.read',
    'mail.read',
    'mail.send'
  ]
};

export interface AppSettings {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  authTenant: string;
  graphUserScopes: string[];
}

export default settings;
