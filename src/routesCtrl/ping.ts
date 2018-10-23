import { Router } from 'express';
import axios from 'axios';

const ping = Router();

ping.route('/').get(async (_, res) => {
  try {
    const { data } = (await axios.get(
      'https://api.github.com/repos/leogoesger/eflow-ts-api/commits'
    )) as any;

    const sha = data[0].sha;
    const author = data[0].commit.author.name;
    const date = data[0].commit.author.date;

    return res
      .status(200)
      .send({ msg: 'Server is alive and well!', sha, author, date });
  } catch (error) {
    return res.status(500).send({ msg: error.toString() });
  }
});

export { ping };
