import { post, put } from './utils';

export function initApi(token, initOpts) {
  const mergeOpts = opts => Object.assign({}, opts || {}, initOpts);
  return {
    design: {
      get: () => {

      },
      create: () => {

      },
      update: () => {

      },
      updateGraph: (body, opts) => {
        const path = '/api/v1/design/graph';
        return put(token, path, body, mergeOpts(opts));
      },
    },
  };
}
