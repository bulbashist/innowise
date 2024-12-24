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

const getManyQuery = (page: number) => {
  return `
    query {
      characters(page: 2) {
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
