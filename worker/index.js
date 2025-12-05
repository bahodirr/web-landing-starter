// Minimal passthrough worker for static assets
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};


