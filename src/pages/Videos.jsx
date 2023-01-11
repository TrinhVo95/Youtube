import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Youtube from "../API/Youtube";

const Videos = () => {
  const { keyword } = useParams(); // hiển thị thông tin nhập trong ô input
  // const params = useParams();
  // console.log(params);
  // console.log(keyword);
  // const [videos, setVideos] = useState([]);

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: () => {
      const youtube = new Youtube();
      return youtube.search(keyword);
    },
  });
  // useEffect(() => {
  //   let requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(
  //     "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=20&chart=mostPopular&key=AIzaSyBuZQa8gofEG1ej_vNtw401fw5_074Up_8",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => setVideos(result.items))
  //     .catch((error) => console.log("error", error));
  // }, []); //sau khi component dc render lần đầu tiên sẽ thực thi callback function
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>An error has occurred: {error.message}</p>}
      {videos && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-2">
          {videos.map((item) => (
            <VideoCard key={item.id} video={item} />
          ))}
        </ul>
      )}
      {/* <div>
        {keyword ? (
          keyword
        ) : (
          <ul>
            {videos.map((item) => (
              <VideoCard key={item.id} video={item} />
            ))}
          </ul>
        )}
      </div> */}
      {/* // nếu có keyword trả ra video có keyword, nếu ko có trả các video mostpopular */}
    </>
  );
};

export default Videos;
