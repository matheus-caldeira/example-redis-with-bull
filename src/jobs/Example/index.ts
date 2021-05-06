import { JobOptions } from 'bull';

import ExampleService from './services/ExampleService';

const key = 'Example';
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
  delay: 600000,
  attempts: 1,
};

export default {
  key,
  handle,
  options,
};
