import { Car } from './types';

function makeModelBuilder(carArray: Car[]) {
  let makes = {};
  carArray.forEach((car) => {
    const bodyStyles = car.body_styles.replaceAll(/["[\]]/g, '').split(',');

    if (!makes[car.make]) {
      makes = {
        ...makes,
        [car.make]: {
          [car.model]: bodyStyles,
        },
      };
    } else {
      makes[car.make][car.model] = bodyStyles;
    }
  });
  return makes;
}

function csvJSON(csv: string) {
  const lines = csv.split('\n');
  const result: Car[] = [];
  const headers = lines[0].split(',');
  for (let i = 1; i < lines.length - 1; i++) {
    const obj = {} as Car;
    const currentline = lines[i].split(/(?<!"),/g);

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}

export async function getCarsYear(year: string) {
  const response = await fetch(`https://raw.githubusercontent.com/abhionlyone/us-car-models-data/master/${year}.csv`);
  const cars = await response.text();
  const carCSVData = csvJSON(cars);
  return makeModelBuilder(carCSVData);
}
