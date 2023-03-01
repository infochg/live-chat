export const getBgColorByName = (name: string) => {
  const getHashOfString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i = i + 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
  };

  const normalizeHash = (hash: number, min: number, max: number) => {
    return Math.floor((hash % (max - min)) + min);
  };

  const hash = getHashOfString(name);
  const h = normalizeHash(hash, 0, 360);
  const s = normalizeHash(hash, 50, 75);
  const l = normalizeHash(hash, 25, 60);

  return `hsl(${h}, ${s}%, ${l}%)`;
};
