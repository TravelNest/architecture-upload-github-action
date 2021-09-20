import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import { TravelNestArchitecture } from './types';

const read = (path: string): TravelNestArchitecture => {
  return load(readFileSync(path, 'utf8')) as TravelNestArchitecture;
  //return load(path) as TravelNestArchitecture;
};

export {
    read
}
