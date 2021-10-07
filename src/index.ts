import {
  checkMaxTotalMiles,
  checkCountOfCities,
  checkListDistance,
} from './validate';
import { sumArray } from './utils';

const linearSearch = (array: Array<number>, item: number) => {
  let max = array[0];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element === item) {
      return element;
    }
    if (element > max && element <= item) {
      max = element;
    }
  }

  return max <= item ? max : null;
};

const checkCombination = (
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
    const comb = tempArray.slice(0, count);
    const sumCombination = sumArray(comb.map(item => list[item]));

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

  return linearSearch(sumCombinationArray, total);
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

    return checkCombination(maxTotalMiles, countOfCities, listDistance);
  } catch (error) {
    const { message } = error as Error;
    console.log(message);

    return null;
  }
};

export default { chooseDistance };
