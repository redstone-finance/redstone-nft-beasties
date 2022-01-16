import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Heading, Image } from '@chakra-ui/react';
import leaves from './pngegg.png';
import './BeastieLand.scss';
import { useState } from 'react';

export const BeastieLand = () => {
  const [temp] = useState(localStorage.getItem('currentTemp') || 11);
  const images = {
    'fox-kids':
      'https://hv4gxzchk24cqfezebn3ujjz6oy2kbtztv5vghn6kpbkjc3vg4rq.arweave.net/lYueWF1Hqhued5npzoEAgkmNYiGh6D17V71L7Rt5YNU',
    fox: 'https://hv4gxzchk24cqfezebn3ujjz6oy2kbtztv5vghn6kpbkjc3vg4rq.arweave.net/hIvsMZuXvx4wNekvGAGUcU6mpHgcge9JmzfbwhOkdQw',
    'elephant-kids':
      'https://hv4gxzchk24cqfezebn3ujjz6oy2kbtztv5vghn6kpbkjc3vg4rq.arweave.net/YXy1ZIS9HjYX-wbmKtrD32E_CviJV1xyA-2D2BBDijs',
    elephant:
      'https://hv4gxzchk24cqfezebn3ujjz6oy2kbtztv5vghn6kpbkjc3vg4rq.arweave.net/vQeUki8E06mVI70d3ir27b6mrUE1Cq_CHYK964afL7M',
    'lion-kids':
      'https://hv4gxzchk24cqfezebn3ujjz6oy2kbtztv5vghn6kpbkjc3vg4rq.arweave.net/shAdifSqLn3IbSLnWo7TglpN6Lx-ExVcVpjLeEJbzOY',
    lion: 'https://hv4gxzchk24cqfezebn3ujjz6oy2kbtztv5vghn6kpbkjc3vg4rq.arweave.net/VGix07oYzrXUnfYWoBsYb1MnmuDKt-o81BitxPWZj7w',
    'panda-kids':
      'https://hv4gxzchk24cqfezebn3ujjz6oy2kbtztv5vghn6kpbkjc3vg4rq.arweave.net/7Cx9Dy8w25Q2OrkxrzRnW_I3QmgrrdpBhyEe9R89t5s',
    panda:
      'https://hv4gxzchk24cqfezebn3ujjz6oy2kbtztv5vghn6kpbkjc3vg4rq.arweave.net/Ff5aMVqwvcCWcnj8BfxejGLngcucECY6zTJagXC8sgQ',
    'zebra-kids':
      'https://hv4gxzchk24cqfezebn3ujjz6oy2kbtztv5vghn6kpbkjc3vg4rq.arweave.net/u6SDYRxV589xCnKe0IYFeHgo3cgyPBbj6_AreCC5iwA',
    zebra:
      'https://hv4gxzchk24cqfezebn3ujjz6oy2kbtztv5vghn6kpbkjc3vg4rq.arweave.net/sFu-OQWZFtw873HVhzMOh7FvWvIliI8di7zYZzQbIqw',
    ghost:
      'https://hv4gxzchk24cqfezebn3ujjz6oy2kbtztv5vghn6kpbkjc3vg4rq.arweave.net/ujOHUSSVY4BPrOA3LLFbh-rvWYm4gKEbMkhPg7Ky4sU',
  };
  const tokens = [
    {
      tokenId: '1',
      name: 'Panda',
      deathTemperature: 0,
      kidsTemperature: 20,
      imageArweaveUrl: images['panda'],
      imageArweaveUrlWithKids: images['panda-kids'],
    },
    {
      tokenId: '2',
      name: 'Lion',
      deathTemperature: 10,
      kidsTemperature: 30,
      imageArweaveUrl: images['lion'],
      imageArweaveUrlWithKids: images['lion-kids'],
    },
    {
      tokenId: '3',
      name: 'Elephant',
      deathTemperature: 5,
      kidsTemperature: 30,
      imageArweaveUrl: images['elephant'],
      imageArweaveUrlWithKids: images['elephant-kids'],
    },
    {
      tokenId: '4',
      name: 'Fox',
      deathTemperature: 0,
      kidsTemperature: 20,
      imageArweaveUrl: images['fox'],
      imageArweaveUrlWithKids: images['fox-kids'],
    },
    {
      tokenId: '5',
      name: 'Zebra',
      deathTemperature: 0,
      kidsTemperature: 20,
      imageArweaveUrl: images['zebra'],
      imageArweaveUrlWithKids: images['zebra-kids'],
    },
  ];
  return (
    <>
      <Box
        bg='brand.dark'
        minHeight='130vh'
        backgroundRepeat='no-repeat'
        style={{ backgroundImage: `url(${leaves})` }}
      >
        <Box p='5'>
          <Link
            to='/godservice'
            style={{
              color: '#bbe6e4',
              textTransform: 'uppercase',
              zIndex: '1000',
              position: 'relative',
            }}
          >
            Change The World
          </Link>
        </Box>
        <Box position='absolute' right='50px' w='65%'>
          <Heading fontSize='60px' className='heading' color='brand.light'>
            BeastieLand
          </Heading>
          <Box
            className='main-box'
            height='100%'
            display='flex'
            flexWrap='wrap'
            justifyContent='space-around'
          >
            {tokens.map((t) => (
              <Box m='2' p='2' flexBasis='26%'>
                <Box
                  bg='brand.lighter'
                  className='hallucination-effect'
                  _hover={{
                    backgroundImage: `url(${
                      temp <= t.deathTemperature
                        ? images['ghost']
                        : temp >= t.kidsTemperature
                        ? t.imageArweaveUrlWithKids
                        : t.imageArweaveUrl
                    })`,
                  }}
                >
                  <Image
                    className='nft-image'
                    overflowY='auto'
                    src={
                      temp <= t.deathTemperature
                        ? images['ghost']
                        : temp >= t.kidsTemperature
                        ? t.imageArweaveUrlWithKids
                        : t.imageArweaveUrl
                    }
                  ></Image>
                </Box>
                <Box bg='brand.darker' className='grow' fontWeight='600'>
                  <Box className='item' bg='brand.darker'>
                    <Box p='3' textAlign='center' color='brand.dark'>
                      {t.name}
                    </Box>
                    <Box display='flex' p='2' justifyContent='space-between'>
                      <Box color='brand.lighter'>Token Id</Box>
                      <Box color='brand.dark'>{t.tokenId}</Box>
                    </Box>
                    <Box display='flex' p='2' justifyContent='space-between'>
                      <Box color='brand.lighter'>Death temperature</Box>
                      <Box color='brand.dark'>{t.deathTemperature}</Box>
                    </Box>
                    <Box display='flex' p='2' justifyContent='space-between'>
                      <Box color='brand.lighter'>Kids temperature</Box>
                      <Box color='brand.dark'>{t.kidsTemperature}</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
