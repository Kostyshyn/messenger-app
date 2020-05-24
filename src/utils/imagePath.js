const imagePath = (value, size, additional = '') => {
  const parts = String(value).split('.');
  const filePath = parts[0];
  const ext = parts[1];
  return `${filePath}${size}.${ext}${additional}`;
};

export default imagePath;
