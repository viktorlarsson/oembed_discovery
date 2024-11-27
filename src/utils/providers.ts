interface Provider {
  name: string;
  endpoints: {
    schemes: string[];
    url: string;
  }[];
}

export const providers: Provider[] = [
  {
    name: 'Quartr',
    endpoints: [{
      schemes: [
        'https://web.quartr.com/companies/*/events/*/overview',
        'https://quartr.com/companies/*/events/*/overview'
      ],
      url: 'https://web.quartr.com/api/oembed'
    }]
  },
  {
    name: 'YouTube',
    endpoints: [{
      schemes: [
        'https://youtube.com/watch/*',
        'https://www.youtube.com/watch/*',
        'https://youtu.be/*'
      ],
      url: 'https://www.youtube.com/oembed'
    }]
  },
  {
    name: 'Vimeo',
    endpoints: [{
      schemes: [
        'https://vimeo.com/*',
        'https://vimeo.com/channels/*',
        'https://vimeo.com/groups/*'
      ],
      url: 'https://vimeo.com/api/oembed.json'
    }]
  },
  {
    name: 'Twitter',
    endpoints: [{
      schemes: [
        'https://twitter.com/*/status/*',
        'https://twitter.com/*/statuses/*'
      ],
      url: 'https://publish.twitter.com/oembed'
    }]
  }
];