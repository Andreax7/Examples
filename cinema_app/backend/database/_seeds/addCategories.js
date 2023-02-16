const {Pool} = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function addCategories(){
    // Deletes ALL existing entries
    try{
        await pool.query(
            'TRUNCATE "category" RESTART IDENTITY CASCADE; '
           ).then( (result) => { 
                return result 
            })
            .catch((err)=> {
                throw err 
            })
                // Inserts seed entries
            await pool.query(
                'INSERT INTO category (category) VALUES ($1)',
                ["Documentary"]
            )
                .then( (result) => { 
                    return result 
                })
                .catch((err)=> {
                    throw err 
                });
            await pool.query(
                    'INSERT INTO category (category) VALUES ($1)',
                    ["Sci-Fi"]
                )
                    .then( (result) => { 
                        return result 
                    })
                    .catch((err)=> {
                        throw err 
                    });
            await pool.query(
                'INSERT INTO category (category) VALUES ($1)',
                ["Drama"]
            )
                .then( (result) => { 
                    return result 
                })
                .catch((err)=> {
                    throw err 
            });
            await pool.query(
                'INSERT INTO category (category) VALUES ($1)',
                ["Action"]
            )
            .then( (result) => { 
               return result 
            })
            .catch((err)=> {
                throw err 
            }); 
            
            await pool.query(
                'INSERT INTO category (category) VALUES ($1)',
                ["Biography"]
            )
                .then( (result) => { 
                    return result 
                })
                .catch((err)=> {
                    throw err 
                });
                await pool.query(
                    'INSERT INTO category (category) VALUES ($1)',
                    ["Ballet"]
                )
                    .then( (result) => { 
                        return result 
                    })
                    .catch((err)=> {
                        throw err 
                    });
                await pool.query( 'INSERT INTO category (category) VALUES ($1)',
                    ["Opera"]
                )
                .then( (result) => { 
                        return result 
                    })
                .catch((err)=> {
                        throw err 
                    });
    }catch(err){
        return err
    }
   
  }
module.exports = {
    addCategories
}
 

    