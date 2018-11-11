import { expect } from 'chai';
import { graphql } from 'graphql';

import { schema } from '../../schema';
import { addMockFunction } from '../../../utils/testHelpers';

describe('tsUpload typeDefs', () => {
  addMockFunction();

  const mutation = `
    mutation {
      uploadTimeSeries(uploadTimeSeriesPL: {
        dates: ["hello"]
        flows: [1.2]
        startDate: "10/20"
        label: "Hello World"
      }) {
        id
        label
        succeed
        dates
        flows
        startDate
        yearRanges
        flowMatrix
        DRH {
          min
          min
          ten
          twenty_five
          fifty
          seventy_five
          ninty
          max
        }
        allYear {
          standard_deviations
          average_annual_flows
          coefficient_variations
        }
        winter {
          timings {two, five, ten, twenty, fifty}
          durations {two, five, ten, twenty, fifty}
          frequencys {two, five, ten, twenty, fifty}
        }
        fall {
          timings
          durations
          magnitudes
          wet_timings
        }
        summer {
          timings
          durations_wet
          magnitudes_ten
          no_flow_counts
          durations_flush
          magnitudes_fifty
        }
        spring {
          rocs
          timings
          durations
          magnitudes
        }
        fallWinter {
          baseflows
        }
        userId
        updatedAt
        createdAt
      }
    }  
  `;

  it('should contain all uploadTimeSeries mutation fields', async () => {
    const res = await graphql(schema, mutation);
    expect(Boolean(res.data.uploadTimeSeries.DRH)).to.be.true;
    expect(Boolean(res.data.uploadTimeSeries.allYear)).to.be.true;
    expect(Boolean(res.data.uploadTimeSeries.winter)).to.be.true;
    expect(Boolean(res.data.uploadTimeSeries.fall)).to.be.true;
    expect(Boolean(res.data.uploadTimeSeries.summer)).to.be.true;
    expect(Boolean(res.data.uploadTimeSeries.spring)).to.be.true;
    expect(Boolean(res.data.uploadTimeSeries.fallWinter)).to.be.true;
  });
});
