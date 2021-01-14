const axios = require("axios");

const npms = axios.create({
  baseURL: "https://api.npms.io/",
  timeout: 10000,
});

const $api = {
  /**
   *
   * @param {array} names Array of package names.
   */
  async mget(names = []) {
    const apiPath = "/v2/package/mget/";
    const res = await npms.post(apiPath, names);
    return res.data;
  },

  /**
   *
   * @param {string} name The package name.
   */
  async package(name = "") {
    const _name = encodeURIComponent(name);
    const apiPath = `/v2/package/${ _name }`;
    const res = await npms.get(apiPath);
    return res.data;
  },

  /**
   *
   * @param {string} q Search term.
   * @param {array} params Array of filters or modifiers.
   * @param {number} size The total number of results to return (max of 250).
   * @param {number} from The offset in which to start searching from (max of 5000).
   */
  async search(q, params = [], size = 250, from = 0) {
    size = Math.min(size, 250);
    const search = new URLSearchParams({
      q: [q, ...params].join("+"),
      size,
      from,
    });

    const apiPath = "/v2/search/";
    const api = new URL(apiPath, npms.defaults.baseURL);
    api.search = decodeURIComponent(search);

    const res = await npms.get(api.href);
    return res.data.results;
  },

  /**
   *
   * @param {string} q The query (note that any qualifiers will be ignored).
   * @param {number} size The total number of results to return (max of 100).
   */
  async searchSuggestions(q, size = 100) {
    size = Math.min(size, 100);
    const search = new URLSearchParams({
      q,
      size,
    });

    const apiPath = "/v2/search/suggestions/";
    const api = new URL(apiPath, npms.defaults.baseURL);
    api.search = decodeURIComponent(search);

    const res = await npms.get(api.href);
    return res.data;
  },
};

module.exports = $api;
