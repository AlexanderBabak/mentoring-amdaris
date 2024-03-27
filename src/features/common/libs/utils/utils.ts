const searchParamsToObject = (searchParams: URLSearchParams) =>
  [...searchParams].reduce<Record<string, string[]>>((acc, [key, value]) => {
    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key] = [...acc[key], value];

    return acc;
  }, {});

const withoutFalsyValues = (object: object) =>
  Object.entries(object).reduce<Record<string, string | string[]>>((acc, [key, value]) => {
    if (Array.isArray(value)) {
      acc[key] = value.filter(Boolean);

      return acc;
    }

    if (value) {
      acc[key] = value;
    }

    return acc;
  }, {});

export { searchParamsToObject, withoutFalsyValues };
