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
      const response = await fetch(request);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
}


export const apiServer = new ApiRequest('https://whsjs-73669.firebaseio.com');