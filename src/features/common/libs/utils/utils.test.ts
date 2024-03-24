import { createSearchParams } from "react-router-dom";
import { searchParamsToObject, withoutFalsyValues } from "./utils";

describe("utils", () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  it("searchParamsToObject() should work as expected", async () => {
    const object = {
      test: ["test"],
      test2: ["test2"],
    };

    const searchParams = createSearchParams(object);

    expect(object).toStrictEqual(searchParamsToObject(searchParams));
  });

  describe("withoutFalsyValues() should work as expected", () => {
    it("when using primitive values", async () => {
      const object = {
        test: "test",
        test2: "",
        test3: null,
        test4: undefined,
        test5: "test2",
      };

      expect({
        test: "test",
        test5: "test2",
      }).toStrictEqual(withoutFalsyValues(object));
    });

    it("when using arrays", async () => {
      const object = {
        test: ["test", null, undefined],
        test2: ["", undefined, null],
      };

      expect({
        test: ["test"],
        test2: [],
      }).toStrictEqual(withoutFalsyValues(object));
    });
  });
});
