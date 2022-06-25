interface ErrorMsg {
    msg: string;
    info: any;
}

/**
 * results - number of results
 * nat - nationality: One of the following:
 * AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NO, NL, NZ, TR, US
 * gender - male/female
 */
interface ParamValues {
    nat: string,
    results: number,
    gender: string
}
interface User {
    gender: "male"|"female",
          name: {
            title: "mr"|"ms"|"mrs",
            first: string,
            last: string
          },
          location: {
            street: string,
            city: string,
            state: string,
            postcode: number,
            coordinates: {
              latitude: number,
              longitude: number
            },
            timezone: {
              offset: string,
              description: string
            }
          },
          email: string,
          login: {
            uuid: string,
            username: string,
            password: string,
            salt: string,
            md5: string,
            sha1: string,
            sha256: string
          },
          dob: {
            date: Date,
            age: number
          },
          registered: {
            date: Date,
            age: number
          },
          phone: string,
          cell: string,
          id: {
            name: string,
            value: string
          },
          picture: {
            large: string,
            medium: string,
            thumbnail: string
          },
          nat: string
}

interface RandomUserResponse {
    results: User[],
    info: {
    seed: string,
    results: number,
    page: number,
    version: number
    }
}