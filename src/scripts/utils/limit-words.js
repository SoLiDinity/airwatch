const limitWords = (text, limit) => {
  const words = text.split(' ');
  const limitedText = words.slice(0, limit).join(' ');
  return `${limitedText}... `;
};

export default limitWords;
