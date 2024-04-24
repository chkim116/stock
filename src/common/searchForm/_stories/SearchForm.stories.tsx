/* eslint-disable no-alert */
import { ComponentProps, useState } from "react";
import { StoryFn, StoryObj, Meta, ArgTypes } from "@storybook/react";
import { actions } from "@storybook/addon-actions";
import { SearchForm } from "../SearchForm";
import { SearchFormInput, SearchFormInputChangeArgs } from "../SearchFormInput";
import { SearchFormInputSelect } from "../SearchFormInputSelect";
import { SearchFormActions } from "../SearchFormActions";
import { SearchFormChangeArgs, SearchFormSelect } from "../SearchFormSelect";
import { SearchFormSegment } from "../SearchFormSegment";

interface StoryProps extends ComponentProps<typeof SearchForm> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypesSetting: MyArgTypes = {};

export default {
  title: "common/searchForm/SearchForm",
  component: SearchForm,
  argTypes: argTypesSetting,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as Meta;

interface FormDto {
  name: string;
  keyword: string;
  keywordSearchType: string;
  gte: string;
  lte: string;
  sort: string;
}

const onTestHandler = actions("onFinish");

const createFormDto = () => ({
  name: "",
  keyword: "",
  keywordSearchType: "",
  gte: "",
  lte: "",
  sort: "newest",
});

const Template: StoryFn<StoryProps> = ({ ...props }) => {
  const [form, setForm] = useState<FormDto>(createFormDto());

  const handleChange = (args: SearchFormInputChangeArgs) => {
    setForm((prev) => ({ ...prev, [args.name]: args.value }));
  };

  const handleChangeSelect = (args: SearchFormChangeArgs) => {
    setForm((prev) => ({
      ...prev,
      [args.name]: args.value,
    }));
  };

  const handleReset = () => {
    setForm(createFormDto());
  };

  const handleFinish = () => {
    onTestHandler.onFinish(form);
  };

  return (
    <SearchForm {...props} onFinish={handleFinish}>
      <SearchFormInput
        label="이름"
        name="name"
        onChange={handleChange}
        value={form.name}
      />
      <SearchFormInputSelect
        label="검색어"
        name="keyword"
        searchOptions={[{ label: "하이", value: "hi" }]}
        selectedValue={form.keywordSearchType}
        onChange={handleChange}
        onSelectChange={handleChange}
        value={form.keyword}
      />

      <SearchFormSelect
        label="현재상태"
        name="currentStatus"
        onChange={handleChangeSelect}
        options={[
          {
            label: "모든상태",
            value: "",
          },
        ]}
      />

      <SearchFormSegment
        label="정렬순"
        name="sort"
        value={form.sort}
        options={[
          { label: "최신순", value: "newest" },
          { label: "오래된순", value: "oldest" },
        ]}
        onChange={handleChange}
      />
      <SearchFormActions onReset={handleReset} />
    </SearchForm>
  );
};

export const Default: StoryObj<StoryProps> = {
  render: Template,
  args: {},
};
