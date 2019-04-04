import { Request, Response } from "express";
import * as d3 from "d3";
import { sortBy, find } from "lodash";
import { AllYear, Gauge } from "../db/models";

export const removeNaN = (array: any[]) => {
  const filteredArray = array.filter(ele => !isNaN(Number(ele)));
  return sortBy(filteredArray.map(Number));
};

export const round = (number: number, precision: number) => {
  const shift = (
    number2: number,
    precision2: number,
    reverseShift: boolean
  ) => {
    let cPercision = precision2;
    if (reverseShift) {
      cPercision = -cPercision;
    }
    const numArray = String(number2).split("e");
    return Number(
      numArray[0] +
        "e" +
        (numArray[1] ? Number(numArray[1]) + cPercision : cPercision)
    );
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
};

export function getJulianOffsetDate(julianDate: number) {
  let offsetJulianDate;
  if (julianDate < 274) {
    offsetJulianDate = julianDate + 365 - 274;
  } else {
    offsetJulianDate = julianDate - 274;
  }
  if (offsetJulianDate > 365) {
    offsetJulianDate = offsetJulianDate - 365;
  }
  return offsetJulianDate;
}

export function getCalenderDate(offsetJulianDate: number) {
  let julianDate;
  if (offsetJulianDate < 365 - 274) {
    julianDate = 274 + offsetJulianDate;
  } else {
    julianDate = offsetJulianDate - 365 + 274;
  }
  return julianDate;
}

export class ClassBoxPlot {
  constructor(rawData, metricName, category) {
    this.rawData = rawData;
    this.metricName = metricName;
    this.filteredData = null;
    this.quantileData = [];
    this.category = category;
    this.getFilteredData();
    this.getQuantiles();
  }

  getFilteredData() {
    this.filteredData = this.rawData.map(data =>
      removeNaN(data[this.metricName])
    );
  }

  getQuantiles() {
    this.filteredData.forEach(data => {
      data.forEach(d => this.quantileData.push(d));
    });
    this.quantileData = sortBy(this.quantileData);
  }

  get boxPlotDataGetter() {
    return this.boxPlotData();
  }

  boxPlotData() {
    const boxPlotData = {
      type: "Class",
      metricName: `${this.category.toLowerCase()}${this.metricName[0].toUpperCase()}${this.metricName.slice(
        1
      )}`,
      quartile: [
        round(d3.quantile(this.quantileData, 0.25), 4) === 0
          ? 0.01
          : round(d3.quantile(this.quantileData, 0.25), 4),
        round(d3.quantile(this.quantileData, 0.5), 4) === 0
          ? 0.01
          : round(d3.quantile(this.quantileData, 0.5), 4),
        round(d3.quantile(this.quantileData, 0.75), 4) === 0
          ? 0.01
          : round(d3.quantile(this.quantileData, 0.75), 4)
      ],
      whiskers: [
        round(d3.quantile(this.quantileData, 0.1), 4) === 0
          ? 0.01
          : round(d3.quantile(this.quantileData, 0.1), 4),
        round(d3.quantile(this.quantileData, 0.9), 4) === 0
          ? 0.01
          : round(d3.quantile(this.quantileData, 0.9), 4)
      ]
    };

    return boxPlotData;
  }
}

export const nonDimValues = async (req: Request, metrics: any) => {
  const nonDimArray: any[] = [],
    avgFlow = await AllYear.findAll({
      attributes: ["average"],
      where: {
        "$gauge.classId$": req.body.classId
      },
      include: [
        {
          model: Gauge,
          as: "gauge",
          attributes: ["id"]
        }
      ]
    });

  metrics.forEach((metric: any) => {
    //This will output the datastructure similar to sequelize
    //which will be input into class method
    nonDimArray.push({ [req.body.metric]: [] });
    const averageArray = find(
      avgFlow,
      d => d.gaugeId === Number(metric.gauge.id)
    );
    averageArray.average.forEach((v, i) => {
      if (!isNaN(Number(v)) && !isNaN(Number(metric[req.body.metric][i]))) {
        nonDimArray[nonDimArray.length - 1][req.body.metric].push(
          Number(metric[req.body.metric][i]) / Number(v)
        );
      }
    });
  });
  return nonDimArray;
};

export const getGaugeBoxPlotObject = (
  metricArray: number[],
  metricName: string,
  category: string,
  conditions: string[],
  condition: string
) => {
  const filteredMetricArray = removeNaN(metricArray).filter((v, index) => {
    if (!condition || !conditions || conditions.length < 0) {
      return true;
    }
    if (conditions[index] === condition) {
      return true;
    }
    return false;
  });
  const boxPlotAttributes = {
    type: "Gauge",
    metricName: `${category.toLowerCase()}${metricName[0].toUpperCase()}${metricName.slice(
      1
    )}`,
    quartile: [
      round(d3.quantile(filteredMetricArray, 0.25), 4) === 0
        ? 0.0001
        : round(d3.quantile(filteredMetricArray, 0.25), 4),
      round(d3.quantile(filteredMetricArray, 0.5), 4) === 0
        ? 0.0001
        : round(d3.quantile(filteredMetricArray, 0.5), 4),
      round(d3.quantile(filteredMetricArray, 0.75), 4) === 0
        ? 0.0001
        : round(d3.quantile(filteredMetricArray, 0.75), 4)
    ],
    whiskers: [
      round(d3.quantile(filteredMetricArray, 0.1), 4) === 0
        ? 0.0001
        : round(d3.quantile(filteredMetricArray, 0.1), 4),
      round(d3.quantile(filteredMetricArray, 0.9), 4) === 0
        ? 0.0001
        : round(d3.quantile(filteredMetricArray, 0.9), 4)
    ]
  };
  return boxPlotAttributes;
};

export const gaugeNonDimValues = async (req: Request, metric: any) => {
  const nonDimArray: number[] = [],
    avgFlow = await AllYear.findAll({
      attributes: ["average"],
      where: {
        gaugeId: req.body.gaugeId
      }
    });
  metric[0][req.body.metric].forEach((v, i) => {
    if (!isNaN(Number(v)) && !isNaN(Number(avgFlow[0].average[i]))) {
      nonDimArray.push(Number(v) / Number(avgFlow[0].average[i]));
    }
  });
  return [{ [req.body.metric]: nonDimArray }];
};

enum RoleEnum {
  USER = 0,
  ADMIN = 1,
  SUPER_ADMIN = 2
}

/**
 * Compare two roles using `RoleEnum`
 * @param  role1 value can be `USER` | `ADMIN` | `SUPER_ADMIN`
 * @param  role2 value can be `USER` | `ADMIN` | `SUPER_ADMIN`
 * @returns returns `Boolean`
 */

export const compareRole = (
  role1: "USER" | "ADMIN" | "SUPER_ADMIN",
  role2: "USER" | "ADMIN" | "SUPER_ADMIN"
) => {
  return RoleEnum[role1] >= RoleEnum[role2];
};
