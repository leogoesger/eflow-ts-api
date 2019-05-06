import * as csv from 'csvtojson';
import axios from 'axios';
import { Model } from 'sequelize';

export interface IReadStringToArrayPL {
  stringData: string;
  id: number | string;
}

export interface ITransposeArrayPL {
  arrayData: string[][];
  id: number | string;
}

export interface IArrayPL {
  arrayData: number[][];
  id: number | string;
}

/**
 * Read CSV file from aws
 *
 * @param id   gauge Id
 * @param dir       aws directory object name
 * @param ext       file extension after gauge id if any
 *
 * @returns Promise<string>
 */

export const readCSVFile = async (
  id: number | string,
  dir: string,
  ext?: string
): Promise<IReadStringToArrayPL> => {
  const url = ext
    ? `${process.env.S3_BUCKET}/${dir}/${id}${ext}.csv`
    : `${process.env.S3_BUCKET}/${dir}/${id}.csv`;
  const { data } = await axios.get(url);
  return { stringData: data, id };
};

export const readStringToArrays = async (
  { stringData, id }: IReadStringToArrayPL,
  noheader = true
): Promise<ITransposeArrayPL> => {
  const arrayData = await csv({
    noheader,
    output: 'csv',
  }).fromString(stringData);

  return { arrayData, id };
};

export const transposeArray = ({
  arrayData,
  id,
}: ITransposeArrayPL): IArrayPL => {
  return {
    arrayData: arrayData[0].map((_, i) =>
      arrayData.map(row => (isNaN(Number(row[i])) ? null : Number(row[i])))
    ),
    id,
  };
};

/**
 * Clear all tables in DB for given sequelize models
 *
 * @param models array of Sequelize Model
 */
export const clearDB = (models: Array<Model<any, any>>) =>
  Promise.all([models.map(model => model.destroy({}))]);
