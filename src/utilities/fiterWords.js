const fiterWords = (main, arr1, arr2, arr3) => {
  const mArr1 = arr1.map((word) => word._id);
  const mArr2 = arr2.map((word) => word._id);
  const mArr3 = arr3.map((word) => word._id);
  const filtered = main.filter(
    (word) =>
      !mArr1.includes(word._id) &&
      !mArr2.includes(word._id) &&
      !mArr3.includes(word._id)
  );
  
  filtered.sort((a, b) => {
    const nextProgressA = a.nextProgress.toUpperCase();
    const nextProgressB = b.nextProgress.toUpperCase();
    if (nextProgressA < nextProgressB) {
      return -1;
    }
    if (nextProgressA > nextProgressB) {
      return 1;
    }
    
    return 0;
  });
  
  return filtered
};

export default fiterWords;
