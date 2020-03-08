import { Datastore } from '@google-cloud/datastore';
import * as crypto from "crypto";

const datastore = new Datastore();

const insertVisit = visit => {
  return datastore.save({
    key: datastore.key('visit'),
    data: visit,
  });
};
const getVisits = () => {
  const query = datastore
    .createQuery('visit')
    .order('timestamp', {descending: true})
    .limit(10);
  return datastore.runQuery(query);
};

export async function handleDataStore(req, res, next): Promise<void> {
    // Create a visit record to be stored in the database
  const visit = {
    timestamp: new Date(),
    // Store a hash of the visitor's ip address
    userIp: crypto
      .createHash('sha256')
      .update(req.ip)
      .digest('hex')
      .substr(0, 7),
  };

  try {
    await insertVisit(visit);
    const [entities] = await getVisits();
    const visits = entities.map(
      entity => `Time: ${entity.timestamp}, AddrHash: ${entity.userIp}`
    );
    res
      .status(200)
      .set('Content-Type', 'text/plain')
      .send(`Last 10 visits:\n${visits.join('\n')}`)
      .end();
  } catch (error) {
    next(error);
  }
}