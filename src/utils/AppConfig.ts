// FIXME: Update this configuration file based on your project information

import siteInfo from '@/public/chatGpt/siteInfo.json';

const { topic, subtitle } = siteInfo;

export const AppConfig = {
  site_name: topic,
  title: topic,
  description: subtitle,
  locale: 'en',
};
