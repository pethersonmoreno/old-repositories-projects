import React from 'react';

import IconGithub from './IconGithub';
import IconLinkedin from './IconLinkedin';
import IconTwitter from './IconTwitter';

export type TSocial = {
  item: string;
  link: string;
};

const compSocial = {
  linkedin: IconLinkedin,
  github: IconGithub,
  twitter: IconTwitter,
};

export default function SocialSection({ social }: {social: TSocial[]}) {
  return (
    <>
      <p>Find me on:</p>
      <div className="social-icons">
        {social.map((itemSocial) => {
          const IconComponent = (compSocial as any)[itemSocial.item];
          if (!IconComponent) {
            return null;
          }
          return (
            <a key={itemSocial.item} href={itemSocial.link}><IconComponent /></a>
          );
        })}
      </div>
    </>
  );
}
