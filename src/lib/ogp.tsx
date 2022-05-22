import { truncate } from 'lodash';

const BASE_URL = 'https://res.cloudinary.com/koechi/image/upload';
const FILE_VERSION = 'v1653197530';
const FILE_NAME = 'ogp_m7qwnx.png';

const encodeBase64 = (v: string) => {
  if (process.browser) return btoa(v);
  return Buffer.from(v).toString('base64');
};

export const generateOgpImageUrl = (title: string, nickname: string, avatar: string) => {
  const encodeName = encodeURIComponent(truncate(nickname, { length: 16 }));
  const encodeTitle = encodeURIComponent(truncate(title, { length: 48 }));
  const encodeAvatar = encodeBase64(avatar);

  return `${BASE_URL}/co_rgb:222,g_south_west,l_text:Sawarabi%20Gothic_36_bold:${encodeName},x_203,y_98/c_fit,co_rgb:222,g_north_west,l_text:Sawarabi%20Gothic_70_bold:${encodeTitle},w_1010,x_90,y_100/g_south_west,h_90,l_fetch:${encodeAvatar},w_90,r_max,x_87,y_72/${FILE_VERSION}/${FILE_NAME}`;
};
