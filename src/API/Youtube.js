import axios from "axios";

export default class Youtube {
  constructor() {
    this.httpClient = axios.create({
      // httpClient là biến do tự đặt tên
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: {
        key: import.meta.env.VITE_APP_YOUTUBE_API_KEY,
      },
    });
  }

  async search(keyword) {
    return keyword ? this.searchVideoByKeyword(keyword) : this.mostPopular();
  }

  async channelThumbnail(id) {
    return this.httpClient
      .get("/channels", {
        params: {
          part: "snippet",
          id: id,
        },
      })
      .then(
        (response) => response.data.items[0].snippet.thumbnails.default.url
      );
  }

  async relatedVideos(id) {
    return (
      this.httpClient
        .get("/search", {
          params: {
            part: "snippet",
            maxResults: 20,
            type: "video",
            relatedToVideoId: id,
          },
        })
        .then((response) => response.data.items) //lấy array items về
        // console.log(response);
        .then((items) =>
          items.map((item) => {
            return { ...item, id: item.id.videoId };
          })
        )
    ); //items là parameter tự đặt tên, thao tác này là lấy videoId về
  }

  async searchVideoByKeyword(keyword) {
    return (
      this.httpClient
        .get("/search", {
          params: {
            part: "snippet",
            maxResults: 20,
            type: "video",
            q: keyword,
          },
        })
        .then((response) => response.data.items) //lấy array items về
        // console.log(response);
        .then((items) =>
          items.map((item) => {
            return { ...item, id: item.id.videoId };
          })
        )
    ); //items là parameter tự đặt tên, thao tác này là lấy videoId về
  }

  async mostPopular() {
    return this.httpClient
      .get("/videos", {
        params: {
          part: "snippet",
          maxResults: 20,
          chart: "mostPopular",
        },
      })
      .then((response) => {
        console.log(response);
        return response.data.items;
      });
  }
}
