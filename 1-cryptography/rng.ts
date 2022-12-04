class RandomNumberGenerator {
  private periodicity: number = 101;

  private seed: number;
  private min: number;
  private max: number;

  public constructor ({ seed = 1, min = 1, max = 100 }: {
    seed?: number,
    min?: number,
    max?: number
  }) {
    this.seed = seed;
    this.min = min;
    this.max = max;
  }

  public getNext (): number {
    const randomNumber = this.seed * 7 % this.periodicity;

    this.seed = randomNumber;

    const range = this.max - this.min + 1;
    const rangedRandomNumber = randomNumber % range + this.min;

    return rangedRandomNumber;
  }
}

const randomNumberGenerator = new RandomNumberGenerator({
  seed: Date.now(),
  min: 1,
  max: 10
});

for (let i = 0; i < 200; i++) {
  const randomNumber = randomNumberGenerator.getNext();

  process.stdout.write(`${randomNumber} `);
}
