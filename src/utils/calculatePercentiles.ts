import * as d3 from "d3";
import { from, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {
  AllYear,
  Classification,
  Fall,
  FallWinter,
  Gauge,
  Spring,
  Summer,
  Winter,
  IGauge
} from "../db/models";
import { metricReferenceAs } from "../static/metricReference";
import { getCalenderDate, getJulianOffsetDate, removeNaN } from "./helpers";

const attributes: any = {
  winters: [
    "timing2",
    "timing5",
    "timing10",
    "timing20",
    "timing50",
    "duration2",
    "duration5",
    "duration10",
    "duration20",
    "duration50",
    "frequency2",
    "frequency5",
    "frequency10",
    "frequency20",
    "frequency50",
    "magnitude2",
    "magnitude5",
    "magnitude10",
    "magnitude20",
    "magnitude50"
  ],
  summers: [
    "timing",
    "magnitude10",
    "magnitude50",
    "durationFlush",
    "durationWet",
    "noFlowCount"
  ],
  allYears: ["average", "standardDeviation", "coeffientVariance"],
  falls: ["timing", "magnitude", "timingWet", "duration"],
  springs: ["timing", "magnitude", "rateOfChange", "duration"],
  fallWinters: ["magWet"]
};

export const calculatePercentileClourse = async (id: number) => {
  let classId = id;

  const calculatePercentile = async (): Promise<any> => {
    if (classId > 9) {
      return null;
    }

    const gauges = await Gauge.findAll({
      where: { classId },
      include: [
        {
          model: AllYear,
          as: "allYears",
          attributes: attributes.allYears
        },
        {
          model: Fall,
          as: "falls",
          attributes: attributes.falls
        },
        {
          model: Spring,
          as: "springs",
          attributes: attributes.springs
        },
        {
          model: Summer,
          as: "summers",
          attributes: attributes.summers
        },
        {
          model: Winter,
          as: "winters",
          attributes: attributes.winters
        },
        {
          model: FallWinter,
          as: "fallWinters",
          attributes: attributes.fallWinters
        }
      ]
    });

    const combined: any = {};
    metricReferenceAs.forEach(reference => {
      combined[reference.short] = [];
      gauges.forEach(gauge => {
        if (gauge[reference.as][0]) {
          let data = [];
          if (
            reference.name.includes("Timing") &&
            !reference.name.includes("summer")
          ) {
            data = gauge[reference.as][0][reference.columnName].map((d: any) =>
              getJulianOffsetDate(Number(d))
            );
          } else {
            data = gauge[reference.as][0][reference.columnName];
          }
          combined[reference.short] = [...combined[reference.short], ...data];
        }
      });
    });
    const combinedPercentile: any = {};
    Object.keys(combined).forEach(key => {
      const sortedData = removeNaN(combined[key]);
      combinedPercentile[key] = [
        d3.quantile(sortedData, 0.1),
        d3.quantile(sortedData, 0.5),
        d3.quantile(sortedData, 0.9)
      ];
    });

    metricReferenceAs.forEach(reference => {
      if (
        reference.name.includes("Timing") &&
        !reference.name.includes("summer")
      ) {
        combinedPercentile[reference.short] = combinedPercentile[
          reference.short
        ].map((d: any) => getCalenderDate(Number(d)));
      }
    });

    const updateClass = await Classification.findById(classId);
    updateClass
      .update(combinedPercentile, {
        fields: Object.keys(combinedPercentile)
      })
      .then(() => {
        classId = classId + 1;
        calculatePercentile();
      });
  };
  calculatePercentile();
};

export const updateGaugePercentiles = async (classId: number) => {
  const gauges = await Gauge.findAll({
    where: { classId },
    include: [
      {
        model: AllYear,
        as: "allYears",
        attributes: attributes.allYears
      },
      {
        model: Fall,
        as: "falls",
        attributes: attributes.falls
      },
      {
        model: Spring,
        as: "springs",
        attributes: attributes.springs
      },
      {
        model: Summer,
        as: "summers",
        attributes: attributes.summers
      },
      {
        model: Winter,
        as: "winters",
        attributes: attributes.winters
      },
      {
        model: FallWinter,
        as: "fallWinters",
        attributes: attributes.fallWinters
      }
    ]
  });

  // const promises: Promise<any>[] = [];

  const src$ = from(gauges).pipe(
    map(gauge => calcGaugePercentile(gauge)),
    catchError(err => of(`Unable to update Gauges: ${err}`))
  );

  src$.subscribe(
    ({ gauge, metrics, fields }: any) => {
      gauge.update(metrics, fields);
    },
    (err: any) => `Unable to update Gauges: ${err}`,
    () => {
      return;
    }
  );

  // gauges.forEach(gauge => {
  //   const metrics: any = {};
  //   metricReferenceAs.forEach(reference => {
  //     let data;
  //     if (
  //       reference.name.includes("Timing") &&
  //       !reference.name.includes("summer")
  //     ) {
  //       data = gauge[reference.as][0][reference.columnName].map((d: any) =>
  //         getJulianOffsetDate(Number(d))
  //       );
  //     } else {
  //       data = gauge[reference.as][0][reference.columnName];
  //     }

  //     const sortedData = removeNaN(data);

  //     metrics[reference.short] = [
  //       d3.quantile(sortedData, 0.1) || null,
  //       d3.quantile(sortedData, 0.5) || null,
  //       d3.quantile(sortedData, 0.9) || null
  //     ];
  //   });

  //   metricReferenceAs.forEach(reference => {
  //     if (
  //       reference.name.includes("Timing") &&
  //       !reference.name.includes("summer")
  //     ) {
  //       metrics[reference.short] = metrics[reference.short].map((d: any) =>
  //         getCalenderDate(Number(d))
  //       );
  //     }
  //   });

  //   promises.push(gauge.update(metrics, { fields: Object.keys(metrics) }));
  // });

  // return Promise.all(promises);
};

const calcGaugePercentile = (gauge: any): any => {
  const metrics: any = {};
  metricReferenceAs.forEach(reference => {
    let data;
    if (
      reference.name.includes("Timing") &&
      !reference.name.includes("summer")
    ) {
      data = gauge[reference.as][0][reference.columnName].map((d: any) =>
        getJulianOffsetDate(Number(d))
      );
    } else {
      data = gauge[reference.as][0][reference.columnName];
    }

    const sortedData = removeNaN(data);

    metrics[reference.short] = [
      d3.quantile(sortedData, 0.1) || null,
      d3.quantile(sortedData, 0.5) || null,
      d3.quantile(sortedData, 0.9) || null
    ];
  });

  metricReferenceAs.forEach(reference => {
    if (
      reference.name.includes("Timing") &&
      !reference.name.includes("summer")
    ) {
      metrics[reference.short] = metrics[reference.short].map((d: any) =>
        getCalenderDate(Number(d))
      );
    }
  });

  return { gauge, metrics, fields: Object.keys(metrics) };
};
