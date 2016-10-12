#! /usr/bin/env node

import domain from 'domain';
import app from './app';

const tgDomain = domain.create();

tgDomain.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

tgDomain.run(() => {
  app();
});
