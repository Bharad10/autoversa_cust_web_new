/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  base_url:"https://autoversa.com/autoversa_api/",
  //base_url:"https://autoversa.com/maraghiapp_api/",
  //base_url: "http://localhost:8080/",
  //base_url:"http://192.168.1.7:8080/",
  SOCKET_ENDPOINT: "http://localhost:3000/",
  nm_url: "http://nasermohsin.fortidyndns.com:35146/nm_spare_fetch/index.php/",
  aws_url: "https://autoversa-media.s3.me-central-1.amazonaws.com/",
  stripe: {
    publicKey: 'pk_test_51OZ8DjFU0senaAZT6JcehylpmWrtZSTnYOlt9PX7FR7zd62QNFVFpfDT1WQGMOxtFKwTh0U82OzLdp57VAhz7k8Y00zknJQcxs',
  }
};
