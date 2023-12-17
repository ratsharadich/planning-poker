export const getValidName = (name: string) =>
  name.slice(0, 10).replace(/[^a-zA-Z0-9а-яА-Я]/g, '');
