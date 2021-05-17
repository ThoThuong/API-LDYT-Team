import { Collection, ObjectId } from 'mongodb';

export const CollectionController = {
  getMany: async (collection: Collection<any>, data: { id: string, query: any, idOwner: any }): Promise<any> => {
    const limit = Number.parseInt(data.query?.limit ?? 10);
    const skip = Number.parseInt(data.query?.skip ?? 0);
    const filter: any = {};
    console.log('test', collection);

    Object.keys(data.query)
      .filter(k => ['limit', 'skip'].every(r => r !== k))
      .forEach(k => filter[k] = k === '_id' ? new ObjectId(data.query[k]) : data.query[k]);

    return {
      list: await collection.find(filter, {
        limit: limit,
        skip: skip
      }).sort({ createdDate: -1 }).toArray(),
      totalCount: (await collection.find(filter).toArray()).length,
      idOwner: data.idOwner,
      id: data.id

    };
  },
  getOne: async (collection: Collection<any>, data: { id: string }): Promise<any> => {
    const obj = await collection.findOne({ '_id': new ObjectId(data.id) });
    return JSON.parse(JSON.stringify(obj));
  },
  post: async (collection: Collection<any>, data: { body: any }): Promise<any> => {
    data.body.createdDate = new Date();
    data.body.updatedDate = new Date();
    await collection.insertOne(data.body);
    return collection.findOne({}, { sort: { _id: -1 } });
  },
  put: async (collection: Collection<any>, data: { id: string, body: any }): Promise<any> => {
    data.body.updatedDate = new Date();
    await collection.findOneAndReplace({ '_id': new ObjectId(data.id) }, data.body);
    return collection.findOne({ '_id': new ObjectId(data.id) });
  },
  delete: async (collection: Collection<any>, data: { id: string }): Promise<any> => {
    await collection.findOneAndDelete({ '_id': new ObjectId(data.id) });
    return 'ok'
  },




  getManyOwner: async (collection: Collection<any>, data: { id: string, query: any, idOwner: any }): Promise<any> => {
    const limit = Number.parseInt(data.query?.limit ?? 10);
    const skip = Number.parseInt(data.query?.skip ?? 0);
    const filter: any = {};
    const condition: any = { "idOwner": data.idOwner };

    Object.keys(data.query)
      .filter(k => ['limit', 'skip'].every(r => r !== k))
      .forEach(k => filter[k] = k === '_id' ? new ObjectId(data.query[k]) : data.query[k]);

    return {
      list: await collection.find(condition, {
        limit: limit,
        skip: skip
      }).sort({ createdDate: -1 }).toArray(),
      totalCount: (await collection.find(condition).toArray()).length,
      idOwner: data.idOwner,
      id: data.id
    };
  },

  putUpdate: async (collection: Collection<any>, data: { id: string, body: any, idOwner: any }): Promise<any> => {
    data.body.updatedDate = new Date();

    await collection.updateOne({ '_id': new ObjectId(data.id) }, {
      $set: data.body
    });

    return collection.findOne({ '_id': new ObjectId(data.id) });
  },
  search: async (collection: Collection<any>, data: { id: string, query: any, idOwner: any }): Promise<any> => {
    const limit = Number.parseInt(data.query?.limit ?? 10);
    const skip = Number.parseInt(data.query?.skip ?? 0);
    const filter: any = {};
    console.log('test', collection);

    Object.keys(data.query)
      .filter(k => ['limit', 'skip'].every(r => r !== k))
      .forEach(k => filter[k] = k === '_id' ? new ObjectId(data.query[k]) : data.query[k]);

    return {
      list: await collection.find(filter, {
        limit: limit,
        skip: skip
      }).sort({ createdDate: -1 }).toArray(),
      totalCount: (await collection.find(filter).toArray()).length,
      idOwner: data.idOwner,
      id: data.id

    };
  }


}