export default eventHandler((event) => {
  return `this is a Forge server running. the local time is ${new Date().toLocaleString()}.`;
});
