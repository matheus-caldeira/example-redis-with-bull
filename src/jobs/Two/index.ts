import { JobOptions } from 'bull';

import ExampleService from './services/ExampleService';

const key = 'Two';
interface IRequest {
  data: {
    name: string;
  };
  [t: string]: any;
}

const handle = async ({ data }: IRequest): Promise<void> => {
  const { name } = data;

  const example = new ExampleService();
  await example.execute({
    name,
  });
};

const options: JobOptions = {
  attempts: 0,
};

export default {
  key,
  handle,
  options,
};
