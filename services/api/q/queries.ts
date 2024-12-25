import { Filter } from "@/store/list/slice";

const getOneQuery = (id: number) => {
  return `
    query {
      character(id: ${id}) {
        id,
  	    name,
  	    status,
        species,
        type,
        gender,
        origin { 
          name,
        },
        location {
          name,
        },
        image,
        episode {
          name
        },
      }
    }`;
};

// "fgg" : null

// FIX
const getManyQuery = (page: number, filter: Filter) => {
  return `
    query {
      characters(page: ${page}, filter: {
        status: "${filter.status}",
        species: "${filter.species}"
      }) {
        results {
          id
          name
          status
          species
          type
          gender
          origin {
            name
          }
          location {
            name
          }
          image	
          episode {
            name
          }  
        }
      }
    }`;
};

export { getOneQuery, getManyQuery };
