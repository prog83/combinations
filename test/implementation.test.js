const chooseDistance = require('../src/implementation');

describe('not valid arguments', () => {
  test('not valid total miles', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    expect(chooseDistance('miles', 3, [51, 56, 58, 59, 61])).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Максимальна сума відстаней, ціле число >= 0'
    );
    expect(chooseDistance(-1, 3, [51, 56, 58, 59, 61])).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Максимальна сума відстаней, ціле число >= 0'
    );
  });

  test('not valid count cities', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    expect(chooseDistance(173, 'sities', [51, 56, 58, 59, 61])).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Кількість міст, які потрібно відвідати, k >= 1'
    );
    expect(chooseDistance(173, 0, [51, 56, 58, 59, 61])).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Кількість міст, які потрібно відвідати, k >= 1'
    );
  });

  test('not valid list distancies', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    expect(chooseDistance(173, 2, 'list distanties')).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Список відстаней має бути массивом!'
    );
    expect(chooseDistance(173, 2, ['list distanties'])).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Усі відстані в списку відстаней мають бути додатними або нульовими цілими числами!'
    );
    expect(chooseDistance(173, 2, [-1])).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Усі відстані в списку відстаней мають бути додатними або нульовими цілими числами!'
    );
    expect(chooseDistance(173, 2, [])).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Список відстаней має містить принаймні один елемент!'
    );
  });
});

describe('works', () => {
  test('equal', () => {
    expect(chooseDistance(107, 2, [51, 56])).toBe(107);
    expect(chooseDistance(165, 3, [51, 56, 58, 59, 61])).toBe(165);
  });
  test('max', () => {
    expect(chooseDistance(174, 3, [51, 56, 58, 59, 61])).toBe(173);
    expect(chooseDistance(230, 3, [0, 0, 0, 0, 0, 0, 0])).toBe(0);
    expect(chooseDistance(230, 3, [91, 74, 73, 85, 73, 81, 87])).toBe(228);
  });
  test('not exist', () => {
    expect(chooseDistance(10, 4, [51, 56])).toBeNull();
    expect(chooseDistance(10, 3, [51, 56, 58, 59, 61])).toBeNull();
    expect(chooseDistance(10, 3, [51, 56, 58, 59, 61])).toBeNull();
  });
});
