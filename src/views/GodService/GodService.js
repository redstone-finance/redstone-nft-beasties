import { TemperatureSlider } from '../../components/TemperatureSlider';
import { Image, Box, Table, Td, Thead, Tr, Th, Tbody } from '@chakra-ui/react';
import hand from './hand.png';
import { Link } from 'react-router-dom';
import './GodService.scss';
import { useState } from 'react';

export const GodService = () => {
  const temperatureObj = [
    { date: 'Sat, 15 Jan 2021 17:20:51 GMT', temperature: 29 },
    { date: 'Mon, 8 Feb 2021 16:20:01 GMT', temperature: 35 },
    { date: 'Tue, 1 Mar 2021 08:20:12 GMT', temperature: 50 },
    { date: 'Sat, 8 Apr 2021 15:20:13 GMT', temperature: 12 },
    { date: 'Wed, 1 Jun 2021 08:20:12 GMT', temperature: 33 },
    { date: 'Sat, 3 Jul 2021 08:20:12 GMT', temperature: 46 },
    { date: 'Sun, 6 Sep 2021 11:13:12 GMT', temperature: 12 },
  ];
  const [temperature, setTemperature] = useState(
    JSON.parse(localStorage.getItem('temp')) || temperatureObj
  );

  const handleChange = (temp) => {
    setTemperature((oldTemp) => [temp, ...oldTemp]);
    localStorage.setItem('temp', JSON.stringify([temp, ...temperature]));
  };

  return (
    <Box h='110vh' bg='brand.darker' className='god-box'>
      <Box p='5'>
        <Link
          to='/'
          style={{
            color: '#bbe6e4',
            textTransform: 'uppercase',
            zIndex: '1000',
            position: 'relative',
          }}
        >
          Come down to earth
        </Link>
      </Box>
      <Box
        boxSize='1000px'
        ml='-105px'
        mt='-205px'
        position='absolute'
        transform='rotate(-40deg)'
      >
        <Image src={hand} zIndex='1' />
      </Box>
      <Box
        w='40%'
        height='400px'
        overflowY='auto'
        position='absolute'
        bottom='20px'
        left='50%'
        transform='translate(-50%, -30%)'
        className='temp-box'
        padding='7'
      >
        <Table variant='striped' colorScheme='blue'>
          <Thead>
            <Tr>
              <Th color='brand.lighter' fontSize='20px' fontFamily='Pixie'>
                Date
              </Th>
              <Th
                color='brand.lighter'
                isNumeric
                fontSize='20px'
                fontFamily='Pixie'
              >
                Temperature
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {temperature.map((t, i) => (
              <Tr key={i}>
                <Td>{t.date}</Td>
                <Td isNumeric>{t.temperature + '°'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <div className='speech bubble'>
        <span className='title'>Drag me!</span>
      </div>
      <TemperatureSlider handleChange={handleChange} />
    </Box>
  );
};
