

const gen = {
  generateResponse: (status, response) => {
    return {
      status,
      body: response
    }
  }
}

export default gen;
