const calcNextProgress = (updatedWordData) => {
  const now = new Date();
  const nextProgress = new Date(updatedWordData.nextProgress);        
  const completeTask = now.getTime() >= nextProgress.getTime();  
  if (completeTask) {
    const nextTime = now.getDate() + Math.pow(2, updatedWordData.progress + 1);
    updatedWordData.progress += 1;
    updatedWordData.nextProgress = now.setDate(nextTime);
  }
};

export default calcNextProgress;
