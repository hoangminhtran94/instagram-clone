export const extractHashtags = (inputString: string) => {
  const regex = /#(\w+)/g;
  const matches = inputString.match(regex);

  if (matches) {
    return matches.map((match) => match.slice(1));
  } else {
    return [];
  }
};
