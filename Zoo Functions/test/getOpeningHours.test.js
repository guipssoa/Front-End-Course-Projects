const getOpeningHours = require('../src/getOpeningHours');

const message = 'The zoo is closed';

describe('Testes da função getOpeningHours', () => {
  it('Requisito 1', () => {
    const schedule = {
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    };
    expect(getOpeningHours(undefined)).toEqual(schedule);
  });
  it('Requisito 2', () => {
    expect(getOpeningHours('Monday', '09:00-AM')).toEqual(message);
  });
  it('Requisito 3', () => {
    expect(getOpeningHours('Wednesday', '09:00-PM')).toEqual(message);
  });
  it('Requisito 4', () => {
    expect(getOpeningHours('Tuesday', '12:00-AM')).toEqual(message);
  });
  it('Requisito 5', () => {
    expect(() => getOpeningHours('Tue', '09:00-AM')).toThrow('The day must be valid. Example: Monday');
  });
  it('Requisito 6', () => {
    expect(() => getOpeningHours('Friday', '09:00-ZM')).toThrow('The abbreviation must be \'AM\' or \'PM\'');
  });
  it('Requisito 7', () => {
    expect(() => getOpeningHours('Saturday', 'C9:00-AM')).toThrow('The hour should represent a number');
  });
  it('Requisito 8', () => {
    expect(() => getOpeningHours('Thursday', '13:10-AM')).toThrow(new Error('The hour must be between 0 and 12'));
  });
  it('Requisito 9', () => {
    expect(() => getOpeningHours('Thursday', '09:80-AM')).toThrow(new Error('The minutes must be between 0 and 59'));
  });
});
