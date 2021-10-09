const sumArray = array => array.reduce((acc, value) => acc + value, 0);

const checkMaxTotalMiles = miles => {
  if (typeof miles !== 'number' || miles < 0) {
    throw new Error('Максимальна сума відстаней, ціле число >= 0');
  }

  return miles;
};

const checkCountOfCities = cities => {
  if (typeof cities !== 'number' || cities < 1) {
    throw new Error('Кількість міст, які потрібно відвідати, k >= 1');
  }

  return cities;
};

const checkListDistance = list => {
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

const linearSearchTotalMiles = (array, item) => {
  let max = null;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element >= (max ?? 0) && element <= item) {
      max = element;
    }
  }

  return max;
};

const getTotalMilesCombination = (total, count, list) => {
  const sumCombinationArray = [];
  const tempArray = [
    ...new Array(count).fill(null).map((_, index) => index),
    list.length,
    0,
  ];

  while (true) {
    const sumCombination = sumArray(
      tempArray.slice(0, count).map(item => list[item])
    );

    if (total === sumCombination) {
      return sumCombination;
    }

    sumCombinationArray.push(sumCombination);

    let index = 0;
    for (index; index < tempArray.length; index++) {
      if (tempArray[index] + 1 !== tempArray[index + 1]) {
        break;
      }
      tempArray[index] = index;
    }

    if (index >= count) {
      break;
    }
    tempArray[index] += 1;
  }

  return linearSearchTotalMiles(sumCombinationArray, total);
};

const chooseDistance = (t, k, ls) => {
  try {
    // validate
    const maxTotalMiles = checkMaxTotalMiles(t);
    const countOfCities = checkCountOfCities(k);
    const listDistance = checkListDistance(ls);

    if (countOfCities > listDistance.length) {
      return null;
    }
    if (countOfCities === listDistance.length) {
      return sumArray(listDistance);
    }

    return getTotalMilesCombination(maxTotalMiles, countOfCities, listDistance);
  } catch (error) {
    const { message } = error;
    console.log(message);

    return null;
  }
};

module.exports = chooseDistance;
