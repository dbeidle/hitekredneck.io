export default allPosts => {
  const posts = allPosts;
  const allPostsSorted = posts.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });

  return allPostsSorted;
};
