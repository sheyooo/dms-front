import superagent from 'superagent';
import storage from 'local-storage';

const base = '/api/v1';

let api = (method, url, raw) => {
  if (raw) {
    return superagent;
  }

  if (storage('token')) {
    return superagent[method](base + url)
            .set('X-ACCESS-TOKEN', storage('token'));
  }

  return superagent[method](base + url);
};

export default api;
