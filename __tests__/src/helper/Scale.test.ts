const scaleModule = jest.requireActual(
  '../../../src/helper/Scale',
) as typeof import('../../../src/helper/Scale');

const { horizontalScale, verticalScale, moderateScale } = scaleModule;

describe('Scale helpers', () => {
  it('computes horizontal scaling based on device width', () => {
    const size = 10;
    const factor = horizontalScale(1);
    expect(horizontalScale(size)).toBeCloseTo(factor * size, 5);
    expect(horizontalScale(0)).toBeCloseTo(0, 5);
  });

  it('computes vertical scaling based on device height', () => {
    const size = 20;
    const factor = verticalScale(1);
    expect(verticalScale(size)).toBeCloseTo(factor * size, 5);
  });

  it('applies moderate scaling using default and custom factors', () => {
    const size = 12;
    const baseScaled = horizontalScale(size);

    expect(moderateScale(size)).toBeCloseTo(
      size + (baseScaled - size) * 0.5,
      5,
    );

    expect(moderateScale(size, 0.25)).toBeCloseTo(
      size + (baseScaled - size) * 0.25,
      5,
    );

    expect(moderateScale(size, 0)).toBeCloseTo(size, 5);
    expect(moderateScale(size, 1)).toBeCloseTo(baseScaled, 5);
  });
});
