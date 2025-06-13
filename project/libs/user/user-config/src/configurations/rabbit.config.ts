import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

import { DEFAULT_NOTIFY_PORT, RADIX } from '@project/core';

export interface RabbitConfig {
  host: string;
  password: string;
  user: string;
  queue: string;
  exchange: string;
  port: number;
}

const validationSchema = Joi.object({
  host: Joi.string().valid().hostname().required(),
  password: Joi.string().required(),
  port: Joi.number().port().default(DEFAULT_NOTIFY_PORT.RABBIT),
  user: Joi.string().required(),
  queue: Joi.string().required(),
  exchange: Joi.string().required(),
});

function validateConfig(config: RabbitConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Rabbit Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): RabbitConfig {
  const config: RabbitConfig = {
    host: process.env.RABBIT_HOST as string,
    password: process.env.RABBIT_PASSWORD as string,
    port: parseInt(process.env.RABBIT_PORT ?? DEFAULT_NOTIFY_PORT.RABBIT.toString(), RADIX),
    user: process.env.RABBIT_USER as string,
    queue: process.env.RABBIT_QUEUE as string,
    exchange: process.env.RABBIT_EXCHANGE as string,
  };

  validateConfig(config);
  return config;
}

export default registerAs('rabbit', getConfig);