export const checkMaxTotalMiles = (miles: any) => {
  if (typeof miles !== 'number' || miles < 0) {
    throw new Error('Максимальна сума відстаней, ціле число >= 0');
  }

  return miles;
};

export const checkCountOfCities = (cities: any) => {
  if (typeof cities !== 'number' || cities < 1) {
    throw new Error('Кількість міст, які потрібно відвідати, k >= 1');
  }

  return cities;
};

export const checkListDistance = (list: any): Array<number> => {
  if (!Array.isArray(list)) {
    throw new Error('Список відстаней має бути массивом!');
  }

  if (list.some(item => typeof item !== 'number' || item < 0)) {
    throw new Error(
      'Усі відстані в списку відстаней мають бути додатними або нульовими цілими числами!'
    );
  }

  if (list.length < 1) {
    throw new Error('Список відстаней має містить принаймні один елемент!');
  }

  return [...list];
};

export default { checkMaxTotalMiles, checkCountOfCities, checkListDistance };
