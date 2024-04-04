import { CAR_BRANDS, CAR_MODELS, COLORS } from "./dummyData";

export const getRandomNumber = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start + 1) + start);
};

export const randomDate = () => {
  const start = new Date(0);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export type CarObj = {
  make: string;
  model?: string;
  price?: number;
  color?: string;
  fuel_type?: string;
  dom?: Date;
  param_x?: boolean;
  param_y?: boolean;
};

export const generateDummyData = () => {
  const DUMMY_DATA: CarObj[] = [];
  for (let i = 0; i < 10000; i++) {
    DUMMY_DATA.push({
      make: CAR_BRANDS[getRandomNumber(0, CAR_BRANDS.length - 1)],
      model: CAR_MODELS[getRandomNumber(0, CAR_MODELS.length - 1)],
      price: getRandomNumber(400000, 10000000),
      color: COLORS[getRandomNumber(0, COLORS.length - 1)],
      fuel_type: ["Petrol", "Diesel", "CNG", "Electric"][getRandomNumber(0, 3)],
      dom: randomDate(),
      param_x: [true, false][getRandomNumber(0, 1)],
      param_y: [true, false][getRandomNumber(0, 1)],
    });
  }
  return DUMMY_DATA;
};
