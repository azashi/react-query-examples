const wait = (delay: number = 2000) => {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
};

export const randomWait = async () => {
  const delay = Math.ceil(Math.random() * 1000 + 1200);
  await wait(delay);
  return delay;
};
