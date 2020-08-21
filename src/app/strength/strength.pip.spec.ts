import { StrengthPipe } from "./strength.pipe";

describe("StrengthPipe", () => {
  it("should display weak if strength is 5", () => {
    const pipe = new StrengthPipe();

    const ret = pipe.transform(5);

    expect(ret).toEqual("5 (weak)");
  });
});
