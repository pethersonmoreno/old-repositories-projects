const newStyleWithSelectTextDisabled = currentStyle => ({
  ...currentStyle,
  WebkitUserSelect: 'none',
});

export default newStyleWithSelectTextDisabled;
