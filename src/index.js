const menu = require('./layouts/menu')

const app = async () => {
  console.clear()
  
  while (true){
    const result = await menu()

    if(result) break  
  }
}

app()

