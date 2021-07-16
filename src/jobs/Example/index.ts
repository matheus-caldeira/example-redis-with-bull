import { JobOptions, Job } from 'bull';

import ExampleService from './services/ExampleService';

const key = 'Example';
interface IData {
  name: string;
  [t: string]: any;
}

const handle = async ({ data, attemptsMade, log }: Job<IData>): Promise<void> => {
  const { name } = data;


  await log('teste')

  try {
    // throw new Error(attemptsMade ? 'error zero' : 'erro one')

    const example = new ExampleService();
    await example.execute({
      name,
    });
  } catch (e) {
    if (attemptsMade !== 1){
      console.log('primeira tentativa')
      throw e
    } else {
      console.log('segunda tentativa')
      throw e
    }
  }
};

const options: JobOptions = {
  attempts: 2,
};

export default {
  key,
  handle,
  options,
};
