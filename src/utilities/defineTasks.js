const defineTasks = (words) => {
  const now = new Date();
  let comp = 0; // nof completed
  words.forEach((element) => {
    comp += element.progress;
  });
  const arr = words.filter(
    (item) => now.getTime() >= new Date(item.nextProgress).getTime()
  );
  const l1 = arr.filter((item) => item.progress < 2);
  const l2 = arr.filter((item) => item.progress >= 2 && item.progress < 4);
  const l3 = arr.filter((item) => item.progress >= 4);
  const pend = l1.length + l2.length + l3.length; // nof pendings
  return {
    completed: comp,
    pendings: pend,
    level_1: l1,
    level_2: l2,
    level_3: l3,
  };
};

export default defineTasks;
