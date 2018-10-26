import * as csv from 'csvtojson';
import axios from 'axios';
import { Model } from 'sequelize';

export interface IReadStringToArrayPL {
  stringData: string;
  gaugeId: number;
}

export interface ITransposeArrayPL {
  arrayData: string[][];
  gaugeId: number;
}

export interface IArrayPL {
  arrayData: number[][];
  gaugeId: number;
}

/**
 * Read CSV file from aws
 *
 * @param gaugeId   gauge Id
 * @param dir       aws directory object name
 * @param ext       file extension after gauge id if any
 *
 * @returns Promise<string>
 */

export const readCSVFile = async (
  gaugeId: number,
  dir: string,
  ext?: string
): Promise<IReadStringToArrayPL> => {
  const url = ext
    ? `${process.env.S3_BUCKET}/${dir}/${gaugeId}${ext}.csv`
    : `${process.env.S3_BUCKET}/${dir}/${gaugeId}.csv`;
  const { data } = await axios.get(url);
  return { stringData: data, gaugeId };
};

export const readStringToArrays = async ({
  stringData,
  gaugeId,
}: IReadStringToArrayPL): Promise<ITransposeArrayPL> => {
  const arrayData = await csv({
    noheader: true,
    output: 'csv',
  }).fromString(stringData);

  return { arrayData, gaugeId };
};

export const transposeArray = ({
  arrayData,
  gaugeId,
}: ITransposeArrayPL): IArrayPL => {
  return {
    arrayData: arrayData[0].map((_, i) =>
      arrayData.map(row => (isNaN(Number(row[i])) ? null : Number(row[i])))
    ),
    gaugeId,
  };
};

/**
 * Clear all tables in DB for given sequelize models
 *
 * @param models array of Sequelize Model
 */
export const clearDB = (models: Model<any, any>[]) =>
  Promise.all([models.map(model => model.destroy({ where: {} }))]);
