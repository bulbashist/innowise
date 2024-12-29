import { Filter } from "@/types";

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

const getManyQuery = (page: number, filter: Filter) => {
  return `
    query {
      characters(page: ${page}, filter: {
        status: "${filter.status}",
        species: "${filter.species}"
      }) {
        info {
          next
        }
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
