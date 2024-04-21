import axios from 'axios';

const YT_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

/** Quota: 100, it really hurts */
export const searchVideosList = async (query, limit = 10) => {
    try {
        const response = await axios.get(
            'https://www.googleapis.com/youtube/v3/search',
            {
                params: {
                    part: 'snippet',
                    key: YT_API_KEY,
                    q: query,
                    maxResults: limit,
                    type: 'video',
                    videoDuration: 'medium',
                    videoEmbeddable: true
                }
            }
        );
        return response.data.items;
    } catch (error) {
        console.error(error.message);
        throw new Error(error);
    }
};

/** Quota: 1 */
export const getVideoDetails = async (videoId, part = 'snippet') => {
    try {
        const response = await axios.get(
            'https://www.googleapis.com/youtube/v3/videos',
            {
                params: {
                    key: YT_API_KEY,
                    id: videoId,
                    part: part
                }
            }
        );

        return response.data.items[0];
    } catch (error) {
        console.error('Error fetching video details:', error.message);
        throw new Error(error);
    }
};

/** Quota: 1 */
export const getChannelDetails = async (channelId, part = 'snippet') => {
    try {
        const response = await axios.get(
            'https://www.googleapis.com/youtube/v3/channels',
            {
                params: {
                    key: YT_API_KEY,
                    id: channelId,
                    part: part
                }
            }
        );

        return response.data.items[0];
    } catch (error) {
        console.error('Error fetching creator profile image:', error);
        throw new Error(error);
    }
};

export const formatViews = (views) => {
    views = views.toString();

    if (views < 1e3) {
        return views;
    } else if (views >= 1e3 && views <= 999999) {
        return views.slice(0, views.length - 3) + 'K';
    } else if (views >= 1e6 && views <= 9999999) {
        return views.slice(0, views.length - 6) + 'M';
    } else {
        return views.slice(0, views.length - 9) + 'B';
    }
};
