import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Youtube from "../API/Youtube";
import VideoCard from "./VideoCard";

const RelatedVideos = ({ id }) => {
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["related", id],
    queryFn: () => {
      const youtube = new Youtube();
      return youtube.relatedVideos(id);
    },
  });
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>An error has occurred: {error.message}</p>}
      {videos && (
        <ul>
          {videos.map((item) => (
            <VideoCard key={item.id} video={item} type="list" />
          ))}
        </ul>
      )}
      ;
    </>
  );
};

export default RelatedVideos;
