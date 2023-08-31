export const extractHashtags = (inputString: string, slice: number = 1) => {
  const regex = /#(\w+)/g;
  const matches = inputString.match(regex);

  if (matches) {
    return matches.map((match) => match.slice(slice));
  } else {
    return [];
  }
};
