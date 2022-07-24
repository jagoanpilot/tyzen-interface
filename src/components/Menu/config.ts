import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://tyzen.io/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://swap.tyzen.io/#/pool',
      }
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: 'https://farm.tyzen.io',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Contact',
        href: 'mailto:support@tyzen.io',
      },
      {
        label: 'Github',
        href: 'https://github.com/tyzen-tzn',
      },
      {
        label: 'Docs',
        href: 'https://docs.tyzen.live',
      },
      {
        label: 'Medium',
        href: 'https://medium.com/@saka_tyzen',
      },
    ],
  },
]

export default config
