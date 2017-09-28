export default (value) => {
  const date = new Date(value);
  return date.toLocaleString(['en-US'], { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
};
