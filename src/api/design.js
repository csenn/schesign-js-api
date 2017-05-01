import { get, create, update, post } from '../utils';

export default function (token) {
  return {
    get: () => {

    },
    create: () => {

    },
    update: () => {

    },
    graph: (body, opts = {}) => {
      const path = '/api/v1/design/graph';
      return post(token, path, body, opts);
    },
  };
}
