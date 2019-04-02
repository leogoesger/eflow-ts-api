export const params = {
  general_params: {
    annual_result_low_Percentille_filter: 0,
    annual_result_high_Percentille_filter: 100,
    max_nan_allowed_per_year: 100,
  },
  winter_params: {
    max_zero_allowed_per_year: 270,
    max_nan_allowed_per_year: 100,
    broad_sigma: 15, //fall_params
    peak_detect_perc: 0.3, //fall_params
    wet_threshold_perc: 0.2, //fall_params
    peak_sensitivity_wet: 0.005, //fall_params
  },
  fall_params: {
    max_zero_allowed_per_year: 270,
    max_nan_allowed_per_year: 100,
    min_flow_rate: 1,
    broad_sigma: 15,
    wet_season_sigma: 12,
    peak_sensitivity: 0.005,
    peak_sensitivity_wet: 0.005,
    max_flush_duration: 40,
    min_flush_percentage: 0.1,
    wet_threshold_perc: 0.2,
    peak_detect_perc: 0.3,
    flush_threshold_perc: 0.3,
    date_cutoff: 75,
  },
  spring_params: {
    max_zero_allowed_per_year: 270,
    max_nan_allowed_per_year: 100,
    max_peak_flow_date: 350,
    search_window_left: 20,
    search_window_right: 50,
    peak_sensitivity: 0.1,
    peak_filter_percentage: 0.5,
    min_max_flow_rate: 0.1,
    window_sigma: 10,
    fit_sigma: 1.3,
    sensitivity: 0.2,
    min_percentage_of_max_flow: 0.5,
    lag_time: 4,
    timing_cutoff: 138,
    min_flow_rate: 1,
  },
  summer_params: {
    max_zero_allowed_per_year: 270,
    max_nan_allowed_per_year: 100,
    sigma: 7,
    sensitivity: 900,
    peak_sensitivity: 0.2,
    max_peak_flow_date: 325,
    min_summer_flow_percent: 0.125,
    min_flow_rate: 1,
  },
};