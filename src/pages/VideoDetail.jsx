import React from "react";
import { useLocation } from "react-router-dom";
import ChannelInfo from "../components/ChannelInfo";
import RelatedVideos from "../components/RelatedVideos";

const VideoDetail = () => {
  const {
    state: { video },
  } = useLocation();
  console.log(video);
  return (
    <section className="flex flex-col lg:flex-row">
      <div className="max-w-screen-xl mx-auto">
        <article className="basis-4/6">
          <iframe
            id="ytplayer"
            type="text/html"
            width="100%"
            height="640"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            // frameBorder="0"
          ></iframe>
          <div className="p-8">
            <h2 className="text-xl">{video.snippet.title}</h2>
            <ChannelInfo
              id={video.snippet.channelId}
              title={video.snippet.channelTitle}
            />
            <pre className="whitespace-pre-wrap">
              {video.snippet.description}
            </pre>
          </div>
        </article>
      </div>
      <section className="basis-2/6">
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
};

export default VideoDetail;
