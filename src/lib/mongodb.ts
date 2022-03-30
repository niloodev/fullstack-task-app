// importy mongoose module
import { MongoClient } from 'mongodb'

// get environment variable MONGODB_URI | its basically the access "link" to the database
let uri: string | undefined = process.env.MONGODB_URI
if (!uri) uri = ''

// the mongodb options
const options: any = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

// check if exists environment variable
if (!process.env.MONGODB_URI)
    throw new Error('you need to define MONGODB_URL as environment variable.')

let client: MongoClient
let clientPromise: Promise<MongoClient>

// create cache variables
if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export default clientPromise
