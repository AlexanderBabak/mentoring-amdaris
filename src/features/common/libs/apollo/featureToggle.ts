import { gql } from "__generated__";

export const GET_FEATURE_TOGGLE = gql(`
  query Query {
    getFeatureToggle {
      showOldCollection
      showSales
    }
  }
`);

export const CHANGE_FEATURE_TOGGLE = gql(`
  mutation Mutation($values: FeatureSwitch) {
    changeFeatureToggle(values: $values) {
      showOldCollection
      showSales
    }
  }
`);
