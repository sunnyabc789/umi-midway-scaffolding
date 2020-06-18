export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      console.error(e.message);
    },
  },
  plugins: [
    window.context_env !== 'production' ? require('dva-logger')() : null,
  ].filter(x => x)
};
