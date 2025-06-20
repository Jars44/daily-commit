import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// Generate a random date between one year ago and today (inclusive)
const getRandomDate = () => {
  const start = moment().subtract(1, "year").startOf("day");
  const end = moment().startOf("day");
  const diffDays = end.diff(start, "days");
  const randomDays = random.int(0, diffDays);
  return start.clone().add(randomDays, "days").format();
};

const markCommit = (date) => {
  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();
  const date = getRandomDate();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(100);