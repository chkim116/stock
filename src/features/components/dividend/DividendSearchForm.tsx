"use client";

import { useInitialState } from "@common/hooks/useInitialState";
import { SearchForm } from "@common/searchForm/SearchForm";
import { SearchFormActions } from "@common/searchForm/SearchFormActions";
import {
  SearchFormCheckbox,
  SearchFormCheckboxChangeArgs,
} from "@common/searchForm/SearchFormCheckbox";
import {
  SearchFormInput,
  SearchFormInputChangeArgs,
} from "@common/searchForm/SearchFormInput";
import {
  SearchFormInputNumber,
  SearchFormInputNumberChangeArgs,
} from "@common/searchForm/SearchFormInputNumber";
import {
  SearchFormChangeArgs,
  SearchFormSelect,
} from "@common/searchForm/SearchFormSelect";
import { DividendSearchParamsSortEnum } from "@features/apis/entities";
import { DIVIDEND_SEARCH_SORT_OPTIONS } from "@features/constants/dividend.const";
import { createDividendSearchParamsModel } from "@features/models/dividend.create";
import { DividendSearchParamsModel } from "@features/models/dividend.model";

interface DividendSearchFormProps {
  params: DividendSearchParamsModel;
  onSubmit: (params: DividendSearchParamsModel) => void;
}

function DividendSearchForm({ params, onSubmit }: DividendSearchFormProps) {
  const [state, setState] = useInitialState(params);

  const handleChange = ({ name, value }: SearchFormInputNumberChangeArgs) => {
    setState((prev) => ({ ...prev, [name]: value ?? 0 }));
  };

  const handleKeywordChange = (args: SearchFormInputChangeArgs) => {
    setState((prev) => ({ ...prev, keyword: args.value }));
  };

  const handleCheck = (
    checked: boolean,
    args: SearchFormCheckboxChangeArgs
  ) => {
    setState((prev) => ({ ...prev, [args.name]: checked }));
  };

  const handleSelect = ({ value }: SearchFormChangeArgs) => {
    setState((prev) => ({
      ...prev,
      sort: value as DividendSearchParamsSortEnum,
    }));
  };

  const handleSubmit = () => {
    onSubmit(state);
  };

  const handleReset = () => {
    setState(createDividendSearchParamsModel());
  };

  return (
    <SearchForm onFinish={handleSubmit}>
      <SearchFormInputNumber
        onChange={handleChange}
        name="payoutRatioGte"
        value={state.payoutRatioGte}
        addonAfter="%"
        label="최소배당성향"
      />
      <SearchFormInputNumber
        onChange={handleChange}
        name="payoutRatioLte"
        value={state.payoutRatioLte}
        addonAfter="%"
        label="최대배당성향"
      />
      <SearchFormInput
        value={state.keyword}
        label="종목명"
        onChange={handleKeywordChange}
      />
      <SearchFormCheckbox
        onChange={handleCheck}
        name="increase"
        checked={state.increase}
        label="배당금상향여부"
      />
      <SearchFormCheckbox
        onChange={handleCheck}
        name="increaseOrSame"
        checked={state.increaseOrSame}
        label="배당금동결여부"
      />
      <SearchFormCheckbox
        onChange={handleCheck}
        name="dividendAttendance"
        checked={state.dividendAttendance}
        label="배당금개근"
      />
      <SearchFormSelect
        label="정렬"
        onChange={handleSelect}
        options={DIVIDEND_SEARCH_SORT_OPTIONS}
        value={state.sort}
      />
      <SearchFormActions onReset={handleReset} />
    </SearchForm>
  );
}

export default DividendSearchForm;
