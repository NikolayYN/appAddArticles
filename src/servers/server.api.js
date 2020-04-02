class ApiRequest {

  constructor(baseUrl) {
    this.url = baseUrl;
  }

  async setPost(post) {
    try {
      const request = new Request(this.url + '/posts.json', {
        method: 'POST',
        body: JSON.stringify(post),
      })
      return getResponse(request);

    } catch (error) {
      console.log('eto os oshibka', error);
    }
  }
  async getDataPost() {
    try {
      const request = new Request(this.url + '/posts.json', {
        method: 'GET',
      });
      return getResponse(request);
    } catch (error) {
      console.log(error);
    }


  }
}

async function getResponse(request) {
  const response = await fetch(request);
  return await response.json();
}

export const apiServer = new ApiRequest('https://whsjs-73669.firebaseio.com');