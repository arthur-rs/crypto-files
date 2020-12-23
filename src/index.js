const menu = require('./layouts/menu')

const app = async () => {  
  while (true){
    const result = await menu()

    if(result) break  
  }
}

app()
