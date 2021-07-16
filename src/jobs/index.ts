import { JobOptions } from 'bull';

import Example from './Example';


interface IJobs {
  [t: string]: {
    key: string,
    handle(data: any): Promise<any>,
    options: JobOptions,
  }
}
export default {
  Example,
} as IJobs;
