// FIXME: Update this configuration file based on your project information

import subHeaderFile from '@/public/chatGpt/siteInfo.json';

const { topic, subtitle } = subHeaderFile;

export const AppConfig = {
  site_name: topic,
  title: topic,
  description: subtitle,
  locale: 'en',
};
