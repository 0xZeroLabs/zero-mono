const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const response = config.litApiKey;
  return {
    response: response,
  };
});