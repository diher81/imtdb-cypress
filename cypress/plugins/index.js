/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const MONGO_CLIENT = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017";

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    on('task', {
        'db:queryDeleteFromVideoDb': ({collectionName, options}) => queryDeleteFromVideoDb({collectionName, options})
    })
};

/**
 * Make a connection to the video database
 */
let videoDb;
const getVideoDb = async () => {
    if (!videoDb)
        videoDb = await MONGO_CLIENT.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    return videoDb.db('video');
};

/**
 * Delete record from a collection within the Video database
 */
const queryDeleteFromVideoDb = async ({collectionName, options}) => {
    const DBO = await getVideoDb();
    return DBO.collection(collectionName).deleteOne(options);
};

