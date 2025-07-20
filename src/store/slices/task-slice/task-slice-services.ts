import {
  fetchFormDataByTileParams,
  type FetchFormDataByTileParamsArgs,
} from './task-slice-api';
import type {TypedFormData} from './task-slice-types';
import {convertRawField, getFormType} from './task-slice-utils';

export const loadFormDataByTileParams = (args: FetchFormDataByTileParamsArgs): Promise<TypedFormData> => {
  return fetchFormDataByTileParams(args)
    .then(response => {
      const {data} = response;

      return {
        type: getFormType({rawFields: data}),
        fields: data?.map(raw => convertRawField({rawField: raw})),
      }
    });
}