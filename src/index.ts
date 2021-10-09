import {
  checkMaxTotalMiles,
  checkCountOfCities,
  checkListDistance,
} from './validate';
import { sumArray } from './utils';

const linearSearchTotalMiles = (array: Array<number>, item: number) => {
  console.log(array);

  let max: number | null = null;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element >= (max ?? 0) && element <= item) {
      max = element;
    }
  }

  return max;
};

const getTotalMilesCombination = (
  total: number,
  count: number,
  list: Array<number>
) => {
  const sumCombinationArray: Array<number> = [];
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

export const chooseDistance = (t: any, k: any, ls: any) => {
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
    const { message } = error as Error;
    console.log(message);

    return null;
  }
};

console.log(chooseDistance(230, 3, [0, 0, 0, 0, 0, 0, 0]));

export default { chooseDistance };
